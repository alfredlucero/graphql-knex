import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { context } from "./context";
import { serverConfig } from "./config";

const app = express();

app.use(
  cors({
    exposedHeaders: "*",
    allowedHeaders: "*",
  })
);

app.use(express.json());

// Support application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  // authenticationMiddleware,
  graphqlHTTP((request) => {
    return {
      schema,
      context: context(request),
      graphiql: true,
    };
  })
);

const SERVER_PORT = serverConfig.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`Starting up server on port ${SERVER_PORT}`);
});
