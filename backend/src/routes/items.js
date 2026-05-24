import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM items WHERE activo = 1');
        const items = resultado.rows.map(item => ({
            ...item,
            activo: item.activo === 1,
            atributos: item.atributos ? JSON.parse(item.atributos) : {}
        }));
        res.json(items);
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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos } = req.body;
    try {
        const resultado = await db.query(
            `UPDATE items SET nombre = $1, estado = $2, puntuacion = $3, notas = $4, atributos = $5, 
            "fechaActividad" = $6 WHERE id = $7
            RETURNING *`,
            [nombre, estado, puntuacion, notas, JSON.stringify(atributos), fechaActividad, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error('Error al actualizar item:', err);
        res.status(500).json({ error: 'Error al actualizar item' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query(
            `UPDATE items SET activo = 0 WHERE id = $1 RETURNING *`,
            [id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }
        res.json({ mensaje: 'Item eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar item:', err);
        res.status(500).json({ error: 'Error al eliminar item' });
    }
});

router.post('/:id/registro', async (req, res) => {
    const { id } = req.params;
    const { fecha, valor, notas } = req.body;
    try {
        const registroId = crypto.randomUUID();
        const resultado = await db.query(
            `INSERT INTO registros (id, "itemId", fecha, valor, notas)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [registroId, id, fecha, valor, notas]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (err) {
        console.error('Error al crear registro:', err);
        res.status(500).json({ error: 'Error al crear registro' });
    }
});

export default router;