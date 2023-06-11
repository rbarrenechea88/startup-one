import NaoEncontrado from "../errors/ErroNotFound.js";
import { doadores } from "../models/index.js";

class DoadorController {
  static listarDoadores = async (req, res, next) => {
    try {
      const doadoresResultado = doadores.find();

      req.resultado = doadoresResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarDoadorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const doadorResultado = await doadores.findById(id);

      if (doadorResultado !== null) {
        res.status(200).send(doadorResultado);
      } else {
        next(new NaoEncontrado("O id do(a) doador(a) não foi localizado(a)!"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarDoador = async (req, res, next) => {
    try {
      let doador = new doadores(req.body);

      const doadorResultado = await doador.save();

      res.status(201).send(doadorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarDoador = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const doadorResultado = await doadores.findByIdAndUpdate(id, {$set: req.body});

      if (doadorResultado !== null) {
        res.status(200).send({message: "O(A) doador(a) foi atualizado(a) com sucesso!"});
      } else {
        next(new NaoEncontrado("O id do(a) doador(a) não foi localizado(a)!"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirDoador = async (req, res, next) => {
    try {
      const id = req.params.id;

      const doadorResultado = await doadores.findByIdAndDelete(id);


      if (doadorResultado !== null) {
        res.status(200).send({message: "O(A) doador(a) removido(a) com sucesso!"});
      } else {
        next(new NaoEncontrado("O id do(a) doador(a) não foi localizado(a)!"));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default DoadorController;