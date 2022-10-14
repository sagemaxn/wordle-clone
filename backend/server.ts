const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
const cors = require("cors");

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { WordResolver } from "./src/WordResolver";

require("dotenv").config();

const app = Express();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [WordResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      return { res, req };
    },
    introspection: true,
    playground: true
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      origin: "https://sage-wordle.herokuapp.com/"
    },
    path: "/graphql"
  });

  app.listen({port: process.env.PORT || 4000}, () => {
    console.log("Server started on 4000");
  });
};
main();
