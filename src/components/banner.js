import React from 'react';
import {CocktailSearch} from "./cocktailSearch";
import bannerImg from "../assets/katherine-sousa-ln2R1wJ8TCM-unsplash.jpg"

export const Banner = () => {
    return (
        <div  id="quiz-container" style={{ position: 'relative' }}>
            <h1 style={{ color: 'whitesmoke',position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -200%)', zIndex: '2', fontSize: '40px' }}>
                Cocktail Hour
            </h1>
            <img src={bannerImg} className="homeImg" alt="Banner Img" style={{ zIndex: '0' }}/>
            <div className="bannerText">
                <p>Let's have some fun,</p>
                <p>and see what cocktails we can find!</p>
            </div>
    </div>
    )
}
