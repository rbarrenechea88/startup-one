import mongoose from "mongoose";

const doacaoSchema = new mongoose.Schema(
  {
    id: {type: String},
    doador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doadores",
      required: [true, "O(a) doador(a) é obrigatório"]
    },
    instituicao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instituicoes",
      required: [true, "A instituicao é obrigatória"]
    },
    valorDoacao: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 1 && valor <= 9999999;
        },
        message: "O valor da doacao deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

const doacoes= mongoose.model("doacoes", doacaoSchema);

export default doacoes;