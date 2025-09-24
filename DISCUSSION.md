# Changes

## Create dbConfig
This allows the same config to be used in the application and the migration. Making the project easier to maintain. 
It also centralizes logic to ensure that the project is not deployed misconfigured.

## Move schemas to schema folder
Moving the schemas from a single file to a file per table makes the project easier to navigate