import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { motion } from "framer-motion"


const IngredientsDiv = styled.div`
  font-family: 'Pathway Gothic One', sans-serif;
  text-align: center;
  font-size: 3.5rem;
`
const DropdownHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Pathway Gothic One', sans-serif;
  font-size: 3.5rem;
`

const IngredientsSelect = styled.select`
  font-family: 'Pathway Gothic One', sans-serif;
  padding: 1rem 1rem;
  font-size: 1.6rem;
  border: 1px solid antiquewhite;
  color: antiquewhite;
  background-color: black;
  cursor: pointer;
  border-radius: 8px;
  width: 320px;
  text-align: center;
  margin-bottom: 70px;
`

const IngredientsOption = styled.option`
  font-family: 'Pathway Gothic One', sans-serif;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-align: center;

`

const ReadyToMix = styled.div`
  font-family: 'Pathway Gothic One', sans-serif;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 220px;
`

const LeftContainer = styled.div`
  width: 50%;
  text-align: center;
  font-size: 6rem;
  
  @media only screen and (max-width: 980px) {
   {
    width: 100%;
    }
  }
 
`;


const CocktailImage = styled.img` 
  width: 50%;
  height: auto;
  padding: 20px;
  margin-bottom: 90px;
  
  @media only screen and (max-width: 980px) {
   {
    width: 100%;
   }
  }
`;


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
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((text) => {
                if (text) {
                    const data = JSON.parse(text);
                    setCocktails(data.drinks);
                } else {
                    console.log('Empty response from server');
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [selectedIngredients]);

    const handleIngredientChange = (event) => {
        const ingredient = ingredients.find(
            (ingredient) => ingredient.strIngredient1 === event.target.value
        );
        const newSelectedIngredients = [...selectedIngredients, ingredient];
        setSelectedIngredients(newSelectedIngredients);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...selectedIngredients];
        newIngredients.splice(index, 1);
        setSelectedIngredients(newIngredients);
    };

    return (
        <div>
            <DropdownHeader>
                <p>Or select from ingredients that you already have</p>
            </DropdownHeader>
            <IngredientsDiv >
                <IngredientsSelect onChange={handleIngredientChange}>
                    <IngredientsOption value="">Select an ingredient</IngredientsOption>
                    {ingredients.map((ingredient, index) => (
                        <IngredientsOption key={index} value={ingredient.strIngredient1}>
                            {ingredient.strIngredient1}
                        </IngredientsOption>
                    ))}
                </IngredientsSelect>
            </IngredientsDiv>
            <ReadyToMix>
                <h1>Your selected ingredients:</h1>
                <div>
                    {selectedIngredients.map((ingredient, index) => (
                        <div key={index} onClick={() => handleRemoveIngredient(index)}>
                           <h1 style={{color:'white',cursor:'pointer'}}>{ingredient.strIngredient1}</h1>
                        </div>
                    ))}
                </div>
                <h1 style={{marginTop:"20px"}}>Cocktails you can make:</h1>
                <ul>
                    {cocktails.map((cocktail) => (
                        <motion.div key={cocktail.idDrink} whileHover={{ scale: 1.05 }}>
                            <h1 style={{marginTop:"50px"}}>{cocktail.strDrink}</h1>
                            <CocktailImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink}  />
                        </motion.div>
                    ))}
                </ul>

                <hr size="1" width="70%" color="white" align="center" />
            </ReadyToMix>

        </div>
    );
}
