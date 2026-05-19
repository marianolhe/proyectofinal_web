import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM items WHERE activo = 1');
        res.json(resultado.rows);
    } catch (err) {
        console.error('Error al obtener items:', err);
        res.status(500).json({ error: 'Error al obtener items' });
    }
});

router.post('/', async (req, res) => {
    const { id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos } = req.body;
    try {
        const resultado = await db.query(
            `INSERT INTO items (id, nombre, "categoriaId", estado, puntuacion, "fechaRegistro", "fechaActividad", notas, atributos, activo)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, JSON.stringify(atributos), 1]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (err) {
        console.error('Error al crear item:', err);
        res.status(500).json({ error: 'Error al crear item' });
    }
});

export default router;