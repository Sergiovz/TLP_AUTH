import { createPool } from "mysql2/promise";
import "dotenv/config";

// Conexión a la base de datos
const connection = async () => {
  try {
    const pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("Database connected");
    return pool;
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

const Pool = await connection();

export { Pool };
