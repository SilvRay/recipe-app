import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:recipeId" element={<RecipeDetailsPage />} />
      <Route path="/searched/:search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
