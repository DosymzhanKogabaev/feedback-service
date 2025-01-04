import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { swaggerUi, swaggerSpec } from './swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
console.log('Swagger documentation is available at http://localhost:5000/api-docs');

app.get('/', (req, res) => {
    res.send('Feedback Service API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
