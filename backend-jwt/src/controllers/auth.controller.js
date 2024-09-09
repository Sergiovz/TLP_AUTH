import { Pool } from "../db/database.js";
import generarJwt from "../helpers/generar-jwt.js";

// Prueba de conexión a la base de datos
export const Ping = async (req, res) => {
  const result = await Pool.query("SELECT 1 + 1 AS result");
  res.json(result[0]);
};

// Controlador de registro
export const registerController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const user = await Pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    console.log(user);

    if (user[0].length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear un nuevo usuario
    const [rows] = await Pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    return res.status(201).send({
      id: rows.insertId,
      username,
      password,
    });
  } catch (err) {
    console.error("Error en la base de datos: ", err);
    return res.status(500).json({ message: "Error en la base de datos" });
  }
};

// Controlador de inicio de sesión
export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await Pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    // Validación de usuario
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    const user = rows[0];

    // Generar JWT
    const token = await generarJwt(user);

    // Almacenar el token en la sesión del servidor
    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

//
export const sessionController = (req, res) => {
  console.log(req.user);
  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};

//
export const logoutController = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};
