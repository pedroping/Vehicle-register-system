require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.disable('x-powered-by');

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

const validateRequestSource = (req, _, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const secFetch = req.headers['sec-fetch-mode'];
  const clientIp = req.ip || req.connection.remoteAddress;

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

  console.log(`[${req.method}] ${req.url} - Source: ${source}`);

  next();
};

app.use(validateRequestSource);

app.use((req, res, next) => {
  if (!req.cookies.session_id) {
    res.cookie('session_id', 'user-' + Date.now(), { httpOnly: true });
  }
  next();
});

const readDb = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return { vehicles: [], brands: [], categories: [] };
  }
};

const writeDb = async (data) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
};

const createCrudRouter = (entityName) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const db = await readDb();
    res.json(db[entityName]);
  });

  router.get('/:id', async (req, res) => {
    const db = await readDb();
    const item = db[entityName].find((i) => i.id == req.params.id);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  router.post('/', async (req, res) => {
    const db = await readDb();
    const newItem = req.body;

    if (!newItem.id) {
      newItem.id = Date.now().toString();
    }

    db[entityName].push(newItem);
    await writeDb(db);

    res.status(201).json({ message: 'Created', item: newItem });
  });

  router.put('/:id', async (req, res) => {
    const db = await readDb();
    const index = db[entityName].findIndex((i) => i.id == req.params.id);

    if (index !== -1) {
      db[entityName][index] = { ...db[entityName][index], ...req.body };
      await writeDb(db);
      res.json({ message: 'Updated', item: db[entityName][index] });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const db = await readDb();
    const initialLength = db[entityName].length;
    const newArray = db[entityName].filter((i) => i.id != req.params.id);

    if (newArray.length < initialLength) {
      db[entityName] = newArray;
      await writeDb(db);
      res.json({ message: 'Deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  router.get('/secret/:id', async (req, res) => {
    const id = req.params.id;

    if (id == process.env['VERY_SECRET']) {
      res.json({ message: 'Toop' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  return router;
};

const encryptValue = (text, secretEnv) => {
  const algorithm = 'aes-256-cbc';

  const key = crypto.createHash('sha256').update(String(secretEnv)).digest();

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
};

const decryptValue = (encryptedText, secretEnv) => {
  const algorithm = 'aes-256-cbc';

  const [ivHex, dataHex] = encryptedText.split(':');

  const key = crypto.createHash('sha256').update(String(secretEnv)).digest();
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(dataHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

app.use('/vehicles', createCrudRouter('vehicles'));
app.use('/brands', createCrudRouter('brands'));
app.use('/categories', createCrudRouter('categories'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
