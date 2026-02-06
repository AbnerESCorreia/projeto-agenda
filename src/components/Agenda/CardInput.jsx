import React from "react";
import {
  RiEditLine,
  RiAddCircleLine,
  RiToggleLine,
  RiToggleFill,
  RiHistoryLine,
} from "react-icons/ri";

const CardInput = ({
  idEdicao,
  titulo,
  setTitulo,
  descricao,
  setDescricao,
  data,
  setData,
  horario,
  setHorario,
  horarioTermino,
  setHorarioTermino,
  diaInteiro,
  setDiaInteiro,
  tempoEstimado,
  salvarEvento,
}) => {
  return (
    <div className="card-input">
      <h3>
        {idEdicao ? <RiEditLine /> : <RiAddCircleLine />}
        {idEdicao ? " Editar Evento" : " Novo Evento"}
      </h3>

      <input
        type="text"
        placeholder="O que vamos fazer?"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        rows="2"
      />

      <div
        className="dia-inteiro-row"
        onClick={() => setDiaInteiro(!diaInteiro)}
      >
        {diaInteiro ? <RiToggleFill className="active" /> : <RiToggleLine />}
        <span>Evento de Dia Inteiro</span>
      </div>

      <label className="label-section">Data</label>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      {!diaInteiro && (
        <div className="input-group-time">
          <div className="time-box">
            <span>Início</span>
            <input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />
          </div>
          <span className="sep">—</span>
          <div className="time-box">
            <span>Término</span>
            <input
              type="time"
              value={horarioTermino}
              onChange={(e) => setHorarioTermino(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="duration-display">
        <RiHistoryLine /> Duração: <strong>{tempoEstimado}</strong>
      </div>

      <button
        className={idEdicao ? "btn-edit" : "btn-confirm"}
        onClick={salvarEvento}
      >
        {idEdicao ? "Salvar Alterações" : "Confirmar Evento"}
      </button>
    </div>
  );
};

export default CardInput;
