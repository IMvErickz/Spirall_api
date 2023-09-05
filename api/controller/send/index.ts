import { FastifyInstance } from "fastify";
import { socket } from "../../lib/socket";

interface MessageProps {
    message: string
}

export async function SendMessage(fastify: FastifyInstance) {
    fastify.post('/send', async (req, res) => {
        const { message }: MessageProps | any = req.body
        socket.emit('chat', () => {
            res.status(200).send({ Message: message })
        })
    })
}