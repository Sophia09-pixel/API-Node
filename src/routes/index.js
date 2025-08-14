const express = require("express");
const router = new express.Router();

let users = [
  { id: 1, nome: "Thiago Xavier", idade: 40 },
  { id: 2, nome: "Maria Aparecida", idade: 36 },
];

//endpoint
router.get("/", (req, res, next) => {
  try {
    //const teste = 1;
    //teste = "teeste";
    res.status(200).send({
      success: true,
      message: "Usuários encontrados",
      data: users,
      total: users.length,
    });
  } catch (error) {
    //Status code 500 - indica erro interno
    res.status(500).json({
      success: false,
      message: "Erro interno",
      error: error.message,
    });
  }
});

//post
router.post("/", (req, res, next) => {
  try {
    const { nome, idade } = req.body;
    if (!nome || !idade) {
      //bad request
      return res.status(400).json({
        success: false,
        message: "Favor enviar os campos: nome e idade",
      });
    }

    const newId = users.length + 1;
    console.log(newId);

    const newUser = {
      id: newId,
      nome,
      idade,
    };
    users.push(newUser);
    console.log(newUser);
    //201: created
    res.status(201).json({
      success: true,
      message: "Criado com sucesso",
      data: newId,
    });
  } catch (error) {
    //res.status(500).
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro na criação do usuário",
      error: error.message,
    });
  }
});
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const { nome, idade } = req.body;
  if (!nome || !idade) {
    //bad request
    return res.status(400).json({
      success: false,
      message: "Favor enviar os campos: nome e idade",
    });
  }

  const userFind = users.findIndex(u => u.id == id)

  if(userFind === -1){
    return res.status(404).json({
        success: false,
        message: "usuário não encontrado"
    });
  }
  users[userFind] =  {
    id,
    nome,
    idade
  }

  res.status(200).json({
    success: true,
    message: "Usuário atualizado com sucesso!"
  })

});
module.exports = router;
