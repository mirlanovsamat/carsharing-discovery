export const carsTable =
    `CREATE TABLE IF NOT EXISTS "cars" (
        "id" serial, 
        "brand" VARCHAR(100) NOT NULL,
        "gosnumber" VARCHAR(100) NOT NULL,
        PRIMARY KEY ("id") 
    );` 


