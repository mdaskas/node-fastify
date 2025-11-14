import type { FastifyRequest, FastifyReply } from "fastify";
import { codes } from "./errors";

/** @type {import('fastify').FastifyPluginAsync<>   } */
interface RouteOptions {}

export default async function routes(app: any, opt: RouteOptions): Promise<void> {
    app.get('/home', async (request: FastifyRequest, reply: FastifyReply) => {
       return reply.sendFile('index.html');
    });

    // app.post('/movies', {
    //     config: {
    //         logMe: true
    //     },
    //     schema: {
    //         body: {
    //             type: 'object',
    //             properties: {
    //                 title: { tpe: 'string' },
    //                 year: { type: 'number' }
    //             },
    //             required: ['title', 'year'],
    //         }
    //     }
    // }, async (request: FastifyRequest, reply: FastifyReply) => {
    //     const { title, year } = request.body as { title: string; year: number };
    //    return { title, year };
    // });


    app.get('/error', async (request: FastifyRequest, reply: FastifyReply) => {
        throw new codes.APP_ERROR();
    });

    app.get('/not-found', async (request: FastifyRequest, reply: FastifyReply) => {
        request.log.info('Not found route accessed');
        reply.callNotFound();
    });
}
