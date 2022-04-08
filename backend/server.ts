const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
const cors = require("cors");

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { WordResolver } from './src/WordResolver'


require("dotenv").config();

const app = Express();


const MONGODB_URI = process.env.MONGODB_URI;

// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("error connection to MongoDB:", error.message);
//   });

const main = async () => {
    const schema = await buildSchema({
        resolvers: [WordResolver],
        //emitSchemaFile: true
      });
      const apolloServer = new ApolloServer({
        schema,
        context: async ({ req, res }) => {
          return { res, req, payload: "asd" };
        },
      });

  apolloServer.applyMiddleware({ app, cors: {
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: 'http://localhost:3000',
  } });

  app.listen(4000, () => {
    console.log("Server started on 4000");
  });
};
main();
