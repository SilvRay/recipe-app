import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);
  const [slide, setSlide] = useState(0);

  const getRandRecipes = () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      axios
        .get(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=vegetarian`
        )
        .then((response) => {
          console.log("Veggie recipe", response.data.recipes);
          localStorage.setItem("veggie", JSON.stringify(response.data.recipes));

          setVeggie(response.data.recipes);
        })
        .catch((err) =>
          console.log("ERROR when retrieving random recipes", err)
        );
    }
  };

  useEffect(() => {
    getRandRecipes();
  }, []);

  return (
    <Wrapper>
      {veggie.map((recipe, index) => (
        <Link
          key={recipe.id}
          to={`/${recipe.id}`}
          className={slide === index ? "slide" : "slide slide-hidden"}
        >
          <button
            onClick={showNextImage}
            className="img_slider_btn"
            style={{
              left: 0,
            }}
          >
            <ArrowBigLeft />
          </button>
          <div className="veggie_recipe_container">
            <img src={recipe.image} alt={recipe.title} />
            <div className="veggie_recipe">
              <h2>{recipe.title}</h2>
              <p>
                <span>⌛</span>
                {recipe.readyInMinutes}
              </p>
            </div>
          </div>
          <button
            onClick={showPrevImage}
            className="img_slider_btn"
            style={{ right: 0 }}
          >
            <ArrowBigRight />
          </button>
        </Link>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 11rem;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 1rem;

    .img_slider_btn {
      all: unset;
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      padding: 1rem;
      cursor: pointer;
      z-index: 10;
      transition: background-color 0.1s ease-in-out;
    }

    .img_slider_btn > * {
      stroke: white;
      fill: black;
      width: 2rem;
      height: 2rem;
    }

    .veggie_recipe_container {
      height: 100%;

      img {
        height: 100%;
        width: 100%;
        border-radius: 2rem;
      }

      .veggie_recipe {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 0 1rem;

        h2 {
          color: white;
          text-shadow: 2px 2px 2px #000000;
          font-size: 1rem;
          padding-left: 1rem;
          text-align: center;
        }

        p {
          color: white;
          text-shadow: 2px 2px 2px #000000;
          padding-left: 2rem;
          text-align: center;
        }
      }
    }
  }

  .slide-hidden {
    display: none;
  }
`;

export default Veggie;
