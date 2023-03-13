import React, { useState } from "react";

export const CocktailSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState("");
    const [selectedFirstLetter, setSelectedFirstLetter] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchCocktailByName = () => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    setCocktails(data.drinks);
                    setError("");
                } else {
                    setError("Whoops, try a different name");
                }
            })
            .catch((error) => console.log(error));
    };

    const searchCocktailByIngredient = (ingredient) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    setCocktails(data.drinks);
                    setError("");
                } else {
                    setError("Whoops, try a different name");
                }
            })
            .catch((error) => console.log(error));
    };

    const searchCocktailByCategory = (category) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${category}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    setCocktails(data.drinks);
                    setError("");
                } else {
                    setError("Whoops, try a different name");
                }
            })
            .catch((error) => console.log(error));
    };
    const searchCocktailByFirstLetter = (letter) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    setCocktails(data.drinks);
                    setError("");
                } else {
                    setError("Whoops, try a different name");
                }
            })
            .catch((error) => console.log(error));
    };

    const searchCocktailByGlass = (glass) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`)
            .then((response) => response.json())
            .then((data) => setCocktails(data.drinks))
            .catch((error) => console.log(error));
    };

    const searchCocktailByChampagneGlass = (glass) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`)
            .then((response) => response.json())
            .then((data) => setCocktails(data.drinks))
            .catch((error) => console.log(error));
    };

    const handleSearchByName = () => {
        searchCocktailByName();
    };

    const handleSearchByIngredient = () => {
        searchCocktailByIngredient(searchTerm);
    };

    const handleSearchByAlcoholic = () => {
        searchCocktailByCategory("Alcoholic");
    };

    const handleSearchByNonAlcoholic = () => {
        searchCocktailByCategory("Non_Alcoholic");
    };

    const handleSearchByFirstLetter = (letter) => {
        searchCocktailByFirstLetter(letter);
    };

    const handleSearchByGlass = () => {
        searchCocktailByGlass("Cocktail_glass");
    };

    const handleSearchCocktailByChampagneGlass = () => {
        searchCocktailByChampagneGlass("Champagne_flute");
    };


    return (
        <div >
            <div className="cocktailSearch">
                <input type="text" value={searchTerm} onChange={handleInputChange}/>
                <button className="cocktailSearch" onClick={handleSearchByName}>Search by Name</button>
                <button className="cocktailSearch" onClick={handleSearchByIngredient}>Search by Ingredient</button>
                <button className="cocktailSearch" onClick={handleSearchByAlcoholic}>Alcoholic</button>
                <button className="cocktailSearch" onClick={handleSearchByNonAlcoholic}>Non-Alcoholic</button>
                <div >
                    <select className="cocktailSearch"
                        value={selectedFirstLetter}
                        onChange={(e) => handleSearchByFirstLetter(e.target.value)}
                    >
                        <option value="">Search cocktail by first letter</option>
                        {[...Array(26)].map((_, index) => (
                            <option key={index} value={String.fromCharCode(65 + index)}>
                                {String.fromCharCode(65 + index)}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="cocktailSearch" onClick={handleSearchByGlass}>Cocktail Glass</button>
                <button className="cocktailSearch" onClick={handleSearchCocktailByChampagneGlass}>Champagne flute</button>
            </div>
            {error ? (
                <div>Whoops, try a different name</div>
            ) : (
                <div>
                    {cocktails.map((cocktail) => (
                        <div key={cocktail.idDrink}>
                            <h3>{cocktail.strDrink}</h3>
                            <img src={cocktail.strDrinkThumb} alt="cocktail"/>
                            <p>Instructions: {cocktail.strInstructions}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
