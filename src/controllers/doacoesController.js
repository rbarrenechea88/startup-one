import NaoEncontrado from "../errors/ErroNotFound.js";
import { doadores, doacoes } from "../models/index.js";

class DoacaoController {

  static listarDoacaos = async (req, res, next) => {
    try {
      const buscaDoacaos = doacoes.find();

      req.resultado = buscaDoacaos;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarDoacaoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await doacoes.findById(id)
        .populate("doador", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do doacao não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarDoacao = async (req, res, next) => {
    try {
      let doacao = new doacoes(req.body);

      const livroResultado = await doacao.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarDoacao = async (req, res, next) => {
    try {
      const id = req.params.id;
    
      const livroResultado = await doacoes.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "A doação foi atualizada com sucesso"});
      } else {
        next(new NaoEncontrado("O id da doação não foi localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirDoacao = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await doacoes.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "A doação foi removida com sucesso"});
      } else {
        next(new NaoEncontrado("Id do doacao não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarDoacaoPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const doacoesResultado = doacoes
          .find(busca)
          .populate("doador");

        req.resultado = doacoesResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { instituicao, doador, minValorDoacao, maxValorDoacao, nomeDoador } = parametros;

  let busca = {};

  if (instituicao) busca.instituicao = instituicao;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minValorDoacao || maxValorDoacao) busca.valorDoacao = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minValorDoacao) busca.valorDoacao.$gte = minValorDoacao;
  // lte = Less Than or Equal = Menor ou igual que
  if (maxValorDoacao) busca.valorDoacao.$lte = maxValorDoacao;

  if (nomeDoador) {
    const doador = await doadores.findOne({ nome: nomeDoador });

    if (doador !== null) {
      busca.doador = doador._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default DoacaoController;