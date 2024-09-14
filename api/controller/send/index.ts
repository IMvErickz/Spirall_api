import { FastifyInstance } from "fastify";
import { io } from "../../lib/socket";
import { z } from "zod";

interface MessageProps {
    message: string
}

export async function SendMessage(fastify: FastifyInstance) {
    io.on('connection', (socket) => {
        console.log('Novo usuário conectado');
        fastify.post('/send', async (req, res) => {
            socket.on('chat message', (msg: string) => {
                const message = z.string().parse(req.body)
                msg = message
                console.log('Mensagem recebida:', msg);
                io.emit('chat message', msg);
            });

            socket.on('disconnect', () => {
                console.log('Usuário desconectado');
            });
        })

    })
}