import React, { useState} from "react";


export const CocktailSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState("");
    const [selectedFirstLetter, setSelectedFirstLetter] = useState("");


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
        <div className="cocktailSearchDiv">
            <hr size="1" width="100%" color="white" align="center" />
            <div className="inputAndDropdown">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Type here.."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <div>
                    <select
                        className="cocktailSearchDropdown"
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
            </div>
            <div>
                <button className="cocktailSearch" onClick={handleSearchByName}>
                    Search by Name
                </button>{" "}
                <button className="cocktailSearch" onClick={handleSearchByIngredient}>
                    Search by Ingredient
                </button>{" "}
                <button className="cocktailSearch" onClick={handleSearchByAlcoholic}>
                    Alcoholic
                </button>{" "}
                <button className="cocktailSearch" onClick={handleSearchByNonAlcoholic}>
                    Non Alcoholic
                </button>{" "}
                <button className="cocktailSearch" onClick={handleSearchByGlass}>
                    Cocktail Glass
                </button>{" "}
                <button
                    className="cocktailSearch"
                    onClick={handleSearchCocktailByChampagneGlass}
                >
                    Champagne Glass
                </button>{" "}
            </div>
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
        </div>
    );

}
