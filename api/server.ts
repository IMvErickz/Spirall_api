import Fastify from 'fastify'
import Cors from '@fastify/cors'
import fastifyIO from "fastify-socket.io";
import { GetUser } from './controller/user/getUser';
import { RegisterUser } from './controller/user/register';
import { SendMessage } from './controller/send';
import { Auth } from './controller/auth/auth';

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

    fastify.register(GetUser)
    fastify.register(RegisterUser)
    fastify.register(SendMessage)
    fastify.register(Auth)

    fastify.listen({ port: 3333 })

}

Main()