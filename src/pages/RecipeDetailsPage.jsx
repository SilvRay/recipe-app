import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { timer, backArrow } from "../assets";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

const RecipeDetailsPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [toggleBtn, setToggleBtn] = useState("recipe");

  const { recipeId } = useParams();

  const getRecipe = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
      )
      .then((response) => {
        console.log("recipe details ===", response.data);
        setRecipe(response.data);
      })
      .catch((err) => console.log("ERROR when retrieving the recipe", err));
  };

  useEffect(() => {
    getRecipe();
  }, []);

  function noHtml(txt) {
    let a = txt.indexOf("<");
    let b = txt.indexOf(">");
    let len = txt.length;
    let c = txt.substring(0, a);
    if (b == -1) {
      b = a;
    }
    let d = txt.substring(b + 1, len);
    txt = c + d;
    let cont = txt.indexOf("<");
    if (a != b) {
      txt = noHtml(txt);
    }
    return txt;
  }

  const toggleClick = () => {
    if (toggleBtn === "recipe") {
      setToggleBtn("ingredients");
    } else {
      setToggleBtn("recipe");
    }
  };

  return (
    <div className="recipe_details_page" style={{ position: "relative" }}>
      {recipe === null ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Link to="/">
            <img
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                width: "2rem",
                height: "2rem",
              }}
              src={backArrow}
              alt="back arrow icon"
            />
          </Link>
          <ImgContainer>
            <img src={recipe.image} alt={recipe.title} />
          </ImgContainer>

          <DetailsSection>
            <div className="header">
              <h1>{recipe.title}</h1>

              <p>
                <img src={timer} alt="timer icon" />
                {recipe.readyInMinutes} min
              </p>
            </div>

            <p className="summary">{noHtml(recipe.summary)}</p>

            <div className="tab">
              <button
                onClick={toggleClick}
                className={toggleBtn === "recipe" ? "recipeBtn" : ""}
              >
                Recipe
              </button>
              <button
                onClick={toggleClick}
                className={toggleBtn === "ingredients" ? "ingredientsBtn" : ""}
              >
                Ingredients
              </button>
            </div>

            {toggleBtn === "recipe" && (
              <div className="recipe_steps">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <ul key={step.number}>
                    <li>{step.step}</li>
                  </ul>
                ))}
              </div>
            )}

            {toggleBtn === "ingredients" && (
              <div className="ingredients_container">
                {recipe.extendedIngredients.map((ingred, index) => (
                  <div key={index} className="ingredient">
                    <div className="ingred_img">
                      <img src={ingred.image} alt={ingred.name} />
                    </div>
                    <p>{ingred.name}</p>
                  </div>
                ))}
              </div>
            )}
          </DetailsSection>
        </>
      )}
    </div>
  );
};

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
  img {
    width: 20rem;
    height: 15rem;
    border-radius: 2rem;
  }
`;

const DetailsSection = styled.div`
  background-color: #2f302f;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 2rem 2rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h1 {
      font-size: 1.5rem;
      width: 10rem;
    }
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
  .summary {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
  }
  .tab {
    background-color: #242424;
    display: flex;
    justify-content: center;
    padding: 0.3rem;
    border-radius: 10rem;
    margin-bottom: 1rem;
    button {
      all: unset;
      height: 2.5rem;
      width: 50%;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
    }
    .recipeBtn,
    .ingredientsBtn {
      background-color: #2f302f;
      border-radius: 10rem;
      color: #ffeb3b;
      transition: all 0.2s ease-in-out;
    }
  }
  .recipe_steps {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    ul {
      background: #242424;
      background: -moz-radial-gradient(
        center,
        #242424 0%,
        #2f302f 50%,
        #ffeb3b 100%
      );
      background: -webkit-radial-gradient(
        center,
        #242424 0%,
        #2f302f 50%,
        #ffeb3b 100%
      );
      background: radial-gradient(
        ellipse at center,
        #242424 0%,
        #2f302f 50%,
        #ffeb3b 100%
      );
      padding: 0.5rem;
    }
  }
  .ingredients_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    .ingredient {
      width: 5rem;
      height: 7rem;
      img {
        object-fit: contain;
      }
      p {
        text-align: center;
      }
    }
  }
`;

export default RecipeDetailsPage;
