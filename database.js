const { MongoClient } = require('mongodb');

const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);
let conn;
let db;

async function connectDatabase() {
    if (db) {
        return db;
    }
    try {
        conn = await client.connect();
      } catch(e) {
        console.error(e);
      }
    db = conn.db(process.env.DB_NAME);
    console.log('Conexion a la DB creada');
    return db;
}

module.exports = connectDatabase;