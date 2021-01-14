import React, { useEffect, useState } from 'react';
import pokemonsList from '../pokemonsList';
import Card from './Card/Card';
import styled from 'styled-components';

const Plate = styled.section`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  h1 {
    color: #fff;
    padding: 0 0 3rem 0;
    font-size: 2.5rem;
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px 200px;
  grid-template-rows: 200px 200px 200px 200px; 
  grid-gap: 12px;
`

const GameGrid = () => {

  // Create grid size from number of pair
  const createGrid = () => {
    let list = pokemonsList.slice(0)
    let clonedList = [...list]
    let completeList = [...list, ...clonedList]
    const shuffledList = completeList.sort(() => Math.random() - 0.5)
    setPairsList(shuffledList);
    setGridCreated(true);
  }

  const flipCard = (id) => {
    console.log(id)
    setFlippeds([...flippedCards, id])
  }

  const checkPair = () => {
    console.log('check pair now!')
    if (flippedCards.every(v => v === flippedCards[0])) {
      console.log('win!')
      setTimeout(() => {
        vanishCard(flippedCards.slice(1));
        setFlippeds([]);
      }, 1500);
      setTimeout(() => {
        setInteractions(true)
      }, 2000);
    } else {
      console.log('lost')
      setFlippeds([]);
      setTimeout(() => {
        setLost(true)
      }, 1500);
      setTimeout(() => {
        setInteractions(true)
        setLost(false)
      }, 2000);
    }
  }

  const vanishCard = (id) => {
    console.log(`vanish the card with id : ${id}`);
    let intId = parseInt(id, 10);
    let newPairsList = pairsList.map(card => {
        console.log(card);
        if (card.id === intId) {
          console.log('blop')
          card.captured = true;
        }
        return card;
    });
    console.log(newPairsList);
    setPairsList(newPairsList);
  }

  const [pairsList, setPairsList] = useState([]);
  const [flippedCards, setFlippeds] = useState([]);
  const [gridCreated, setGridCreated] = useState(false);
  const [interactions, setInteractions] = useState(true);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    if (!gridCreated) {
      console.log('whe create the grid one time!')
      createGrid();
    }
    if (flippedCards.length > 1) {
      console.log('2 cards flipped!')
      setInteractions(false);
      checkPair()
    }
  }, [flippedCards])

  return (
    <>
      <Plate>
        <h1>MemoMon</h1>
        <Grid>
          {
            pairsList.map((card, index) => (
              <Card 
                key={index} 
                id={card.id} 
                name={card.name} 
                captured={card.captured}
                flipped={card.flipped}
                interactions={interactions} 
                flipCard={flipCard}
                lost={lost}
                >
              </Card>
            ))
          }
        </Grid>
      </Plate>
    </>
  )
}

export default GameGrid