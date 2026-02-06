import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiCalendarCheckLine } from "react-icons/ri";

// Importação dos subcomponentes e do estilo
import CardInput from "./CardInput";
import ItemAgenda from "./ItemAgenda";
import "./Agenda.scss";

function Agenda() {
  // --- Estados do Formulário ---
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [horarioTermino, setHorarioTermino] = useState("");
  const [diaInteiro, setDiaInteiro] = useState(false);
  const [tempoEstimado, setTempoEstimado] = useState("");

  // --- Estados de Controle ---
  const [eventos, setEventos] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);

  // --- Carregar Eventos da API ---
  const carregarEventos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/eventos");
      setEventos(res.data);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  // --- Lógica de Cálculo de Duração ---
  useEffect(() => {
    if (diaInteiro) {
      setTempoEstimado("24h00");
    } else if (horario && horarioTermino) {
      const [hI, mI] = horario.split(":").map(Number);
      const [hF, mF] = horarioTermino.split(":").map(Number);
      let minI = hI * 60 + mI;
      let minF = hF * 60 + mF;
      if (minF < minI) minF += 24 * 60;
      const dif = minF - minI;
      const h = String(Math.floor(dif / 60)).padStart(2, "0");
      const m = String(dif % 60).padStart(2, "0");
      setTempoEstimado(`${h}h${m}`);
    }
  }, [horario, horarioTermino, diaInteiro]);

  // --- Funções de Ação ---
  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
    setData("");
    setHorario("");
    setHorarioTermino("");
    setDiaInteiro(false);
    setIdEdicao(null);
  };

  const salvarEvento = async () => {
    if (!titulo || !data) return alert("Título e Data são obrigatórios!");

    const dados = {
      titulo,
      descricao,
      data_evento: data,
      horario_evento: diaInteiro ? "00:00" : horario,
      horario_termino: diaInteiro ? "23:59" : horarioTermino,
      tempo_estimado: tempoEstimado,
      dia_inteiro: diaInteiro,
    };

    try {
      if (idEdicao) {
        await axios.put(`http://localhost:3001/eventos/${idEdicao}`, dados);
      } else {
        await axios.post("http://localhost:3001/eventos", dados);
      }
      limparCampos();
      carregarEventos();
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  const prepararEdicao = (ev) => {
    setIdEdicao(ev.id);
    setTitulo(ev.titulo);
    setDescricao(ev.descricao || "");
    setData(new Date(ev.data_evento).toISOString().split("T")[0]);
    setHorario(ev.horario_evento);
    setHorarioTermino(ev.horario_termino);
    setDiaInteiro(!!ev.dia_inteiro);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletarEvento = async (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      try {
        await axios.delete(`http://localhost:3001/eventos/${id}`);
        carregarEventos();
      } catch (err) {
        console.error("Erro ao deletar:", err);
      }
    }
  };

  return (
    <section id="agenda" className="agenda-section">
      <div className="container">
        <div className="agenda-grid">
          {/* Lado Esquerdo: Formulário isolado em CardInput */}
          <div className="coluna-input">
            <CardInput
              idEdicao={idEdicao}
              titulo={titulo}
              setTitulo={setTitulo}
              descricao={descricao}
              setDescricao={setDescricao}
              data={data}
              setData={setData}
              horario={horario}
              setHorario={setHorario}
              horarioTermino={horarioTermino}
              setHorarioTermino={setHorarioTermino}
              diaInteiro={diaInteiro}
              setDiaInteiro={setDiaInteiro}
              tempoEstimado={tempoEstimado}
              salvarEvento={salvarEvento}
            />
          </div>

          {/* Lado Direito: Lista de cards isolada em ItemAgenda */}
          <div className="coluna-lista">
            <h3>
              <RiCalendarCheckLine /> Tarefas Planejadas
            </h3>
            <div className="lista-scroll">
              {eventos.length > 0 ? (
                eventos.map((ev) => (
                  <ItemAgenda
                    key={ev.id}
                    ev={ev}
                    prepararEdicao={prepararEdicao}
                    deletarEvento={deletarEvento}
                  />
                ))
              ) : (
                <p>Nenhuma tarefa agendada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Agenda;
