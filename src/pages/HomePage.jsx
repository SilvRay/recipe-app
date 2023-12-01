import Veggie from "../components/Veggie";
import Random from "../components/Random";
import SearchRecipe from "../components/SearchRecipe";

const HomePage = () => {
  return (
    <div className="homepage">
      <Veggie />
      <SearchRecipe />
      <Random />
    </div>
  );
};

export default HomePage;
