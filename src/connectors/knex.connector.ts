import config from "../config/index.js"

const pg = require("knex")({
  client: "pg",
  connection: {
    connectionString: config.DATABASE_URL,
    host: config["DB_HOST"],
    port: config["DB_PORT"],
    user: config["DB_USER"],
    database: config["DB_NAME"],
    password: config["DB_PASSWORD"],
    ssl: false,
  },
})

export default pg
