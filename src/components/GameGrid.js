import React, { useEffect, useState } from 'react';
import pokemonsList from '../data/pokemon';
import Card from './Card/Card';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils';
import styled from 'styled-components';
import profilePicture from '../img/avatars/sacha.png';

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

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: fixed; 
  width: 100%;
  top: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: calc(70vh / 4) calc(70vh / 4) calc(70vh / 4) calc(70vh / 4);
  grid-template-rows: calc(70vh / 4) calc(70vh / 4) calc(70vh / 4) calc(70vh / 4); 
  grid-gap: 2vw;
  margin-bottom: 3rem;
  @media screen and (orientation: portrait) {
    grid-template-columns: calc(35vh / 4) calc(35vh / 4) calc(35vh / 4) calc(35vh / 4);
    grid-template-rows: calc(35vh / 4) calc(35vh / 4) calc(35vh / 4) calc(35vh / 4); 
  }
`;

const CenteredContainer = styled.section`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: #fff;
    font-size: 2.5rem;
    @media (max-width: 900px) {
      font-size: 2rem;
    }
  }
`;

const Button = styled.div`
  background-color: ${props => props.type === 'secondary' ? '#b0a78e' : '#ffc31e'};
  opacity: ${props => props.active ? '1' : '.3'};
  color: #212437;
  font-size: ${props => props.size === 'xl' ? '3rem' : '1.5rem'};
  padding: ${props => props.size === 'xl' ? '1.6rem 4rem' : '.8rem 1.38rem'};
  border-radius: 50px;
  line-height: 2rem;
  &:hover {
    cursor: pointer;
  }
  pointer-events: ${props => props.active ? 'auto' : 'none'};
`;

const ButtonGroup = styled.div`
  display: flex;
  > div {
    margin: 0 .5rem;
  }
