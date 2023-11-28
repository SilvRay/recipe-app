import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="recipe_details_page">
      {recipe === null ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="img_container">
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <div className="details_section">
            <div className="header">
              <h1>{recipe.title}</h1>

              <p>
                <span></span>
                {recipe.readyInMinutes}
              </p>
            </div>

            <p>{noHtml(recipe.summary)}</p>

            <div className="tab">
              <button
                onClick={toggleClick}
                className={toggleBtn === "recipe" ? "recipe" : ""}
              >
                Recipe
              </button>
              <button
                onClick={toggleClick}
                className={toggleBtn === "ingredients" ? "ingredients" : ""}
              >
                Ingredients
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
