import React, { useState, useEffect } from "react";

export const WhatCocktailCanIMake = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
            .then((response) => response.json())
            .then((data) => setIngredients(data.drinks));
    }, []);

    useEffect(() => {
        const ingredientsString = selectedIngredients.map(
            (ingredient) => ingredient.strIngredient1
        );
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsString.join(
            ","
        )}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setCocktails(data.drinks));
    }, [selectedIngredients]);

    const handleIngredientClick = (ingredient) => {
        const newSelectedIngredients = [...selectedIngredients, ingredient];
        setSelectedIngredients(newSelectedIngredients);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...selectedIngredients];
        newIngredients.splice(index, 1);
        setSelectedIngredients(newIngredients);
    };

    const getMissingIngredients = (cocktail) => {
        const cocktailIngredients = Object.keys(cocktail)
            .filter((key) => key.startsWith("strIngredient") && cocktail[key])
            .map((key) => cocktail[key]);
        return cocktailIngredients.filter(
            (ingredient) =>
                !selectedIngredients.some(
                    (selected) => selected.strIngredient1 === ingredient
                )
        );
    };

    return (
        <div>
            <h2>Select your ingredients:</h2>
            <div>
                {ingredients.map((ingredient, index) => (
                    <button
                        key={index}
                        onClick={() => handleIngredientClick(ingredient)}
                    >
                        {ingredient.strIngredient1}
                    </button>
                ))}
            </div>
            <h2>Your selected ingredients:</h2>
            <div>
                {selectedIngredients.map((ingredient, index) => (
                    <button key={index} onClick={() => handleRemoveIngredient(index)}>
                        {ingredient.strIngredient1}
                    </button>
                ))}
            </div>
            <h2>Cocktails you can make:</h2>
            <ul>
                {cocktails.map((cocktail) => {
                    const missingIngredients = getMissingIngredients(cocktail);
                    const missingCount = missingIngredients.length;
                    return (
                        <li key={cocktail.idDrink}>
                            {cocktail.strDrink}{" "}
                            {missingCount > 0 && `(${missingCount} missing)`}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
