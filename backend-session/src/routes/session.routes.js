import { Router } from "express";
import {
  loginController,
  logoutController,
  sessionController,
} from "../controllers/session.controller";

const router = Router();

// Ruta para manejar el inicio de sesión
router.post("/login", loginController);

// Ruta para obtener los datos de la sesión
router.get("/session", sessionController);

// Ruta para cerrar la sesión
router.post("/logout", logoutController);

export default router;
