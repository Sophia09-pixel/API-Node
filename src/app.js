const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");

//configurar a conexão
mongoose
  .connect("mongodb://seu_usuario:sua_senha@localhost:27017/?authSource=admin")
  .then(() => {
    console.log("Conectado");
  })
  .catch((error) => {
    console.log(`Erro ao tentar conectar no mongo ${error}`);
  });

//Habiltar o CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//Criar rotas - Obs: vamos criar a rota
const index = require("./routes/index");

app.use("/", index);
module.exports = app;
