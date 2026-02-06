const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SuaNovaSenha",
  database: "minha_agenda",
});

db.connect((err) => {
  if (err) return console.error("Erro ao conectar:", err);
  console.log("✅ Conectado ao MySQL!");
});

app.get("/eventos", (req, res) => {
  const sql =
    "SELECT * FROM eventos ORDER BY data_evento ASC, horario_evento ASC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/eventos", (req, res) => {
  const {
    titulo,
    data_evento,
    horario_evento,
    horario_termino,
    descricao,
    tempo_estimado,
    dia_inteiro,
  } = req.body;
  const sql =
    "INSERT INTO eventos (titulo, data_evento, horario_evento, horario_termino, descricao, tempo_estimado, dia_inteiro) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      titulo,
      data_evento,
      horario_evento,
      horario_termino,
      descricao,
      tempo_estimado,
      dia_inteiro,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json("Criado!");
    },
  );
});

app.put("/eventos/:id", (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    data_evento,
    horario_evento,
    horario_termino,
    descricao,
    tempo_estimado,
    dia_inteiro,
  } = req.body;
  const sql =
    "UPDATE eventos SET titulo=?, data_evento=?, horario_evento=?, horario_termino=?, descricao=?, tempo_estimado=?, dia_inteiro=? WHERE id=?";
  db.query(
    sql,
    [
      titulo,
      data_evento,
      horario_evento,
      horario_termino,
      descricao,
      tempo_estimado,
      dia_inteiro,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Atualizado!");
    },
  );
});

app.delete("/eventos/:id", (req, res) => {
  db.query("DELETE FROM eventos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Deletado!");
  });
});

app.listen(3001, () => console.log("🚀 Server port 3001"));
