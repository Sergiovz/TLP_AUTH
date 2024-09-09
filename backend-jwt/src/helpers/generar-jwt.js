import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

const generarJwt = async (userId) => {
  const payload = { userId };
  const secret = SECRET_KEY;

  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: "5h",
    });

    return token;
  } catch (error) {
    console.error("Error al generar el token JWT:", error);
    throw new Error("No se pudo generar el token JWT");
  }
};

export default generarJwt;
