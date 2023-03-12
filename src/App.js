
import './App.css';
import {Banner} from "./components/banner";
import {CocktailSearch} from "./components/cocktailSearch";
import {WhatCocktailCanIMake} from "./components/whatCocktailCanIMake";

function App() {
  return (
    <div className="App">
    <Banner/>
      <CocktailSearch/>
      <WhatCocktailCanIMake/>
    </div>
  );
}

export default App;
