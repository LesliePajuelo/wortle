import "./App.css";
import "bulma/css/bulma.css";
import Pokedex from "./pokedex.json";
import AnswerKey from "./answerKey.json";
import { useEffect, useRef, useState } from "react";
import GameContainer from "./components/GameContainer";
import Title from "./components/Title";
import InstructionsModal from "./components/InstructionsModal";
import StatsModal from "./components/StatsModal";
import SettingsModal from "./components/SettingsModal";
import Footer from "./components/Footer";
import calculateStats from "./helpers/calculateStats";
import { generateRandomAnswer, generateRandomAttacks } from "./helpers/generateRandomAnswer";
import filterPokemonInput from "./helpers/filterPokemonInput";
import generateFeedback from "./helpers/generateFeedback";
import filterPokedex from "./helpers/filterPokedex";
import DataSources from "./components/DataSources";

import { useTranslation } from "react-i18next";

const START_DATE = new Date("February 21, 2022 00:00:00");
// console.log(`Start Date: ${START_DATE}`);
const MILLISECONDS_TO_DAYS = 1000 * 60 * 60 * 24;

const FLIP_DURATION = 300;
const STATS_MODAL_DELAY = 4000;
const ATTACK_DELAY = 7000;
const INFO_MODAL_DELAY = 1000;

const LOCAL_STORAGE_PREFIX = "SQWORDL";
const LOCAL_STORAGE_GAMESTATE = `${LOCAL_STORAGE_PREFIX}.gameState`;
const LOCAL_STORAGE_STATS = `${LOCAL_STORAGE_PREFIX}.stats`;

