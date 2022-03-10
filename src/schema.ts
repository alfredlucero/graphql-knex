import { makeSchema } from "nexus";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import * as types from "./graphql";

// With Nexus
// 1. Define components of schema (types, fields, root objects)
// 2. Generate GraphQL SDL and types
// 3. Implement corresponding resolver functions for added fields
export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    // TypeScript type definitions for all types in GraphQL schema generated to keep things in sync with implementation
    typegen: join(process.cwd(), "nexus-typegen.ts"),
  },
  contextType: {
    module: join(process.cwd(), "./src/context.ts"),
    export: "Context",
  },
}) as unknown as GraphQLSchema;
