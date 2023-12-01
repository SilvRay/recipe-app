import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import { timer } from "../assets";

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
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=vegan`
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

  const showNextImage = () => {
    setSlide((index) => {
      if (slide === 2) {
        setSlide(0);
        return index === 0;
      } else {
        setSlide(index + 1);
        return index + 1;
      }
    });
  };

  const showPrevImage = () => {
    setSlide((index) => {
      if (slide === 0) {
        setSlide(2);
        return index === 2;
      } else {
        setSlide(index - 1);
        return index - 1;
      }
    });
  };

  return (
    <Wrapper>
      <button
        onClick={showPrevImage}
        className="img_slider_btn"
        style={{
          left: 0,
        }}
      >
        <ArrowBigLeft />
      </button>
      {veggie.map((recipe, index) => (
        <Link
          key={recipe.id}
          to={`/${recipe.id}`}
          className={slide === index ? "slide" : "slide slide-hidden"}
        >
          <div className="veggie_recipe_container">
            <img src={recipe.image} alt={recipe.title} />
            <div className="veggie_recipe">
              <h2>{recipe.title}</h2>
              <p className="timer_container">
                <img src={timer} alt="timer" />
                {recipe.readyInMinutes}
              </p>
            </div>
          </div>
        </Link>
      ))}
      <button
        onClick={showNextImage}
        className="img_slider_btn"
        style={{ right: 0 }}
      >
        <ArrowBigRight />
      </button>
      <DotBtn>
        {veggie.map((_, index) => (
          <button
            key={index}
            className="slider_dot_btn"
            onClick={() => setSlide(index)}
          >
            {index === slide ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </DotBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 358px;
  height: 11rem;
  padding: 0 1rem;
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .img_slider_btn {
    all: unset;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 1rem;
    cursor: pointer;
    z-index: 10;
  }

  .img_slider_btn > * {
    stroke: white;
    fill: black;
    width: 2rem;
    height: 2rem;
  }

  .slide {
    position: absolute;
    width: 358px;
    height: 100%;
    padding: 0 1rem;

    .veggie_recipe_container {
      height: 100%;

      img {
        object-fit: contain;
        height: 100%;
        width: 100%;
        border-radius: 2rem;
      }

      .veggie_recipe {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 358px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 2rem;

        h2 {
          color: white;
          text-shadow: 2px 2px 2px #000000;
          font-size: 1rem;
          padding-left: 1rem;
          text-align: center;
        }

        p {
          color: white;
          margin-top: 0.3rem;
          text-shadow: 2px 2px 2px #000000;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.2rem;

          img {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }

  .slide-hidden {
    display: none;
  }
`;

const DotBtn = styled.div`
  position: absolute;
  bottom: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.25rem;

  .slider_dot_btn {
    all: unset;
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    cursor: pointer;
    transition: scale 0.1s ease-in-out;
  }

  .slider_dot_btn:hover {
    scale: 1.2;
  }

  .slider_dot_btn > * {
    fill: black;
    width: 100%;
    height: 100%;
  }
`;

export default Veggie;
