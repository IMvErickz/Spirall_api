import Fastify from 'fastify'
import Cors from '@fastify/cors'
import fastifyIO from "fastify-socket.io";
import { socket } from './lib/socket';

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

    fastify.get('/:name', async (req, res) => {
        const { name }: any = req.params
        socket.emit('conection', () => {
            res.status(200).send({ Name: name })
        })
    })

    fastify.listen({ port: 3333 })

}

Main()