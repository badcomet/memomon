import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import pokeballBg from '../../img/pokeball-back.svg';

const PokemonCard = styled.div`
  pointer-events: all;

  .content {
    width: 100%;
    height: 100%;
    // box-shadow: 0 0 15px rgba(0,0,0,0.1);
    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .front, .back {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    line-height: 200px;
    color: #000;
    text-align: center;
    font-size: 60px;
    border-radius: 500px;
    backface-visibility: hidden;
    font-size: 32px;
    transition: .5s all linear;
  }

  .front {
    background-image: url(${pokeballBg});
    background-size: cover;
  }

  .back {
    background: #fff;
    color: #000;
    transform: rotateY( 180deg );
  }

  &.visible .content {
    transform: rotateY( 180deg ) ;
    transition: transform 0.5s;
  }
  &.captured {
    .front, .back {
      background-image: none;
      background-color: #000;
      pointer-events: none;
      opacity: 0;
      visibility: hidden
    }
  }
  &.disabled {
    pointer-events: none!important;
  }
  &:hover {
    cursor: pointer;
  }
`;


const Card = ({id, name, captured, interactions, flipCard, lost}) => { 

  const [cardFlipState, setCardFlipState] = useState(false);

  const toggleCard = (e) => {
    e.stopPropagation();
    console.log('clicked!');
    setCardFlipState(!cardFlipState);
    flipCard(id)
  }

  useEffect(() => {
    if (lost && cardFlipState) {
      setCardFlipState(!cardFlipState);
    }
  }, [lost])

  const flippedStatus = cardFlipState ? 'visible' : 'hidden'; 
  const capturedStatus = captured ? 'captured' : 'uncaptured';
  const clicStatus = interactions ? 'enabled' : 'disabled'

  return (
    <PokemonCard onClick={(e) => toggleCard(e)} className={`${flippedStatus} ${capturedStatus} ${clicStatus}`}>
      <div className="content">
        <div className="front"></div>
        <div className="back">{ name }</div>
      </div>
    </PokemonCard>
  )
}

export default Card
