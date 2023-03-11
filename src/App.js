
import './App.css';
import {GameBanner} from "./components/gameBanner";
import {CocktailSearch} from "./components/cocktailSearch";

function App() {
  return (
    <div className="App">
    <GameBanner/>
      <CocktailSearch/>
    </div>
  );
}

export default App;
