import axios from "axios";
import { useEffect, useState } from "react";
import starIcon from "../assets/star_icon.png";
import styled from "styled-components";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

const Random = () => {
  const [randRecipes, setrandRecipes] = useState([]);

  const getRandRecipes = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`
      )
      .then((response) => {
        console.log("Random recipes", response.data);
        setrandRecipes(response.data.recipes);
      })
      .catch((err) => console.log("ERROR when retrieving random recipes", err));
  };

  useEffect(() => {
    getRandRecipes();
  }, []);

  const getScore = (spoonScore) => {
    console.log(
      (Math.floor(spoonScore) - (Math.floor(spoonScore) % 10)) / 10 / 2
    );
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
        <Card key={recipe.id}>
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
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;

  img {
    border-radius: 2rem;
    object-fit: contain;
    width: 10rem;
  }
`;

const ImgRecipe = styled.div`
  position: absolute;
  top: -3rem;
  left: 0.6rem;
`;

const InfoRecipe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
