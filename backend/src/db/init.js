import db from './index.js';

async function inicializarDB() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS items (
            id TEXT PRIMARY KEY,
            nombre TEXT NOT NULL,
            "categoriaId" TEXT,
            estado TEXT,
            puntuacion REAL,
            "fechaRegistro" TEXT,
            "fechaActividad" TEXT,
            notas TEXT,
            atributos TEXT,
            activo INTEGER DEFAULT 1
        );
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS registros (
            id TEXT PRIMARY KEY,
            "itemId" TEXT,
            fecha TEXT,
            valor REAL,
            notas TEXT
        );
    `);

    console.log('Tablas creadas correctamente');
}

export default inicializarDB;