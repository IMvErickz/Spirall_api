import { FastifyInstance } from "fastify";
import { io } from "../../lib/socket";
import { z } from "zod";

export async function ReceiveMessage(fastify: FastifyInstance) {
    fastify.get('/received', async (req, res) => {
        //const { message }: any = req.params
        io.on('connection', (socket) => {
            console.log('Novo usuário conectado');

            socket.on('chat message', () => {
                const message = z.string().parse(req.body)
                console.log('Mensagem recebida:', message);
                io.emit('chat message', message);
            });

            socket.on('disconnect', () => {
                console.log('Usuário desconectado');
            });
        })
    })
}