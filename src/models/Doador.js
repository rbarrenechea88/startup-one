import mongoose from "mongoose";

const doadorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome do(a) doador(a) é obrigatório"]
    }
  },
  {
    versionKey: false
  }
);

const doadores = mongoose.model("doadores", doadorSchema);

export default doadores;