import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import SearchRecipe from "../components/SearchRecipe";
import Veggie from "../components/Veggie";
import { FaHeart } from "react-icons/fa";
import { backArrow } from "../assets";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

const SearchPage = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const params = useParams();

  const getRecipeByIngred = (ingredient) => {
    if (ingredient) {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}&number=9`
        )
        .then((response) => {
          console.log(`recipes with ${ingredient} in it`, response.data);
          setSearchedRecipes(response.data);
        })
        .catch((err) =>
          console.log(
            `ERROR when retrieving recipes with ${ingredient} in it`,
            err
          )
        );
    }
  };

  useEffect(() => {
    getRecipeByIngred(params.search);
  }, [params.search]);

  return (
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
      <Veggie />
      <SearchRecipe />
      <Wrapper>
        {searchedRecipes.map((recipe) => (
          <Link to={`/${recipe.id}`} key={recipe.id}>
            <Card>
              <ImgRecipe>
                <img src={recipe.image} alt={recipe.title} />
              </ImgRecipe>
              <InfoRecipe>
                <h2>{recipe.title}</h2>
                <div className="likes">
                  {recipe.likes} <FaHeart />
                </div>
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
    </>
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
  cursor: pointer;
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

  .likes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    svg {
      color: #e1bf3d;
    }
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

export default SearchPage;
