import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "app/hooks";
import PokemonContainer from "components/PokemonContainer";
import Info from "components/Info";
import { extractColors } from "extract-colors";
import { FaAngleRight } from "react-icons/fa";

function Description() {
  const [defaultImage, setDefaultImage] = useState("");
  const [shinyImage, setShinyImage] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false); // Track if image is loaded for transition

  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  useEffect(() => {
    const fetchData = async () => {
      if (pokemonData) {
        const defaultImageUrl = pokemonData?.image;
        const shinyImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonData.id}.png`;

        setDefaultImage(defaultImageUrl);
        setShinyImage(shinyImageUrl);
        setCurrentImage(defaultImageUrl);
      }
    };

    fetchData();
  }, [pokemonData]);

  const handleNextImage = () => {
    setImageLoaded(false); // Reset image loaded state for transition
    setCurrentImage(shinyImage);
  };

  const handlePrevImage = () => {
    setImageLoaded(false); // Reset image loaded state for transition
    setCurrentImage(defaultImage);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentImage) {
        const response = await axios.get(currentImage, {
          responseType: "blob",
        });
        const imageBlob = response.data;
        const imageObject = URL.createObjectURL(imageBlob);

        const imageElement = document.createElement("img");
        imageElement.src = imageObject;

        const options = {
          pixels: 10000,
          distance: 1,
          splitPower: 10,
          colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
            alpha > 250,
          saturationDistance: 0.2,
          lightnessDistance: 0.2,
          hueDistance: 0.083333333,
        };

        const getColor = async () => {
          const color = await extractColors(imageElement.src, options);
          const root = document.documentElement;
          root.style.setProperty(
            "--accent-color",
            color[0].hex.split('"')[0]
          );
        };

        imageElement.onload = () => {
          getColor();
          setImageLoaded(true); // Set image loaded state to trigger transition
        };
        return () => URL.revokeObjectURL(imageObject);
      }
    };

    fetchData();
  }, [currentImage]);

  return (
    <div className="image-transition-container">
      {pokemonData && (
        <>
          <Info data={pokemonData} />
          <PokemonContainer
            image={currentImage}
            onPrevClick={handlePrevImage}
            onNextClick={handleNextImage}
            imageLoaded={imageLoaded} // Pass image loaded state to PokemonContainer for transition
          />
        </>
      )}
    </div>
  );
}

export default Description;
