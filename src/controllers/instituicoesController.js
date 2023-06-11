import NaoEncontrado from "../errors/ErroNotFound.js";
import { instituicoes } from "../models/index.js";

class InstituicaoController {
  static listarInstituicoes = async (req, res, next) => {
    try {
      const instituicoesResultado = instituicoes.find();

      req.resultado = instituicoesResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarInstituicaoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const instituicaoResultado = await instituicoes.findById(id);

      if (instituicaoResultado !== null) {
        res.status(200).send(instituicaoResultado);
      } else {
        next(new NaoEncontrado("O id da Instituição não localizado!"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarInstituicao = async (req, res, next) => {
    try {
      let instituicao = new instituicoes(req.body);

      const instituicaoResultado = await instituicao.save();

      res.status(201).send(instituicaoResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarInstituicao = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const instituicaoResultado = await instituicoes.findByIdAndUpdate(id, {$set: req.body});

      if (instituicaoResultado !== null) {
        res.status(200).send({message: "A instituição foi atualizada com sucesso!"});
      } else {
        next(new NaoEncontrado("O id da Instituição não localizado!"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirInstituicao = async (req, res, next) => {
    try {
      const id = req.params.id;

      const instituicaoResultado = await instituicoes.findByIdAndDelete(id);


      if (instituicaoResultado !== null) {
        res.status(200).send({message: "A instituicao removido com sucesso!"});
      } else {
        next(new NaoEncontrado("O id da Instituição não localizado!"));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default InstituicaoController;