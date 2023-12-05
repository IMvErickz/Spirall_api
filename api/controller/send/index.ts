import { FastifyInstance } from "fastify";
import { io } from "../../lib/socket";

interface MessageProps {
    message: string
}

export async function SendMessage(fastify: FastifyInstance) {
    fastify.post('/send', async (req, res) => {
        const { message }: MessageProps | any = req.body

        //const socket = io

        io.on('connection', (socket) => {
            socket.emit('chat message', message)
        })


    })
}