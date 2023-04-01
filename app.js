const dotenv = require('dotenv')
const express = require('express')
const {ApolloServer} = require("@apollo/server")
const {readFile} = require('fs/promises')
const {resolvers} = require('./src/graphql/resolvers')
const {mongoConnect} = require('./src/services/mongoConnect')
const { expressMiddleware } = require('@apollo/server/express4');
const cors=require('cors')
const {createServer} = require('http')
const  bodyParser = require('body-parser');

dotenv.config()
const app = express()

const httpServer = createServer(app)

async function startServer(){
    mongoConnect()
    const typedef = (await readFile('src/graphql/schema.graphql')).toString('utf-8')
    const server = new ApolloServer({
        typeDefs : typedef,
        resolvers : resolvers,
    });
    await server.start();
    app.use(cors({origin:"*"}));
    app.use(
      '/graphql',
      bodyParser.json(),
      expressMiddleware(server),
    );
    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT } , resolve));
    console.log('Server started at port : ',process.env.PORT)
}

startServer();
