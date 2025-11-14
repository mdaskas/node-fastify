import createError from "@fastify/error";

export const codes = {
    APP_ERROR: createError("APP_ERROR", "Application error occurred", 501),
}
