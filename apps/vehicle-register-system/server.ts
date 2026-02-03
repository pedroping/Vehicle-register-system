import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { eRoutes } from '@enums';
import { REQUEST, RESPONSE } from '@tokens';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import 'dotenv/config';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const SECRET_KEY = process.env['COOKIE_SECRET'] || 'my-super-secret-key-that-is-32-chars-long';
  const ALGORITHM = 'aes-256-cbc';

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(
    '/api',
    createProxyMiddleware({
      target: process.env['API_URL'] || 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );

  server.get(
    '*',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    }),
  );

  const getKey = () => crypto.createHash('sha256').update(SECRET_KEY).digest();
  const encryptToken = (payload: object): string => {
    const text = JSON.stringify(payload);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  };

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    if (!req.url.includes(eRoutes.LOGIN) && !headers.cookie?.includes('CurrentSessionCookie')) {
      const cookieHash = encryptToken({ ip: req.ip });

      res.cookie('CurrentSessionCookie', cookieHash, {
        path: '/',
        httpOnly: true,
        maxAge: 2592000,
        sameSite: 'none',
        secure: true,
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
  server.use(cookieParser());

  return server;
}

function run(): void {
  const port = process.env['CLIENT_PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.info(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
