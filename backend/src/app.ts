import express, { Express } from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todos'; 
import indexRoutes from './routes/index';
import config from './config/config'; 
const cookieParser = require('cookie-parser'); 
import {identifyUser} from './middleware/auth.middleware';
import { validateTodoData, handleValidationErrors } from './middleware/validation.middleware'; 
import path from 'path';

const app: Express = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname,'..', 'public')));


// Routes
app.use('/todos', identifyUser , todoRoutes); 
app.use('/', identifyUser, indexRoutes); 


// const openapiDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));


mongoose.connect(config.mongoUri)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); 
  });

export default app; 
