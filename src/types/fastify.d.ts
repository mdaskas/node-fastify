// Extend Fastify types to include custom route config
declare module 'fastify' {
    interface FastifyContextConfig {
        logMe?: boolean;
    }
}

// This file extends the global Fastify types
export {};
