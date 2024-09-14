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


    const fastify = Fastify({
        logger: true
    })

    fastify.register(Cors, {
        origin: true
    })


    const io = new Server(fastify.server, {
        cors: {
            origin: true
        }
    })

    fastify.register(Static, {
        root: __dirname,
        wildcard: false,
    });



    io.on('connection', (socket) => {
        console.log('Novo usuário conectado');

        socket.on('Adriel', (msg: string) => {
            console.log('Mensagem recebida:', msg);
            io.emit('Adriel', msg);
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado');
        });
    })

    fastify.register(ReceiveMessage)

    fastify.listen({ port: 3333 })
