# Changes

## Single PR
I decided to go with a single PR so the entire diff could be viewed in a simple way. However I organized all my commits like I would with PRs. So if you're curious how I would organize my work you can scroll through the commits.

## Create dbConfig
This allows the same config to be used in the application and the migration. Making the project easier to maintain. 
It also centralizes logic to ensure that the project is not deployed misconfigured.

## Move schemas to schema folder
Moving the schemas from a single file to a file per table makes the project easier to navigate

## Search
For search I used pg_trgm for it's simplicity, scalability. I also believe this application would be read heavy and the increased write time for recalculating the index and the search column would be acceptable. 

The largest search column is about 565 bytes and GIN indexes are usually estimated to be about 3x larger than the column they are based on. If we assume every row has a search column at 565 bytes the memory required to hold this index in memory would be: 3 * (565 bytes) * rows_count.
Even at a million rows this would result in an index of about 1.5 GB, which should fit comfortably into most server configurations. 
This leaves plenty of room for growth if the server is starting with hundreds of thousands of rows.

## Advocates GET endpoint
Due to the simplicity of this endpoint I chose to leave everything in a single file. If the endpoints got much more complicated I would split this out into 2 or 3 layers, with input validation in middleware.

## Page
Due to time constraints I went with simple styling. If I had more time I wouldn't use a table and make this mobile friendly. 
I added debouncing so that search wouldn't hammer the endpoint on every keystroke