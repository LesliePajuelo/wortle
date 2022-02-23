import "./App.css";
import "bulma/css/bulma.css";
import Pokedex from "./pokedex.json";
import AnswerKey from "./answerKey.json";
import { useEffect, useState } from "react";
import GameContainer from "./components/GameContainer";
import Title from "./components/Title";
// import { fetchPokedex } from "./helpers/fetchFunctions";
import InstructionsModal from "./components/InstructionsModal";
import StatsModal from "./components/StatsModal";
import SettingsModal from "./components/SettingsModal";
import Footer from "./components/Footer";
import calculateStats from "./helpers/calculateStats";
import { generateRandomAnswer, generateRandomAttacks } from "./helpers/generateRandomAnswer";
import filterPokemonInput from "./helpers/filterPokemonInput";
import generateFeedback from "./helpers/generateFeedback";
import filterPokedex from "./helpers/filterPokedex";

// const START_DATE = new Date(new Date("February 1, 2022 00:00:00").setUTCHours(8, 0, 0, 0));
const START_DATE = new Date("February 21, 2022 00:00:00");
console.log(`Start Date: ${START_DATE}`);
const MILLISECONDS_TO_DAYS = 1000 * 60 * 60 * 24;

const FLIP_DURATION = 300;
const STATS_MODAL_DELAY = 4000;
const ATTACK_DELAY = 7000;
const INFO_MODAL_DELAY = 1000;

const LOCAL_STORAGE_PREFIX = "SQWORDL";
const LOCAL_STORAGE_GAMESTATE = `${LOCAL_STORAGE_PREFIX}.gameState`;
const LOCAL_STORAGE_STATS = `${LOCAL_STORAGE_PREFIX}.stats`;

