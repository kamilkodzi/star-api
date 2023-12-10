import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { StarWarsApi } from './datasources/swapi.js'
import { typeDefs } from './schema/typeDefs.js'
import { resolvers } from './schema/resolvers.js'

export interface ContextValue {
  swapi: StarWarsApi
}

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()
app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async () => {
      return {
        swapi: new StarWarsApi({}),
      }
    },
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log(`🚀 Server ready at http://localhost:4000/`)
