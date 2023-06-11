import express from "express";
import InstituicaoController from "../controllers/instituicoesController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/instituicoes", InstituicaoController.listarInstituicoes, paginar)
  .get("/instituicoes/:id", InstituicaoController.listarInstituicaoPorId)
  .post("/instituicoes", InstituicaoController.cadastrarInstituicao)
  .put("/instituicoes/:id", InstituicaoController.atualizarInstituicao)
  .delete("/instituicoes/:id", InstituicaoController.excluirInstituicao);

export default router;   