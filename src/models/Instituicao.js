import mongoose from "mongoose";

const instituicaoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome da instituição é obrigatório"]
    }
  },
  {
    versionKey: false
  }
);

const instituicoes = mongoose.model("instituicoes", doadorSchema);

export default instituicoes;