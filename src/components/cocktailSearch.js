import React, { useState} from "react";
import styled from 'styled-components'
import { motion } from "framer-motion"



const SearchButton = styled(motion.button)`
  padding: 1rem 1.4rem;
  font-size: 2rem;
  border: 1px solid antiquewhite;
  color: antiquewhite;
  background-color: black;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 120px;
  width: 300px;
  font-family: 'Pathway Gothic One', sans-serif;
  margin-left: 10px;
`

const CocktailDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 90px;
  font-family: 'Pathway Gothic One', sans-serif;
  text-align: left;
  
  h1 {
    font-size: 7rem;
      @media only screen and (max-width: 768px) {
     {
      font-size: 5rem;
     }
    }
  }
  h2 {
    font-size: 2rem;
      @media only screen and (max-width: 768px) {
    {
      font-size: 1.7rem;
     }
    }
    
  }
  h3 {
    font-size: 1.8rem;

     @media only screen and (max-width: 768px) {
     {
      font-size: 1.3rem;
     }
    }
  }
`;

const LeftContainer = styled.div`
  width: 50%;

  @media only screen and (max-width: 980px) {
   {
    width: 100%;
    }
  }
 
`;

const CocktailImage = styled.img` 
  width: 50%;
  height: auto;
  margin-left: auto;
  margin-bottom: 90px;
  
  @media only screen and (max-width: 980px) {
   {
    width: 100%;
   }
  }
`;

const BannerText = styled.div`
  font-size: 3.5rem;
  font-family: 'Pathway Gothic One', sans-serif;
  margin-top: 100px;

  @media only screen and (max-width: 768px) {
    {
    font-size: 2.5rem;
    }
  }
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
                    setError("Whoops, try a different name, or ingredient");
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

            <BannerText>
               You can search for a cocktail by it's name or ingredient
            </BannerText>

                <input
                    type="text"

                    className="searchInput"
                    placeholder="Type here.."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                     <SearchButton
                               onClick={handleSearchByName}
                               style={{cursor:'pointer'}}
                               whileHover={{
                                   scale: 1.05,
                                   backgroundColor: '#f5f7e1',
                                   color: '#000'
                               }}
                               whileTap={{
                                   scale: 0.95,
                                   backgroundColor: '#b3b59c',
                                   color: '#000'

                               }}
                >
                    Search cocktail
                </SearchButton>

            {error && <div className="error">{error}</div>}

            {cocktails && cocktails.length > 0 &&
                cocktails.map((cocktail) => (
                    <CocktailDetails key={cocktail.idDrink} className="cocktailDetails">
                        <LeftContainer>
                        <h1> {cocktail.strDrink}</h1>
                        <h2>Instructions:</h2>
                        <h3>{cocktail.strInstructions}</h3>
                        <h2>Ingredients:</h2>
                        <h3>
                            {cocktail.ingredients.map(
                                (ingredient, index) =>
                                    ingredient && <li key={index}>{ingredient}</li>
                            )}
                        </h3>
                            </LeftContainer>

                        <CocktailImage
                            src={cocktail.strDrinkThumb}
                            alt={cocktail.strDrink}
                            className="cocktailImage"
                        />
                        <hr size="1" width="70%" color="white" align="center" />
                    </CocktailDetails>

                ))}
            <hr size="1" width="100%" color="white" align="center" />

        </div>
    );

}


