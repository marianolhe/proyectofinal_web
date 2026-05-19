import pg from "pg";

const db = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'coleccion_viajes',
    user: 'marianolhe',
});

export default db;
