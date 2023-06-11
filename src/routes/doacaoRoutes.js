import express from "express";
import DoacaoController from "../controllers/doacoesController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/doacoes", DoacaoController.listarDoacaos, paginar)
  .get("/doacoes/busca", DoacaoController.listarDoacaoPorFiltro, paginar)
  .get("/doacoes/:id", DoacaoController.listarDoacaoPorId)
  .post("/doacoes", DoacaoController.cadastrarDoacao)
  .put("/doacoes/:id", DoacaoController.atualizarDoacao)
  .delete("/doacoes/:id", DoacaoController.excluirDoacao);

export default router;   