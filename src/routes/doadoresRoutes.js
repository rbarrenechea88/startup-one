import express from "express";
import DoadorController from "../controllers/doadoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/doadores", DoadorController.listarDoadores, paginar)
  .get("/doadores/:id", DoadorController.listarDoadorPorId)
  .post("/doadores", DoadorController.cadastrarDoador)
  .put("/doadores/:id", DoadorController.atualizarDoador)
  .delete("/doadores/:id", DoadorController.excluirDoador);

export default router;   