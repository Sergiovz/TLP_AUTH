import { Router } from "express";
import {
  loginController,
  logoutController,
  sessionController,
} from "../controllers/auth.controller.js";
import validarJwt from "../middlewares/validar-jwt.js";

const router = Router();

// Endpoint de inicio de sesión (login)
router.post("/login", loginController);

// Endpoint para validar la sesión
router.get("/session", validarJwt, sessionController);

// Endpoint de cierre de sesión (logout)
router.post("/logout", logoutController);

export default router;
