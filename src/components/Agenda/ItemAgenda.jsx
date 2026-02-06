import React from "react";
import {
  RiEditLine,
  RiDeleteBinLine,
  RiTimeLine,
  RiCalendarEventLine,
  RiHistoryLine,
  RiGoogleFill,
} from "react-icons/ri";

const ItemAgenda = ({ ev, prepararEdicao, deletarEvento }) => {
  const abrirGoogleAgenda = () => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const dataFormatada = ev.data_evento.split("T")[0].replace(/-/g, "");
    const hI = ev.horario_evento.replace(":", "");
    const hF = ev.horario_termino?.replace(":", "") || "2359";

    const link =
      `${baseUrl}&text=${encodeURIComponent(ev.titulo)}` +
      `&details=${encodeURIComponent(ev.descricao || "")}` +
      `&dates=${dataFormatada}T${hI}00/${dataFormatada}T${hF}00`;
    window.open(link, "_blank");
  };

  return (
    <div className="item-agenda">
      <div className="info">
        <strong>{ev.titulo}</strong>
        {ev.descricao && <p className="desc">{ev.descricao}</p>}
        <div className="meta">
          <span className="tag-date">
            <RiCalendarEventLine />{" "}
            {new Date(ev.data_evento).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
          </span>
          <span className="tag-time">
            <RiTimeLine />{" "}
            {ev.dia_inteiro
              ? "Dia Todo"
              : `${ev.horario_evento.slice(0, 5)} - ${ev.horario_termino?.slice(0, 5)}`}
          </span>
          <span className="tag-dur">
            <RiHistoryLine /> {ev.tempo_estimado}
          </span>
        </div>
      </div>

      <div className="acoes">
        <button
          className="google"
          onClick={abrirGoogleAgenda}
          title="Google Agenda"
        >
          <RiGoogleFill />
        </button>
        <button
          className="edit"
          onClick={() => prepararEdicao(ev)}
          title="Editar"
        >
          <RiEditLine />
        </button>
        <button
          className="del"
          onClick={() => deletarEvento(ev.id)}
          title="Excluir"
        >
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
};

export default ItemAgenda;
