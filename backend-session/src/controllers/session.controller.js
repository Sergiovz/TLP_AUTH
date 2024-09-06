import { Pool } from "../../db/database.js";

// Controlador para verificar que el servidor está corriendo
export const Ping = async (req, res) => {
  const result = await Pool.query("SELECT 1 + 1 AS result");
  res.json(result[0]);
};

// Controlador para registrar un nuevo usuario
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
    console.log(rows);
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

// Controlador para iniciar sesión
export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await Pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    console.log(rows);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear la sesión
    req.session.userId = user.id;
    req.session.username = user.username;

    return res.json({ message: "Sesión iniciada exitosamente" });
  } catch (err) {
    console.error("Error en labase de datos: ", err);
    return res.status(500).json({ message: "Error en la base de datos" });
  }
};

// Controlador para obtener los datos de la sesión
export const sessionController = (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      user: { id: req.session.userId, username: req.session.username },
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: "No hay sesión activa" });
  }
};

// Controlador para cerrar la sesión
export const logoutController = (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    res.clearCookie("connect.sid"); // Nombre de cookie por defecto para express-session
    return res.json({ message: "Sesión cerrada exitosamente" });
  });
};
