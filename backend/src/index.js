import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import inicializarDB from './db/init.js';
import router from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL ||
        'http://localhost:5173',
}));
app.use('/api/items', router);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Backend funcionando' });
});

inicializarDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al inicializar la BD:', err);
    });


