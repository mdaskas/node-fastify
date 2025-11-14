import fastify, { type FastifyError, type FastifyRequest, type FastifyReply, type RouteOptions } from "fastify";
import fastifyStatic from "@fastify/static";
import routes from "./routes";

 type HookParams = {
    request: FastifyRequest;
    reply: FastifyReply;
}

export async function build(opts = {}) {
    const app = fastify(opts);

    app.register(fastifyStatic, {
        root: `${import.meta.dirname}/../public`,
        wildcard: false,
    });

   

    const logMe = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        request.log.info({ url: request.url }, 'Incoming request');
    }
    
    app.addHook('onRoute', async (routeOptions) => {
        if (routeOptions.config?.logMe) {
          routeOptions.onRequest = logMe;  
        }
        app.log.info({ route: routeOptions.url }, 'New route registered');
    });

    app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        request.log.info({ url: request.url }, 'Incoming request');
    });
    app.register(routes);

    app.setErrorHandler(async function(
        err: FastifyError,
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        request.log.error(err);
        reply.code(err.statusCode || 500);
        return { error: err.message};
    });

     app.setNotFoundHandler(async (request: FastifyRequest, reply: FastifyReply) => {   
        reply.code(404);
        return { error: 'Not Found' };
    });

    return app; 
}
