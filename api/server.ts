import Fastify from 'fastify'
import Cors from '@fastify/cors'
import fastifyIO from "fastify-socket.io";
import { SendMessage } from './controller/send';
import { ReceiveMessage } from './controller/receive';
import { RegisterUser } from './controller/user/register';

async function Main() {

    const fastify = Fastify({
        logger: true
    })

    fastify.register(Cors, {
        origin: true
    })

    fastify.register(fastifyIO, {
        cors: {
            origin: "http://localhost:3333",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        }
    })

    fastify.register(SendMessage)
    fastify.register(ReceiveMessage)
    fastify.register(RegisterUser)

    fastify.listen({ port: 3333 })

}

Main()