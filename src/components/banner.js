import React from 'react';
import {CocktailSearch} from "./cocktailSearch";
import bannerImg from "../assets/emily-andreeva-hXg4gGjIfhw-unsplash.jpg"
import styled from 'styled-components';

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  //border-bottom: 1px solid black;
  background-color: black;
  margin-bottom: 70px;
`;

const LeftContainer = styled.div`
  width: 60%;
`;

const RightContainer = styled.div`
  width: 30%;
  color: wheat;
  padding: 20px;
  font-size: 1.5rem;

  @media only screen and (max-width: 768px) {
       {
      font-size: 15px;
    }
  }
`;

const BottomContainer = styled.div`
  background-color: wheat;
  width: 100%;
  height: 70px;
`;


export const Banner = () => {
    return (

        <div className="bannerDiv">
            <TopContainer>
                <LeftContainer>
                    <img src={bannerImg} className="homeImg" alt="Banner Img" style={{ zIndex: '0' }}/>
                </LeftContainer>
                <RightContainer>
                    <h1>Cocktail Hour</h1>
                    <p>Let's have some fun,
                     and see what cocktails we can find!</p>
                </RightContainer>
            </TopContainer>
            {/*<BottomContainer>*/}
            {/*    <p>Bottom content goes here</p>*/}
            {/*</BottomContainer>*/}
        </div>
    )
}

//<div>
//             {/*<h1 style={{ color: 'whitesmoke',position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -200%)', zIndex: '2', fontSize: '40px' }}>*/}
//             {/*    Cocktail Hour*/}
//             {/*</h1>*/}
//             {/*<img src={bannerImg} className="homeImg" alt="Banner Img" style={{ zIndex: '0' }}/>*/}
//             {/*<div className="bannerText">*/}
//             {/*    <p>Let's have some fun,</p>*/}
//             {/*    <p>and see what cocktails we can find!</p>*/}
//             {/*</div>*/}
//
//     </div>
