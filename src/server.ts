import closeWithGrace from 'close-with-grace';
import { build } from './app.js';

import  prisma from './lib/db.js';

const opts: any = {
  logger: {
    level: 'info'
  }
};

if (process.stdout.isTTY) {
  opts.logger =  { transport: { target: 'pino-pretty' } };
} else {
  opts.logger = true;
}

const app = await build(opts);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = process.env.HOST || '127.0.0.1';

const start = async () => {
  try {
    await app.listen({ port, host });
    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const newUser = await prisma.user.create({
        data: {
          email: 'alice@example.com',
          name: 'Alice',
        },
      });
  console.log('Created user:', newUser);
};

start();

closeWithGrace(async ({ signal, err, manual }) => {
  if (err) {
    app.log.error({ err }, 'server is shutting down due to an error');
  } else {
    app.log.info({ signal }, `${signal} received - server is shutting down gracefully`);
  }
  await app.close();
})
