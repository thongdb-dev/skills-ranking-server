import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import skillsRouter from './routes/skills.js';
import mySkillsRouter from './routes/mySkill.js';

const app = express();

/* MIDDLEWARES */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  next();
});

/* ROUTER HANDLERS */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/my-skills', mySkillsRouter);

export default app;
