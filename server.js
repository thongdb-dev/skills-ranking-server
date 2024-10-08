import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { insertSampleSkills } from './utils/insertSampleData.js';

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
    // insertSampleSkills();
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
