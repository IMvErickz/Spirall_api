import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function Auth(fastify: FastifyInstance) {
    fastify.post('/auth', async (req, res) => {
        const authSchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const { email, password } = authSchema.parse(req.body)

        const response = await prisma.user.findUniqueOrThrow({
            where: {
                email
            }
        })

        if (response.password != password) {
            return res.status(401).send()
        }

        return { response }
    })
}