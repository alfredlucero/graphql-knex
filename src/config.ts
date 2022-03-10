interface ServerConfig {
  SERVER_PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  OKTA_ISSUER: string;
  OKTA_CLIENT_ID: string;
  OKTA_AUDIENCE: string;
}

const {
  SERVER_PORT = "",
  DB_HOST = "",
  DB_USER = "",
  DB_PASSWORD = "",
  DB_PORT = "",
  DB_NAME = "",
  OKTA_ISSUER = "",
  OKTA_AUDIENCE = "",
  OKTA_CLIENT_ID = "",
} = process.env;
export const serverConfig: ServerConfig = {
  SERVER_PORT: SERVER_PORT !== "" ? parseInt(SERVER_PORT, 10) : 8080,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT: DB_PORT !== "" ? parseInt(DB_PORT, 10) : 3306,
  DB_NAME,
  OKTA_ISSUER,
  OKTA_CLIENT_ID,
  OKTA_AUDIENCE,
};
console.table(serverConfig);
