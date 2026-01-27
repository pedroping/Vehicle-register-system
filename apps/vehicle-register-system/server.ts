import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { REQUEST, RESPONSE } from '@tokens';
import compression from 'compression';
import crypto from 'crypto';
import 'dotenv/config';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get(
    '*',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    }),
  );

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    const currentCookies = headers.cookie || '';

    if (!currentCookies.includes('CurrentSessionCookie')) {
      const cookieHash = crypto
        .createHmac('sha256', crypto.randomBytes(128).toString('base64'))
        .update('ProjectToken')
        .digest('hex');

      res.cookie('CurrentSessionCookie', cookieHash, {
        path: '/',
        httpOnly: true,
        maxAge: 2592000,
        sameSite: 'lax',
        secure: process.env['NODE_ENV'] === 'production',
      });

      if (req.headers.cookie) {
        req.headers.cookie += `; CurrentSessionCookie=${cookieHash}`;
      } else {
        req.headers.cookie = `CurrentSessionCookie=${cookieHash}`;
      }
    }

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: REQUEST, useValue: req },
          { provide: RESPONSE, useValue: res },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  server.use(compression());

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.info(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
