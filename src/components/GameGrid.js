import React, { useEffect, useState } from 'react';
import pokemonsList from '../pokemonsList';
import Card from './Card/Card';
import styled from 'styled-components';

const Plate = styled.section`
  display: flex;
  min-height: 100vh;
  flex-direction: row;
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
  grid-template-columns: calc(70vh / 4) calc(70vh / 4) calc(70vh / 4) calc(70vh / 4);
  grid-template-rows: calc(70vh / 4) calc(70vh / 4) calc(70vh / 4) calc(70vh / 4); 
  grid-gap: 2vw;
  @media screen and (orientation: portrait) {
    grid-template-columns: calc(35vh / 4) calc(35vh / 4) calc(35vh / 4) calc(35vh / 4);
    grid-template-rows: calc(35vh / 4) calc(35vh / 4) calc(35vh / 4) calc(35vh / 4); 
  }
`;

const ReplayContainer = styled.section`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: #fff;
    font-size: 2.8rem;
  }
`;

const ReplayButton = styled.div`
  background-color: #ffc31e;
  color: #212437;
  font-size: 1.5rem;
  padding: .8rem 1.38rem;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const ScoreBoard = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Counter = styled.span`

`;

const GameGrid = () => {

  const flipCard = (id) => {
    setFlippeds([...flippedCards, id])
  }

  const checkPair = () => {
    if (flippedCards.every(v => v === flippedCards[0])) {
      setTimeout(() => {
        vanishCard(flippedCards.slice(1));
        setFlippeds([]);
      }, 1500);
      setTimeout(() => {
        setInteractions(true)
      }, 1800);
    } else {
      setFlippeds([]);
      setTimeout(() => {
        setLost(true)
      }, 1500);
      setTimeout(() => {
        setInteractions(true)
        setLost(false)
      }, 1800);
    }
  }

  const vanishCard = (id) => {
    let intId = parseInt(id, 10);
    setCaptured(captured + 1);
    let newPairsList = pairsList.map(card => {
        if (card.id === intId) {
          card.captured = true;
        }
        return card;
    });
    setPairsList(newPairsList);
  }

  const restartGame = () => {
    setGridCreated(false);
    setFinished(false);
  }

  const [pairsList, setPairsList] = useState([]);
  const [flippedCards, setFlippeds] = useState([]);
  const [gridCreated, setGridCreated] = useState(false);
  const [interactions, setInteractions] = useState(true);
  const [lost, setLost] = useState(false);
  const [captured, setCaptured] = useState(0);
  const [finished, setFinished] = useState(false)

  useEffect(() => {

    const createGrid = () => {
      let list = pokemonsList.slice(0)
      let clonedList = [...list]
      let completeList = [...list, ...clonedList]
      const shuffledList = completeList.sort(() => Math.random() - 0.5);
      let unPlayedCards = shuffledList.map(card => {
        card.captured = false;
        return card;
      })
      setPairsList(unPlayedCards);
      setCaptured(0);
      setGridCreated(true);
    }
    
    if (!gridCreated) {
      createGrid();
    }
    if (flippedCards.length > 1) {
      setInteractions(false);
      checkPair()
    }
  }, [flippedCards, gridCreated])

  useEffect(() => {
    if (captured > 1 && captured === pairsList.length / 2) {
      setFinished(true);
    }
  }, [captured])

  return (
    <>
      <Plate>
        {/* <ScoreBoard>
          <div className="title">Score Board</div>
          <Counter></Counter>
        </ScoreBoard> */}
        {
          !finished &&
          <Grid>
          {
            pairsList.map((card, index) => (
              <Card 
                key={index} 
                id={card.id} 
                name={card.name} 
                picture={card.picture}
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
        }
        {
          finished && 
          <ReplayContainer>
            <h3>Bien joué !</h3>
            <ReplayButton onClick={(e) => restartGame()}>Recommencer</ReplayButton>
          </ReplayContainer>
        }
      </Plate>
    </>
  )
}

export default GameGrid