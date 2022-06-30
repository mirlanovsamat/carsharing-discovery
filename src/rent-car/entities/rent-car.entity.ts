export const rentsTable =
    `CREATE TABLE IF NOT EXISTS "rents" (
        "id" serial, 
        "carid" integer REFERENCES "cars",
        "start" VARCHAR(100) default 0,
        "finish" VARCHAR(100) default 0,
        "rentdays" integer default 0,
        "price" integer default 0,
        PRIMARY KEY ("id") 
    );`    