function App() {
  const { t, i18n } = useTranslation();

  const isPageRefreshed = useRef(true);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  const [pokedex, setPokedex] = useState(null);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [todaysDate, setTodaysDate] = useState(null);
  const [nextWordleDate, setNextWordleDate] = useState(null);

  const [isPokemonTrainerMode, setIsPokemonTrainerMode] = useState(true);
  const [isGymLeaderMode, setIsGymLeaderMode] = useState(false);
  const [isEliteFourMode, setIsEliteFourMode] = useState(false);

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

  const [showLanguage, setShowLanguage] = useState(false);
  const [currentLanguageCode, setCurrentLanguageCode] = useState(localStorage.getItem("i18nextLng") || "en");

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setShowLanguage(!showLanguage);
    setCurrentLanguageCode(language);
  };

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
    // for deployment
    const attack = AnswerKey[answerIndex].randomAttacks[guessFeedback.length - 1];

    // for testing
    // const attack = generateRandomAttacks(answer);

    setAnswerAttack(attack);
    setShowAnswerAttack(true);
    setTimeout(() => {
      setShowAnswerAttack(false);
    }, ATTACK_DELAY);
  }

  function clearErrorMessages() {
    setErrorMessage(null);
  }

  // LOAD PAGE AND CALCULATE ANSWER INDEX
  useEffect(async () => {
    const todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
    // console.log(`Local Date: ${todaysDate}`);
    setTodaysDate(todaysDate);

    const nextWordleDate = new Date(new Date().setHours(24, 0, 0, 0));
    // console.log(`Next Wordle Date: ${nextWordleDate}`);
    setNextWordleDate(nextWordleDate);

    const tempAnswerIndex = (todaysDate - START_DATE) / MILLISECONDS_TO_DAYS;
    setAnswerIndex(tempAnswerIndex);
    // console.log(`Answer index: ${tempAnswerIndex}`);

    setPokedex([...Pokedex]);
    setFilteredList([...Pokedex]);
    // console.log("Pokedex loaded");

    // check for user's existing stats
    const jsonStats = localStorage.getItem(LOCAL_STORAGE_STATS);
    if (jsonStats != null) {
      // console.log("Returning user. Loading user stats from local storage.");

      let newStats = JSON.parse(jsonStats);

      // check if badges exist in local storage
      if (newStats.badges === undefined) {
        console.log("no badges found");
        newStats.badges = {
          "Boulder Badge": false,
          "Cascade Badge": false,
          "Thunder Badge": false,
          "Rainbow Badge": false,
          "Soul Badge": false,
          "Marsh Badge": false,
          "Volcano Badge": false,
          "Earth Badge": false,
        };
      }

      setStats(newStats);
    } else {
      // console.log("New user. Saving new stats to local storage and displaying instructions modal in 1 second.");
      const newUserStats = {
        averageGuesses: 0,
        currentStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
        maxStreak: 0,
        winPercentage: 0,
        pokemonCaught: [],
        badges: {
          "Boulder Badge": false,
          "Cascade Badge": false,
          "Thunder Badge": false,
          "Rainbow Badge": false,
          "Soul Badge": false,
          "Marsh Badge": false,
          "Volcano Badge": false,
          "Earth Badge": false,
        },
      };
      setStats(newUserStats);
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, INFO_MODAL_DELAY);
    }
  }, []);

  // SET DAILY ANSWER
  useEffect(() => {
    if (!answerIndex) return;

    // For testing:
    // const todaysAnswerName = generateRandomAnswer(Pokedex).name;

    // For deployment
    const todaysAnswerName = AnswerKey[answerIndex].answer;

    const todaysAnswer = Pokedex.find((pokemon) => pokemon.name === todaysAnswerName);
    setAnswer(todaysAnswer);
    // console.log(`Answer: ${todaysAnswer.name}`);

    setGameLoading(false);
  }, [answerIndex]);

  // LOAD USER'S GAME STATE FROM CURRENT DAY
  useEffect(() => {
    if (!answerIndex) return;

    const jsonGameState = localStorage.getItem(LOCAL_STORAGE_GAMESTATE);
    if (jsonGameState != null) {
      const parsedGameState = JSON.parse(jsonGameState);
      const lastPlayed = parsedGameState.lastPlayed;
      // console.log(lastPlayed);

      // for testing:
      // const testDateCheck = new Date(new Date(lastPlayed));
      // testDateCheck.setSeconds(testDateCheck.getSeconds() + 20);
      // console.log(testDateCheck);
      // const currentTime = new Date(Date.now());
      // console.log(currentTime);

      // for deployement
      const dateLastPlayed = new Date(new Date(lastPlayed).setHours(0, 0, 0, 0));
      // console.log(`Today's date: ${todaysDate}`);
      // console.log(`Date last played: ${dateLastPlayed}`);
      // console.log(todaysDate - dateLastPlayed);

      if (todaysDate > dateLastPlayed) {
        // for testing:
        // if (currentTime > testDateCheck) {
        // console.log("New sqwordle available. Deleting previous game state.");
        localStorage.removeItem(LOCAL_STORAGE_GAMESTATE);
      } else {
        // console.log("Loading user's game state for current game.");
        // render all components of the game properly: feedback, filtered pokedex, difficulty settings, win/lose state, gameOn
        setIsPokemonTrainerMode(parsedGameState.pokemonTrainerMode);
        setIsGymLeaderMode(parsedGameState.gymLeaderMode);
        setIsEliteFourMode(parsedGameState.eliteFourMode);
        setGuessFeedback(parsedGameState.guessFeedback);

        let filteredPokedex = [...Pokedex];
        for (const feedback of parsedGameState.guessFeedback) {
          filteredPokedex = filterPokedex(feedback, filteredPokedex);
        }
        setPokedex(filteredPokedex);

        setWin(parsedGameState.winStatus);
        setLose(parsedGameState.loseStatus);
        setSpriteUrl(parsedGameState.spriteUrl);
        setGameOn(parsedGameState.gameOn);
      }
    } else {
      // console.log("No previous game state.");
    }
  }, [answer]);

  // STORE STATS TO LOCAL STORAGE
  useEffect(() => {
    if (!stats) return;
    // check for missing badges here
    // console.log(stats);
    // let newStats = { ...stats };
    // if (stats.badges === undefined) {
    //   console.log("no badges found");
    //   newStats.badges = {
    //     "Boulder Badge": false,
    //     "Cascade Badge": false,
    //     "Thunder Badge": false,
    //     "Rainbow Badge": false,
    //     "Soul Badge": false,
    //     "Marsh Badge": false,
    //     "Volcano Badge": false,
    //     "Earth Badge": false,
    //   };
    // }
    // localStorage.setItem(LOCAL_STORAGE_STATS, JSON.stringify(stats));
    localStorage.setItem(LOCAL_STORAGE_STATS, JSON.stringify(stats));
  }, [stats]);

  // FILTER INPUT SUGGESTIONS WHEN TYPING IN GUESS INPUT FIELD
  useEffect(() => {
    if (!guessInput) return;
    const tempFilteredList = filterPokemonInput([...pokedex], guessInput);
    setFilteredList(tempFilteredList);
  }, [guessInput]);

  // SHOW OR HIDE FILTERED LIST
  useEffect(() => {
    if (!filteredList) return;
    if (suggestionClicked) return;
    if (filteredList.length > 0) {
      setShowFilteredList(true);
    } else {
      setShowFilteredList(false);
    }
  }, [filteredList]);

  // HIDE FILTERED LIST WHEN SUGGESTION CLICKED
  useEffect(() => {
    if (!suggestionClicked) return;
    setShowFilteredList(false);
  }, [suggestionClicked]);

  // GENERATE FEEDBACK FOR A GUESS
  useEffect(async () => {
    if (!guessToCheck) return;
    clearErrorMessages();

    const guessedPokemon = pokedex.filter((pokemon) => pokemon.name === guessToCheck)[0];
    if (!guessedPokemon) {
      setErrorMessage(t("inputErrorMessage"));
      setTimeout(() => {
        clearErrorMessages();
      }, 3000);
      return;
    }

    const feedback = generateFeedback(guessedPokemon, answer, guessFeedback);
    setGuessFeedback(feedback);
    localStorage.setItem(
      LOCAL_STORAGE_GAMESTATE,
      JSON.stringify({
        guessFeedback: feedback,
        pokemonTrainerMode: isPokemonTrainerMode,
        gymLeaderMode: isGymLeaderMode,
        eliteFourMode: isEliteFourMode,
        lastPlayed: Date.now(),
        winStatus: win,
        loseStatus: lose,
        gameOn: gameOn,
      })
    );
    // console.log(feedback);

    const tempPokedex = [...pokedex];
    const filteredPokedex = filterPokedex(feedback[feedback.length - 1], tempPokedex);

    setPokedex(filteredPokedex);
    window.scrollTo(0, 0); // for mobile users

    setGuessInput("");
  }, [guessToCheck]);

  // CHECK FOR WIN, LOSS, OR ATTACK
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

  // STORE GAMESTATE AFTER WIN OR LOSS
  useEffect(() => {
    //try useRef guard clause here
    if (!isPageRefreshed.current) {
      localStorage.setItem(
        LOCAL_STORAGE_GAMESTATE,
        JSON.stringify({
          guessFeedback: guessFeedback,
          pokemonTrainerMode: isPokemonTrainerMode,
          gymLeaderMode: isGymLeaderMode,
          eliteFourMode: isEliteFourMode,
          lastPlayed: Date.now(),
          winStatus: win,
          loseStatus: lose,
          gameOn: gameOn,
          spriteUrl: spriteUrl,
        })
      );
    } else {
      isPageRefreshed.current = false;
    }
  }, [win, lose]);

  return (
    <>
      <InstructionsModal
        isInfoModalOpen={isInfoModalOpen}
        setIsInfoModalOpen={setIsInfoModalOpen}
        showLanguage={showLanguage}
        setShowLanguage={setShowLanguage}
        changeLanguage={changeLanguage}
        currentLanguageCode={currentLanguageCode}
      />
      {stats && (
        <StatsModal
          isStatsModalOpen={isStatsModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          guessFeedback={guessFeedback}
          win={win}
          lose={lose}
          stats={stats}
          nextWordleDate={nextWordleDate}
          isGymLeaderMode={isGymLeaderMode}
          isEliteFourMode={isEliteFourMode}
          answerIndex={answerIndex}
        />
      )}

      <SettingsModal
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        isPokemonTrainerMode={isPokemonTrainerMode}
        setIsPokemonTrainerMode={setIsPokemonTrainerMode}
        isGymLeaderMode={isGymLeaderMode}
        setIsGymLeaderMode={setIsGymLeaderMode}
        isEliteFourMode={isEliteFourMode}
        setIsEliteFourMode={setIsEliteFourMode}
        guessFeedback={guessFeedback}
      />
      <DataSources isSourcesModalOpen={isSourcesModalOpen} setIsSourcesModalOpen={setIsSourcesModalOpen} />
      <Title gameOn={gameOn} win={win} lose={lose} />
      <GameContainer
        showLanguage={showLanguage}
        setShowLanguage={setShowLanguage}
        changeLanguage={changeLanguage}
        currentLanguageCode={currentLanguageCode}
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        gameLoading={gameLoading}
        gameOn={gameOn}
        setGameOn={setGameOn}
        pokedex={pokedex}
        filteredList={filteredList}
        showFilteredList={showFilteredList}
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
        isGymLeaderMode={isGymLeaderMode}
        isEliteFourMode={isEliteFourMode}
      />
      <Footer setIsSourcesModalOpen={setIsSourcesModalOpen} />
    </>
  );
}

export default App;
