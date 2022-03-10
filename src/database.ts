import knex from "knex";
import { serverConfig } from "./config";

export const database = knex({
  client: "mysql2",
  connection: {
    host: serverConfig.DB_HOST,
    port: serverConfig.DB_PORT,
    user: serverConfig.DB_USER,
    password: serverConfig.DB_PASSWORD,
    database: serverConfig.DB_NAME,
  },
});
