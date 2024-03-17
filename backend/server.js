// server.js
import routes from './routes/routes.js';
import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes); 

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(port, () => console.log(`Server started on  http://localhost:${port}`));
