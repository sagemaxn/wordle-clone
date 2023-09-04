const mongoose = require("mongoose");
import * as Express from "express";
import "reflect-metadata";
import * as cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import * as http from 'http'

import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { WordResolver } from "./src/WordResolver";

require("dotenv").config();

interface MyContext {
  token?: String;
}

const main = async () => {
const app = Express()
  const schema = await buildSchema({
    resolvers: [WordResolver],
  });
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: ['https://wordle.sagemaxn.dev', 'https://studio.apollographql.com'], credentials: true }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at https://wordle.sagemaxn.dev`);
}
main();

