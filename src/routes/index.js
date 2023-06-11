import express from "express";
import doacoes from "./doacaoRoutes.js";
import doadores from "./doadoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de node"});
  });

  app.use(
    express.json(),
    doacoes,
    doadores
  );
};

export default routes;