import mongoose from "mongoose";

mongoose.connect(process.env.STRING_CONEXAO_DB_MONGO);

let db = mongoose.connection;

export default db;