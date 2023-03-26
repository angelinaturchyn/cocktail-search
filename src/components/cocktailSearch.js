import React, { useState} from "react";
import styled from 'styled-components'
import { motion } from "framer-motion"



const SearchButton = styled(motion.button)`
  padding: 1rem 1.4rem;
  font-size: 1.2rem;
  border: 1px solid antiquewhite;
  color: antiquewhite;
  background-color: black;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 120px;
`

export const CocktailSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState("");


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchCocktailByName = () => {
        Promise.all([
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`),
            fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"),
        ])
            .then(([cocktailResponse, ingredientResponse]) =>
                Promise.all([cocktailResponse.json(), ingredientResponse.json()])
            )
            .then(([cocktailData, ingredientData]) => {
                if (cocktailData.drinks && cocktailData.drinks.length > 0) {
                    const cocktails = cocktailData.drinks.map((cocktail) => {
                        const ingredients = Object.keys(cocktail)
                            .filter(
                                (key) => key.startsWith("strIngredient") && cocktail[key]
                            )
                            .map((key) => cocktail[key]);
                        return { ...cocktail, ingredients };
                    });
                    setCocktails(cocktails);
                    setError("");
                } else {
                    setError("Whoops, try a different name");
                }
            })
            .catch((error) => console.log(error));
    };


    const handleSearchByName = () => {
        searchCocktailByName();
    };


    return (
        <div className="cocktailSearchDiv">
            <hr size="1" width="100%" color="white" align="center" />
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Type here.."
                    value={searchTerm}
                    onChange={handleInputChange}
                />


                <SearchButton  onClick={handleSearchByName}
                               style={{cursor:'pointer'}}
                               whileHover={{
                                   scale: 1.05,
                                   backgroundColor: '#4B0082' }}
                               whileTap={{
                                   scale: 0.95,
                                   backgroundColor: '#1e0082',
                                   color: '#fff'

                               }}
                >
                    Search cocktail by name or ingredient
                </SearchButton>

            {error && <div className="error">{error}</div>}
            {cocktails && cocktails.length > 0 &&
                cocktails.map((cocktail) => (
                    <div key={cocktail.idDrink} className="cocktailDetails">
                        <h2>{cocktail.strDrink}</h2>
                        <p>{cocktail.strInstructions}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            {cocktail.ingredients.map(
                                (ingredient, index) =>
                                    ingredient && <li key={index}>{ingredient}</li>
                            )}
                        </ul>
                        <img
                            src={cocktail.strDrinkThumb}
                            alt={cocktail.strDrink}
                            className="cocktailImage"
                        />
                    </div>
                ))}
            <hr size="1" width="100%" color="white" align="center" />
        </div>
    );

}
