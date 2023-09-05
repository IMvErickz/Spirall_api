import { FastifyInstance } from "fastify";
import { socket } from "../../lib/socket";

export async function ReceiveMessage(fastify: FastifyInstance) {
    fastify.get('/:oi', async (req, res) => {
        const { message }: any = req.params
        socket.emit('conection', () => {
            res.status(200).send({ Message: message })
        })
    })
}