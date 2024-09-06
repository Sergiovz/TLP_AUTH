import { Router } from "express";
import {
  loginController,
  logoutController,
  Ping,
  registerController,
  sessionController,
} from "../controllers/session.controller.js";

const router = Router();

// Ruta para verificar que el servidor está corriendo
router.get("/ping", Ping);

// Ruta para registrar un nuevo usuario
router.post("/register", registerController);

// Ruta para manejar el inicio de sesión
router.post("/login", loginController);

// Ruta para obtener los datos de la sesión
router.get("/session", sessionController);

// Ruta para cerrar la sesión
router.post("/logout", logoutController);

export default router;