function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [pokedex, setPokedex] = useState(null);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [nextWordleDate, setNextWordleDate] = useState(null);

  const [gameLoading, setGameLoading] = useState(true);
  const [gameOn, setGameOn] = useState(false);

  const [guessInput, setGuessInput] = useState("");
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [guessToCheck, setGuessToCheck] = useState(null);
  const [guessFeedback, setGuessFeedback] = useState([]);

  const [filteredList, setFilteredList] = useState(null);
  const [showFilteredList, setShowFilteredList] = useState(false);

  const [answerAttack, setAnswerAttack] = useState(null);
  const [showAnswerAttack, setShowAnswerAttack] = useState(false);

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [stats, setStats] = useState(null);
  const [spriteUrl, setSpriteUrl] = useState(null);
  const [isAnimation, setIsAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function renderGameWin() {
    setSpriteUrl(answer.spriteUrl);
    setWin(true);
    const updatedStats = calculateStats(stats, answer.name, guessFeedback, true);
    setStats(updatedStats);
    setGameOn(false);
    setTimeout(() => {
      setIsAnimation(true);
      setTimeout(() => {
        setIsAnimation(false);
        setTimeout(() => {
          setIsStatsModalOpen(true);
        }, STATS_MODAL_DELAY);
      }, FLIP_DURATION);
    }, FLIP_DURATION);
  }

  function renderGameLoss() {
    setSpriteUrl(answer.spriteUrl);
    setLose(true);
    const updatedStats = calculateStats(stats, answer.name, guessFeedback, false);
    setStats(updatedStats);
    setGameOn(false);
    setTimeout(() => {
      setIsAnimation(true);
      setTimeout(() => {
        setIsAnimation(false);
        setTimeout(() => {
          setIsStatsModalOpen(true);
        }, STATS_MODAL_DELAY);
      }, FLIP_DURATION);
    }, FLIP_DURATION);
  }

  function renderAttack() {
    // for testing
    // const attack = AnswerKey[answerIndex].randomAttacks[guessFeedback.length - 1];
    const attack = generateRandomAttacks(answer);

    setAnswerAttack(attack);

    // setAnswerAttack(randomAttack);
    setShowAnswerAttack(true);
    setTimeout(() => {
      setShowAnswerAttack(false);
    }, ATTACK_DELAY);
  }

  function clearErrorMessages() {
    setErrorMessage(null);
  }

  // Populate page on load
  useEffect(async () => {
    setPokedex(Pokedex);
    setFilteredList(Pokedex);
    console.log("Pokedex loaded");

    // delete deprecated boardState for beta testers
    const boardState = localStorage.getItem("SQWORDL.boardState");
    if (boardState != null) {
      localStorage.removeItem("SQWORDL.boardState");
      console.log("removing deprecated boardState from beta tester's local storage");
    }

    // check for user's stats
    const jsonStats = localStorage.getItem(LOCAL_STORAGE_STATS);
    if (jsonStats != null) {
      setStats(JSON.parse(jsonStats));
      console.log("Returning user. Loading user stats from local storage.");
    } else {
      console.log("New user. Saving new stats to local storage. Showing info modal in 1 second.");
      const newUserStats = {
        averageGuesses: 0,
        currentStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
        maxStreak: 0,
        winPercentage: 0,
        pokemonCaught: [],
      };
      setStats(newUserStats);
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, INFO_MODAL_DELAY);
    }

    const todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
    console.log(`Local Date: ${todaysDate}`);
    const tempAnswerIndex = (todaysDate - START_DATE) / MILLISECONDS_TO_DAYS;
    setAnswerIndex(tempAnswerIndex);
    console.log(`Answer index: ${tempAnswerIndex}`);

    //getDate returns the day of the month... will this work when going forward a month?
    const nextWordleDate = todaysDate.setDate(todaysDate.getDate() + 1);
    setNextWordleDate(nextWordleDate);

    // TODO: reset gameState in localStorage if new sqwordle day, else load gameState
    const lastPlayed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_GAMESTATE)).lastPlayed;
    console.log(lastPlayed);
    // if (Date.now() is one day greater than lastPlayed) {
    //   console.log("new wordle. resetting gameState");
    // } else {
    //   console.log("new wordle not available yet. Loading gameState");
    // }
  }, []);

  useEffect(() => {
    if (!answerIndex) return;

    // For random testing:
    const todaysAnswerName = generateRandomAnswer(Pokedex).name;
    // const todaysAnswerName = AnswerKey[answerIndex].answer;
    const todaysAnswer = Pokedex.find((pokemon) => pokemon.name === todaysAnswerName);
    console.log(`Answer: ${todaysAnswer.name}`);
    setAnswer(todaysAnswer);

    setGameLoading(false);
  }, [answerIndex]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STATS, JSON.stringify(stats));
  }, [stats]);

  // Filter input list when typing in a guess
  useEffect(() => {
    if (!guessInput) return;
    const tempFilteredList = filterPokemonInput(pokedex, guessInput);
    setFilteredList(tempFilteredList);
  }, [guessInput]);

  useEffect(() => {
    if (!filteredList) return;
    if (suggestionClicked) return;
    if (filteredList.length > 0) {
      setShowFilteredList(true);
    } else {
      setShowFilteredList(false);
    }
  }, [filteredList]);

  useEffect(() => {
    if (!suggestionClicked) return;
    setShowFilteredList(false);
  }, [suggestionClicked]);

  // Generate user feedback to a guess
  useEffect(async () => {
    if (!guessToCheck) return;
    clearErrorMessages();

    const guessedPokemon = pokedex.filter((pokemon) => pokemon.name === guessToCheck)[0];
    //guard clause for spelling errors:
    if (!guessedPokemon) {
      setErrorMessage("Not a pokemon, please check spelling");
      setTimeout(() => {
        clearErrorMessages();
      }, 3000);
      return;
    }

    const feedback = generateFeedback(guessedPokemon, answer, guessFeedback);
    setGuessFeedback(feedback);
    localStorage.setItem(LOCAL_STORAGE_GAMESTATE, JSON.stringify({ feedback, lastPlayed: Date.now() }));
    console.log(feedback);

    const tempPokedex = [...pokedex];
    const filteredPokedex = filterPokedex(feedback[feedback.length - 1], tempPokedex);

    setPokedex(filteredPokedex);
    window.scrollTo(0, 0); // for mobile users

    setGuessInput("");
  }, [guessToCheck]);

  // Check for game win/loss or attack
  useEffect(async () => {
    if (!guessToCheck) return;

    if (answer.name === guessToCheck) {
      renderGameWin();
    } else if (guessFeedback.length === 6) {
      renderGameLoss();
    } else if (guessFeedback.length > 0 && guessFeedback.length < 6) {
      renderAttack();
    }
  }, [guessFeedback]);

  return (
    <>
      <InstructionsModal isInfoModalOpen={isInfoModalOpen} setIsInfoModalOpen={setIsInfoModalOpen} />
      <StatsModal
        isStatsModalOpen={isStatsModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        guessFeedback={guessFeedback}
        win={win}
        lose={lose}
        stats={stats}
        nextWordleDate={nextWordleDate}
      />
      <SettingsModal isSettingsModalOpen={isSettingsModalOpen} setIsSettingsModalOpen={setIsSettingsModalOpen} />
      <Title gameOn={gameOn} win={win} lose={lose} />
      <GameContainer
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        gameLoading={gameLoading}
        gameOn={gameOn}
        setGameOn={setGameOn}
        pokedex={pokedex}
        filteredList={filteredList}
        showFilteredList={showFilteredList}
        suggestionClicked={suggestionClicked}
        setSuggestionClicked={setSuggestionClicked}
        guessInput={guessInput}
        setGuessInput={setGuessInput}
        answer={answer}
        setGuessToCheck={setGuessToCheck}
        guessFeedback={guessFeedback}
        win={win}
        lose={lose}
        spriteUrl={spriteUrl}
        errorMessage={errorMessage}
        isAnimation={isAnimation}
        answerAttack={answerAttack}
        showAnswerAttack={showAnswerAttack}
      />
      <Footer />
    </>
  );
}

export default App;
