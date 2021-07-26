import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

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

addItem("Yurts in Big Sur, California")
addItem("Test")
let i = 0
while (i < 3) {
  addItem("Test number " + i)
  i++
}

(async () => {
  const databaseId2 = process.env.NOTION_DATABASE_ID_2;
  const response = await notion.databases.retrieve({ database_id: databaseId2 });
  console.log(response);
})();