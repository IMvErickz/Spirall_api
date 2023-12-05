import { FastifyInstance } from "fastify";
import { io } from "../../lib/socket";

export async function ReceiveMessage(fastify: FastifyInstance) {
    fastify.get('/received', async (req, res) => {
        const { message }: any = req.params
        io.on('connection', (socket) => {
            socket.on('chat message', (msg) => {
                return res.status(200).send(msg)
            })
        })
    })
}