import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #232227;
`;

export default App;
