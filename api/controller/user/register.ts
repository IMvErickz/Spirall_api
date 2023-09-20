import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function RegisterUser(fastify: FastifyInstance) {
    fastify.post('/user', async (req, res) => {
        const userSchema = z.object({
            Name: z.string(),
            email: z.string().email(),
            password: z.string()
        })

        if (!userSchema) {
            return res.status(400).send()
        }

        const { Name, email, password } = userSchema.parse(req.body)

        await prisma.user.create({
            data: {
                Name,
                email,
                password,

            }
        })

        return res.status(201).send()
    })
}