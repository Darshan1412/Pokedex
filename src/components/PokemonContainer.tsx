import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PokemonContainerProps {
  image: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  imageLoaded: boolean;
}

function PokemonContainer({ image, onPrevClick, onNextClick }: PokemonContainerProps) {
  return (
    <div className="circle-container">
      <FaAngleLeft className="angleLeft" onClick={onPrevClick} />
      <div className="outer-circle">
        <div className="inner-circle">
          <img src={image} alt="pokemon" />
        </div>
        <div className="lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>
      </div>
      <FaAngleRight className="angleRight" onClick={onNextClick} />
    </div>
  );
}

export default PokemonContainer;
