// server.js
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";

import "dotenv/config";
import morgan from "morgan";
import { PORT, SECRET_KEY } from "./src/config/env.js";
import router from "./src/routes/auht.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SECRET_KEY, // Cambia esto por una clave secreta en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Usar 'true' si usas HTTPS
  })
);

//Rutas
app.use(router);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
