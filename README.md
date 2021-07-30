# notion-recurring-events
Workflow: 
-Item to be repeated is entered into input database
-Script runs, pulls data from database and enters the processed data into an output database (which can be any database)
-Script checks off item in input database, so it can be filtered out
-Script ends

KNOWN ISSUES/MISSING FUNCTIONALITY:
-Only the first tag carries over into the new database
-Only repetition by every number of days is supported (i.e. every seven days works, every wednesday and thursday doesn't)
-Time isn't supported
-Crashes when user input isn't formatted correctly
-No control over color of the tag
-No way to carry over text into the page's body