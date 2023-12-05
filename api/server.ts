import Fastify from 'fastify'
import Cors from '@fastify/cors'
import Static from '@fastify/static'
import http, { createServer } from 'http'
import { Server } from 'socket.io';
import fastifyIO from "fastify-socket.io";
import { GetUser } from './controller/user/getUser';
import { RegisterUser } from './controller/user/register';
import { SendMessage } from './controller/send';
import { Auth } from './controller/auth/auth';
import { ReceiveMessage } from './controller/receive';
import { io } from './lib/socket';

async function Main() {

    const fastify = Fastify({
        logger: true
    })

    fastify.register(Cors, {
        origin: true
    })

    const server = http.createServer();


    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })

    fastify.register(Static, {
        root: __dirname,
        wildcard: false,
    });



    io.on('connection', (socket) => {
        console.log('Novo usuário conectado');

        socket.on('chat message', (msg: string) => {
            console.log('Mensagem recebida:', msg);
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado');
        });
    })

    server.listen({ port: 3333 })

}

Main()