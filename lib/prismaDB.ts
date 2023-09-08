import { PrismaClient } from '@prisma/client'

//global.prismadb to disable multiple PrismaClient objects
const client = global.prismadb || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prismadb = client

export default client