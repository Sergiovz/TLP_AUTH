import { createPool } from "mysql2/promise";
import "dotenv/config";

// Conexión a la base de datos MySQL
const conn = async () => {
  //manejo de errores
  try {
    const pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
    });
    console.log("Conexión a la base de datos exitosa");
    return pool;
  } catch (err) {
    console.log("Error en la conexión a la base de datos: " + err);
  }
};

const Pool = await conn();

// Exportar la conexión
export { Pool };
