import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

const generarJwt = async (userId) => {
  const payload = { userId };
    const secret = SECRET_KEY;

  const token = jwt.sign(payload, secret, {
    expiresIn: "5h",
  });

  return token;
};

export default generarJwt;