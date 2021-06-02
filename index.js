const express = require("express");
const app = express();
//simbolizar que estamos usando json
app.use(express.json());

app.get("/hello", function (req, res) {
  res.send("Hello, World");
});
const mensagens = ["essa é a primeira mensagem", "essa é a segunda mensagem"];

//creat = criar uma mensagem
app.post("/mensagens", function (req, res) {
  const mensagem = req.body.mensagem;
  const id = mensagens.push(mensagem);
  mensagens.push(mensagem);
  // const id = mensagens.length - 1;
  res.end(`mensagem com ID '${id}' criada com sucesso.`);
});

// read all (le td as msng)
app.get("/mensagens", function (req, res) {
  res.send(mensagens.filter(Boolean));
});
// read single (le só uma mensagem)
app.get("/mensagens/:id", function (req, res) {
  const id = req.params.id - 1;

  const mensagem = mensagens[id];
  if (!mensagem) {
    res.status(404).send("mensagem nao encontrada");
    return;
  }

  res.send({ mensagem });
});
//update editar as mensagens
app.put("/mensagens/:id", function (req, res) {
  const id = req.params.id - 1;

  const mensagem = req.body.mensagem;

  mensagens[id] = mensagem;

  res.send("mensagem atualizada com sucesso.");
});
//delete remove as mensagens
app.delete("/mensagens/:id", function (req, res) {
  const id = req.params.id - 1;
  delete mensagens[id];
  res.send("mensagem removida com sucesso");
});
app.listen(3000);