`;

const ChooseUser = styled.div`
  min-width: 50vw;
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    flex-direction: column;
    input {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

const Input = styled.input`
  margin-right: 1rem;
  border-radius: 50px;
  font-size: 1.5rem;
  color: #434343;
  padding: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
`;

const SimpleLink = styled.div`
  color: #adb1cf;
  margin: 2rem 0;
  font-size: 1.3rem;
  text-decoration: underline;
  position: absolute;
  bottom: 3vh;
`;

const User = styled.div`
  color: #fff;
  font-size: ${props => props.size}rem;
  margin: 2rem;
  @media (max-width: 900px) {
    margin: 1rem 0;
  }
  display: flex;
  align-items: center;
`;

const UserCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 0 10vh 0;
`;

const Avatar = styled.div`
  width: ${props => props.size === 'big' ? '120' : '50'}px; 
  height: ${props => props.size === 'big' ? '120' : '50'}px;
  background-color: #3f4460;
  background-image: url(${profilePicture});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 100px;
  border: ${props => props.size === 'big' ? '6' : '3'}px solid #fff;
  margin: 0 1rem;
`;

const StopWatch = styled.div`
  color: #fff;
  font-size: 2rem;
  margin: 2rem;
  min-width: 180px;
  text-align: left;
  @media (max-width: 900px) {
    margin: 1rem 0;
    min-height: 60px;
    display: flex;
    align-items: center;
    min-width: 160px;
  }
`;

const ScoreBoard = styled.div`
  margin: 5vh;
  background-color: #2c2f45;
  padding: 2rem;
  min-width: 65vw;
  border-radius: 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .title {
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    width: 100%;
    li {
      display: flex;
      padding: 1rem 0;
      border-bottom: 2px solid #41445e;
      width: 100%;
      justify-content: space-between;
      &:first-child {
        color: #ffc31e;
        font-weight: bold;
      }
    }
  }
`;

const GameGrid = () => {

  const { timer, handleStart, handlePause, handleReset } = useTimer(0)

  const flipCard = (id) => {
    setFlippeds([...flippedCards, id])
  }

  const checkPair = () => {
    if (flippedCards.every(v => v === flippedCards[0])) {
      setTimeout(() => {
        vanishCard(flippedCards.slice(1));
        setFlippeds([]);
      }, 1000);
      setTimeout(() => {
        setInteractions(true)
      }, 1200);
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
    handleReset();
  }

  const stopGame = () => {
    handleReset();
    setStarted(false);
  }

  const storeNewScore = (newScore) => {
    let localScores = localStorage.getItem('scores');
    if (localScores === null) {
      localStorage.setItem('scores', JSON.stringify([newScore]))
    } else {
      let tempScores = JSON.parse(localScores);
      tempScores.push(newScore);
      let sortedScores = tempScores.sort((a, b) => (a.timer > b.timer) ? 1 : -1);
      let limitedScores = sortedScores.slice(0, 5);
      localStorage.setItem('scores', JSON.stringify(limitedScores))
    }
  }

  const switchGameContext = (gameId) => {
    // Take gameId
    // Map Game contexts 
    // Set Game context
    // Dynamic import data from list
  }

  const [loaded, setLoaded] = useState(false);
  const [gameContext, setGameContext] = useState();
  const [pairsList, setPairsList] = useState([]);
  const [flippedCards, setFlippeds] = useState([]);
  const [gridCreated, setGridCreated] = useState(false);
  const [interactions, setInteractions] = useState(true);
  const [lost, setLost] = useState(false);
  const [captured, setCaptured] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [user, setUser] = useState();
  const [userCreated, setUserCreated] = useState(false);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [showScoreBoardOnly, setShowScoreBoardOnly] = useState(false);

  useEffect(() => {
    const createGrid = () => {
      let list = pokemonsList.sort(() => Math.random() - 0.5).slice(0, 8);
      let clonedList = [...list]
      console.log(list)
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
      // Get scores from localStorage
      let localScores = localStorage.getItem('scores');
      setScoreBoard(localScores === null ? [] : JSON.parse(localScores))
    }

    if (flippedCards.length > 1) {
      setInteractions(false);
      checkPair()
    }

  }, [flippedCards, gridCreated])

  useEffect(() => {
    started ? handleStart() : handlePause()
  }, [started])

  useEffect(() => {
    let localUser = localStorage.getItem('user');
    if (localUser === null) {
      if (userCreated) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    } else {
      setUser(JSON.parse(localUser));
      setUserCreated(true);
    }
    setTimeout(() => {
      setLoaded(true)
    }, 500); 
  }, [userCreated])


  useEffect(() => {
    // Game finished
    if (captured > 1 && captured === pairsList.length / 2) {
      setFinished(true);
      setStarted(false);
      let newScore = {user, timer};
      storeNewScore(newScore);
      setScoreBoard(scoreBoard => [...scoreBoard, newScore]);
    }
  }, [captured])

  const diplayScoreBoard = () => {
    if (scoreBoard.length >= 1) {
      let sortedScores = scoreBoard.sort((a, b) => (a.timer > b.timer) ? 1 : -1);
      return (
        sortedScores.slice(0, 5).map((score, i) => <li key={i}>{ score.user.name}<span>{ formatTime(score.timer) }</span></li>)
      )
    } else {
      return <li>...</li>
    }
  }

  const showScoreBoard = () => {
    setFinished(true);
    setShowScoreBoardOnly(true);
  }

  const hideScoreBoard = () => {
    setFinished(false);
    setShowScoreBoardOnly(false)
  }

  const resetScores = () => {
    localStorage.removeItem("scores");
    setScoreBoard([]);
  }

  const changeUser = () => {
    setUserCreated(false);
    localStorage.removeItem('user')
  }

  return (
    <>
    {
      loaded && 
      <Plate>
      {
        userCreated && started &&
        <Header>
          <User size={2}><Avatar/>{ user.name }</User>
          <StopWatch>{formatTime(timer)}</StopWatch>
        </Header>
      }
      {
        !started && !finished &&
        <CenteredContainer>
          {
            !userCreated &&
            <>
            <h3>Choisis un pseudo</h3>
            <ChooseUser>
              <Input placeholder="pseudo" onChange={(e) => setUser({name: e.target.value, avatar: profilePicture})}></Input>
              <Button active onClick={() => setUserCreated(true)}>Valider</Button>
            </ChooseUser>
            </>
          }
          {
            userCreated && 
            <>
              <UserCard>
                <Avatar size={'big'} onClick={() => changeUser()}></Avatar>
                <User size={"2.5"}>{ user.name }</User>
                <Button active type={"secondary"} onClick={() => changeUser()}>Changer d'utilisateur</Button>
              </UserCard>
              <Button size={"xl"} active={userCreated ? true : false} onClick={(e) => setStarted(true)}>Jouer !</Button>
              <SimpleLink onClick={() => showScoreBoard()}>Voir les scores</SimpleLink>
            </>
          }
        </CenteredContainer>
      }
      {
        !finished && started &&
        <>
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
      <Button active onClick={() => stopGame()}>Stop</Button>
        </>
      }
      {
        finished && 
        <CenteredContainer>
          {
            !showScoreBoardOnly &&
            <>
              <h3>Bien joué { user.name } !</h3>
              <Button active onClick={(e) => restartGame()}>Recommencer</Button>
            </>
          }
          <ScoreBoard>
            <div className="title">Top 5</div>
            <ul>
              {
                diplayScoreBoard()
              }
            </ul>
          </ScoreBoard>
          {
            showScoreBoardOnly &&
            <ButtonGroup>
              <Button active onClick={() => hideScoreBoard()}>Retour</Button><Button active type={"secondary"} onClick={() => resetScores()}>Reset scores</Button>
            </ButtonGroup>
          }
        </CenteredContainer>
      }
    </Plate>
    }
    </>
  )
}

export default GameGrid