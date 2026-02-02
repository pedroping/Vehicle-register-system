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
const PORT = 3000;
const DB_PATH = path.join(__dirname, './assets', 'db.json');

app.disable('x-powered-by');

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:4100'],
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

const validateAuthCookie = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/login' || req.url.includes('secret')) {
    return next();
  }

  if (!req.cookies || !req.cookies['TokenCookie']) {
    console.warn(`[Blocked] Access attempt to ${req.url} without TokenCookie`);
    return res.status(401).json({ message: 'Unauthorized: TokenCookie is required' });
  }

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

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies['session_id']) {
    res.cookie('session_id', 'user-' + Date.now(), { httpOnly: true });
  }
  next();
});

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

  if (!password) {
    res.status(400).json({ message: 'Password required' });
    return;
  }

  const cookieHash = crypto
    .createHmac('sha256', crypto.randomBytes(128).toString('base64'))
    .update(password)
    .digest('hex');

  res.cookie('TokenCookie', cookieHash, {
    path: '/',
    httpOnly: true,
    maxAge: 2592000,
    sameSite: 'lax',
    secure: process.env['NODE_ENV'] === 'production',
  });

  res.json({ message: 'Toop' });
});

router.get('/session', async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies?.['TokenCookie'];

    if (!cookie) {
      res.status(401).end();
      return;
    }

    res.status(200).end();
    return;
  } catch (error) {
    console.info(error);
    res.status(401).end();
    return;
  }
});

// const getSecretKey = (secretEnv: string | undefined): Buffer => {
//   if (!secretEnv) throw new Error('Encryption key (env) is missing');
//   return crypto.createHash('sha256').update(String(secretEnv)).digest();
// };

// const encryptValue = (text: string, secretEnv: string | undefined): string => {
//   const algorithm = 'aes-256-cbc';
//   const key = getSecretKey(secretEnv);
//   const iv = crypto.randomBytes(16);

//   const cipher = crypto.createCipheriv(algorithm, key, iv);

//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   return iv.toString('hex') + ':' + encrypted;
// };

// const decryptValue = (encryptedText: string, secretEnv: string | undefined): string => {
//   const algorithm = 'aes-256-cbc';
//   const [ivHex, dataHex] = encryptedText.split(':');

//   const key = getSecretKey(secretEnv);
//   const iv = Buffer.from(ivHex, 'hex');

//   const decipher = crypto.createDecipheriv(algorithm, key, iv);

//   let decrypted = decipher.update(dataHex, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');

//   return decrypted;
// };

app.use(router);
app.use('/vehicles', createCrudRouter('vehicles'));
app.use('/brands', createCrudRouter('brands'));
app.use('/categories', createCrudRouter('categories'));

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
