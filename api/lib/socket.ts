import { Server } from "socket.io";
import http from 'http';

const server = http.createServer();

export const socket = new Server()