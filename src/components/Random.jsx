import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

const Random = () => {
  const [randRecipes, setrandRecipes] = useState([]);

  const getRandRecipes = () => {
    const check = localStorage.getItem("randomRecipe");

    if (check) {
      setrandRecipes(JSON.parse(check));
    } else {
      axios
        .get(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`
        )
        .then((response) => {
          console.log("Random recipes", response.data);
          localStorage.setItem(
            "randomRecipe",
            JSON.stringify(response.data.recipes)
          );
          setrandRecipes(response.data.recipes);
        })
        .catch((err) =>
          console.log("ERROR when retrieving random recipes", err)
        );
    }
  };

  useEffect(() => {
    getRandRecipes();
  }, []);

  const getScore = (spoonScore) => {
    const filledStars = Math.floor(
      (Math.floor(spoonScore) - (Math.floor(spoonScore) % 10)) / 10 / 2
    );

    const starIcons = [];
    for (let i = 0; i < filledStars; i++) {
      starIcons.push("⭐");
    }
    // for (let i = 0; i < emptyStars; i++) {
    //   starIcons.push("☆⭐");
    // }

    return starIcons;
  };

  if (randRecipes.length === 0) {
    return "Loading...";
  }

  return (
    <Wrapper>
      {randRecipes.map((recipe) => (
        <Link to={`/${recipe.id}`} key={recipe.id}>
          <Card>
            <ImgRecipe>
              <img src={recipe.image} alt={recipe.title} />
            </ImgRecipe>
            <InfoRecipe>
              <h2>{recipe.title}</h2>
              <div className="score">{getScore(recipe.spoonacularScore)}</div>
              <p>
                {recipe.readyInMinutes}
                <br />
                min
              </p>
            </InfoRecipe>
          </Card>
        </Link>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Card = styled.div`
  min-height: 16rem;
  border-radius: 2rem;
  background-color: #2f302f;
  width: 11rem;
  margin-top: 4rem;
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
`;

const ImgRecipe = styled.div`
  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2rem;
  overflow: hidden;

  img {
    border-radius: 2rem;
    object-fit: contain;
    width: 10rem;
    transition: transform 0.4s;
  }

  img:hover {
    transform: scale(1.1);
  }
`;

const InfoRecipe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  h2 {
    color: white;
    font-size: 1rem;
    text-align: center;
  }

  .score {
    text-align: center;
  }

  p {
    color: #4c4c4c;
    font-weight: 600;
    text-align: center;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    border-right: 1px solid #4c4c4c;
    border-left: 1px solid #4c4c4c;
    padding: 0 1rem;
  }
`;

export default Random;
