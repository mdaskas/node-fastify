import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from './app.js';

test('server builds correctly', async () => {
  const opts: any = {
    logger: {
      level: 'info'
    }
  };
  const app = await build(opts);
  assert.ok(app);
});

test('basic server', async (t) => {
    const app = await build({});
    t.after(async () => {
      await app.close();
    });

    const response = await app.inject({
      method: 'GET',
      url: '/'
    });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), { message: 'Hello, Fastify!' });
});
