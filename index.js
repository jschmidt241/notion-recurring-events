import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID
const databaseId2 = process.env.NOTION_DATABASE_ID_2;

async function addItem(text) {
  try {
    await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: databaseId },
        properties: {
          title: { 
            title:[
              {
                "text": {
                  "content": text
                }
              }
            ]
          }
        }
      },
    })
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

/**
addItem("Test")
let i = 0
while (i < 3) {
  addItem("Test number " + i)
  i++
}
*/
/**
(async () => {
  const databaseId2 = process.env.NOTION_DATABASE_ID_2;
  const response = await notion.databases.query({ database_id: databaseId2 });
  console.log(response);
  
})();
*/

const getDatabase = async () => {
  const parameter = {
    path: `databases/${databaseId2}/query`,
    method: 'POST',
  }
  const { results } = await notion.request(parameter)

  const data = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0]?.plain_text,
      date: page.properties.Date.date.start,
      endDate: page.properties.Date.date.end,
      status: page.properties.Status.checkbox,
      tags: page.properties.Tags.multi_select[0].name,
      frequency: page.properties.Frequency.number,
    }
  })
  return data;
}

const postDatabase = async () => {
  const parameter = {
    path: `databases/${databaseId}/request`
  }
}

(async () => {
  const notionData = await getDatabase()
  for (let i = 0; i < notionData.length; i++) {
    if (notionData[i].status == true) {

      const date = new Date(parseInt(notionData[i].date.substr(0,4)),
        parseInt(notionData[i].date.substr(5,2)) - 1,
        parseInt(notionData[i].date.substr(8,2)))

      const endDate = new Date(parseInt(notionData[i].endDate.substr(0,4)), 
        parseInt(notionData[i].endDate.substr(5,2)) - 1,
        parseInt(notionData[i].endDate.substr(8,2)))

      const dates = [date]
      const freq = notionData[i].frequency
      var currentDate = date.getTime()
      while (dates[dates.length - 1].getTime() <= endDate.getTime() - (freq * 86400000)){
        dates.push(new Date(dates[dates.length - 1].getTime() + (freq * 86400000)))
      }
      console.log(dates)
      
    }
  }
})()