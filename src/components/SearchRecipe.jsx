import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchRecipe = () => {
  const [ingredient, setIngredient] = useState("");

  const navigate = useNavigate();

  const handleIngredientInput = (e) => setIngredient(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/searched/${ingredient}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <FaSearch></FaSearch>
        <input
          type="text"
          name="search"
          value={ingredient}
          onChange={handleIngredientInput}
        />
      </div>
    </Form>
  );
};

const Form = styled.form`
  margin-top: 4rem;
  margin-left: 1rem;
  margin-right: 1rem;
  div {
    position: relative;
    width: 100%;
  }
  input {
    border: none;
    font-size: 1rem;
    color: white;
    padding: 1rem 3rem;
    width: 100%;
    background-color: #2f302f;
    border-radius: 2rem;
    outline: none;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translate(100%, -50%);
  }
`;
export default SearchRecipe;
