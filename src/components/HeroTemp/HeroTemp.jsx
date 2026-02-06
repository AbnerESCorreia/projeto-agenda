import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import "./Hero.scss";

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Organograma do Meu Dia</h1>
      <a href="#agenda" className="btn-start">
        Acessar Agenda <RiArrowRightLine />
      </a>
    </div>
  </section>
);

export default Hero;
