import dotenv from 'dotenv';
import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

dotenv.config();

interface BaseEntity {
  id: string;
}

interface DbSchema {
  vehicles: BaseEntity[];
  brands: BaseEntity[];
  categories: BaseEntity[];
}

interface CustomRequest extends Request {
  requestSource?: string;
}

const app = express();
const PORT = process.env['PORT'] || 3000;
const DB_PATH = path.join(__dirname, './assets', 'db.json');
const SECRET_KEY = process.env['COOKIE_SECRET'] || 'my-super-secret-key-that-is-32-chars-long';
const ALGORITHM = 'aes-256-cbc';

app.disable('x-powered-by');

app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4100',
      'http://127.0.0.1:4100',
      'https://vehicle-register-system-1.onrender.com',
    ],
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

const validateAuthCookie = (req: Request, res: Response, next: NextFunction) => {
  // if (req.path === '/login' || req.url.includes('secret')) {
  //   return next();
  // }

  // if (!req.cookies || !req.cookies['TokenCookie']) {
  //   console.warn(`[Blocked] Access attempt to ${req.url} without TokenCookie`);
  //   return res.status(401).json({ message: 'Unauthorized: TokenCookie is required' });
  // }

  next();
};

app.use(validateAuthCookie);

const validateRequestSource = (req: CustomRequest, _: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'] || '';
  const secFetch = req.headers['sec-fetch-mode'] as string | undefined;
  const clientIp = req.ip || req.socket.remoteAddress;

  let source = 'unknown';

  if (secFetch || req.headers['sec-ch-ua']) {
    source = 'browser';
  } else if (clientIp === '::1' || clientIp === '127.0.0.1' || clientIp === '::ffff:127.0.0.1') {
    source = 'server (SSR)';
  }

  if (userAgent.includes('node') || userAgent.includes('axios')) {
    source = 'server (SSR)';
  } else {
    source = 'browser (legacy/assumed)';
  }

  req.requestSource = source;

  console.info(`[${req.method}] ${req.url} - Source: ${source}`);

  next();
};

app.use(validateRequestSource);

const readDb = async (): Promise<DbSchema> => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data) as DbSchema;
  } catch (error) {
    console.error('Error reading db.json:', error);
    return { vehicles: [], brands: [], categories: [] };
  }
};

const writeDb = async (data: DbSchema): Promise<void> => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
};

const createCrudRouter = (entityName: keyof DbSchema) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    const db = await readDb();
    res.json(db[entityName]);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const db = await readDb();
    const item = db[entityName].find((i) => i.id == req.params['id']);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  router.post('/', async (req: Request, res: Response) => {
    const db = await readDb();
    const newItem: BaseEntity = req.body;

    if (!newItem.id) {
      newItem.id = Date.now().toString();
    }

    db[entityName].push(newItem);
    await writeDb(db);

    res.status(201).json({ message: 'Created', item: newItem });
  });

  router.put('/:id', async (req: Request, res: Response) => {
    const db = await readDb();
    const index = db[entityName].findIndex((i) => i.id == req.params['id']);

    if (index !== -1) {
      db[entityName][index] = { ...db[entityName][index], ...req.body };
      await writeDb(db);
      res.json({ message: 'Updated', item: db[entityName][index] });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const db = await readDb();
    const initialLength = db[entityName].length;
    const newArray = db[entityName].filter((i) => i.id != req.params['id']);

    if (newArray.length < initialLength) {
      db[entityName] = newArray;
      await writeDb(db);
      res.json({ message: 'Deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  return router;
};

const router = Router();

router.get('/secret/:id', async (req: Request, res: Response) => {
  const id = req.params['id'];

  if (id === process.env['VERY_SECRET']) {
    res.json({ message: 'Toop' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { password } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.ip;

  if (!password) {
    res.status(400).json({ message: 'Password required' });
    return;
  }

  const payload = {
    ip: clientIp,
    pass: password,
    createdAt: Date.now(),
  };

  const encryptedCookie = encryptToken(payload);

  res.cookie('TokenCookie', encryptedCookie, {
    path: '/',
    httpOnly: true,
    maxAge: 2592000,
    sameSite: 'none',
    secure: true,
  });

  console.info(
    `[Login] Token created for IP: ${clientIp}`,
    req.headers['x-forwarded-for'],
    req.headers['X-Forwarded-For'],
    req.ip,
  );

  res.json({ message: 'Toop' });
});

router.get('/session', (req: Request, res: Response) => {
  const cookie = req.cookies['TokenCookie'];

  if (!cookie) {
    res.status(401).json({ message: 'No cookie found' });
    return;
  }

  const data = decryptToken(cookie);

  if (!data) {
    res.status(401).json({ message: 'Invalid Token' });
    return;
  }

  const currentIp = req.headers['x-forwarded-for'] || req.ip;

  if (data.ip !== currentIp) {
    res.status(401).json({ message: 'IP Address mismatch! Token stolen?' });
    return;
  }

  res.json({ message: 'Valid!' });
});

const getKey = () => crypto.createHash('sha256').update(SECRET_KEY).digest();

export const encryptToken = (payload: object): string => {
  const text = JSON.stringify(payload);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

export const decryptToken = (token: string) => {
  try {
    const [ivHex, encryptedData] = token.split(':');
    if (!ivHex || !encryptedData) return null;

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

app.use(router);
app.use('/vehicles', createCrudRouter('vehicles'));
app.use('/brands', createCrudRouter('brands'));
app.use('/categories', createCrudRouter('categories'));

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
