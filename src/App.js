import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import PokedexModal from "./components/modals/PokedexModal";
import "./App.css";
import "bulma/css/bulma.css";
import Pokedex from "./constants/pokedex.json";
import AnswerKey from "./constants/answerKey.json";
import Title from "./components/Title";
import GameContainer from "./components/mainGame/GameContainer";
import Footer from "./components/Footer";
import InstructionsModal from "./components/modals/InstructionsModal";
import StatsModal from "./components/modals/statsModal/StatsModal";
import SettingsModal from "./components/modals/SettingsModal";
import DataSourcesModal from "./components/modals/DataSourcesModal";
import { generateRandomAnswer, generateRandomAttacks } from "./lib/testFunctions/generateRandomAnswer"; // for testing
import filterPokemonInput from "./lib/filterPokemonInput";
import generateFeedback from "./lib/generateFeedback";
import filterPokedex from "./lib/filterPokedex";
import calculateStats, { loadStats, badgesForLegacyUsers } from "./lib/calculateStats";
import { answer, index } from "./lib/generateAnswer";
import {
  LOCAL_STORAGE_GAMESTATE,
  loadLanguagePreferenceFromLocalStorage,
  saveStatsToLocalStorage,
  loadGameStateFromLocalStorage,
} from "./lib/localStorage";
import {
  FLIP_DURATION_GAME_OVER,
  STATS_MODAL_DELAY,
  ATTACK_DELAY,
  INFO_MODAL_DELAY,
  DAILY_SQWORDLE,
} from "./constants/settings";

function App() {
  const { t, i18n } = useTranslation();

  const isPageRefreshed = useRef(true);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isStatsPokedexModalOpen, setIsStatsPokedexModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  const [isPokemonTrainerMode, setIsPokemonTrainerMode] = useState(true);
  const [isGymLeaderMode, setIsGymLeaderMode] = useState(false);
  const [isEliteFourMode, setIsEliteFourMode] = useState(false);

  const [gameLoading, setGameLoading] = useState(true);
  const [gameOn, setGameOn] = useState(false);

  const [guessInput, setGuessInput] = useState("");
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [guessToCheck, setGuessToCheck] = useState(null);
  const [guessFeedback, setGuessFeedback] = useState([]);

  const [filteredPokedex, setFilteredPokedex] = useState([...Pokedex]);
  const [filteredInputList, setFilteredInputList] = useState([...Pokedex]);
  const [showFilteredInputList, setShowFilteredInputList] = useState(false);

  const [answerAttack, setAnswerAttack] = useState(null);
  const [showAnswerAttack, setShowAnswerAttack] = useState(false);

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [stats, setStats] = useState(loadStats()); // user's existing stats or new stats
  const [spriteUrl, setSpriteUrl] = useState(null);
  const [isAnimation, setIsAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [currentLanguageCode, setCurrentLanguageCode] = useState(loadLanguagePreferenceFromLocalStorage());

  function handleChangeLanguage(language) {
    i18n.changeLanguage(language);
    setShowLanguageSelector(!showLanguageSelector);
    setCurrentLanguageCode(language);
  }

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
      }, FLIP_DURATION_GAME_OVER);
    }, FLIP_DURATION_GAME_OVER);
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
      }, FLIP_DURATION_GAME_OVER);
    }, FLIP_DURATION_GAME_OVER);
  }

  function renderAttack() {
    let attack;
    if (DAILY_SQWORDLE) {
      attack = AnswerKey[index].randomAttacks[guessFeedback.length - 1];
    } else {
      // for safari zone and testing
      attack = generateRandomAttacks(answer); // todo: filter unique moves
    }

    setAnswerAttack(attack);
    setShowAnswerAttack(true);
    setTimeout(() => {
      setShowAnswerAttack(false);
    }, ATTACK_DELAY);
  }

  function clearErrorMessages() {
    setErrorMessage(null);
  }

  function resetGameState() {
    // TODO: refactor
    console.log("New Sqwordle available. Resetting game state");
  }

  function restoreUserState(gameState) {
    setGuessFeedback(gameState.guessFeedback);

    let filteredPokemon = [...Pokedex];
    for (const feedback of gameState.guessFeedback) {
      filteredPokemon = filterPokedex(feedback, filteredPokemon);
    }
    setFilteredPokedex(filteredPokemon);
    setFilteredInputList(filteredPokemon);

    setWin(gameState.winStatus);
    setLose(gameState.loseStatus);
    setSpriteUrl(gameState.spriteUrl);
    setGameOn(gameState.gameOn);
  }

  // LOAD PAGE
  useEffect(async () => {
    // show instructions if no game state in local storage
    if (!loadGameStateFromLocalStorage()) {
      console.log("No previous game state. Showing instructions modal");
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, INFO_MODAL_DELAY);
    } else {
      console.log("Previous game state found in local storage");
      const gameState = loadGameStateFromLocalStorage();
      setIsPokemonTrainerMode(gameState.pokemonTrainerMode);
      setIsGymLeaderMode(gameState.gymLeaderMode);
      setIsEliteFourMode(gameState.eliteFourMode);

      // TODO: consider refactoring... store solution in localStorage and check whether today's solution is the same as localStorageSolution... would be cleaner
      const todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
      // const lastPlayed = gameState.lastPlayed;
      const dateLastPlayed = new Date(new Date(gameState.lastPlayed).setHours(0, 0, 0, 0));

      if (todaysDate > dateLastPlayed) {
        // TODO: refactor to not remove the state but to reset the state... do this once this version is deployed without issue
        resetGameState();
        localStorage.removeItem(LOCAL_STORAGE_GAMESTATE);
      } else {
        console.log("Restoring user state");
        restoreUserState(gameState);
      }
    }

    // Check to see if badges are in user's localStorage... legacy users may not have badges.
    // could consider removing gameModes and etc here
    if (stats.badges === undefined) {
      setStats({ ...stats, badges: badgesForLegacyUsers });
    }
    setGameLoading(false);
  }, []);

  // STORE STATS TO LOCAL STORAGE
  useEffect(() => {
    saveStatsToLocalStorage(stats);
  }, [stats]);

  // FILTER INPUT SUGGESTIONS WHEN TYPING IN GUESS INPUT FIELD
  useEffect(() => {
    if (!guessInput) return;
    const tempFilteredList = filterPokemonInput([...Pokedex], guessInput);
    setFilteredInputList(tempFilteredList);
  }, [guessInput]);

  // SHOW OR HIDE FILTERED LIST
  useEffect(() => {
    if (!filteredInputList) return;
    if (suggestionClicked) return;
    if (filteredInputList.length > 0) {
      setShowFilteredInputList(true);
    } else {
      setShowFilteredInputList(false);
    }
  }, [filteredInputList]);

  // HIDE FILTERED LIST WHEN SUGGESTION CLICKED
  useEffect(() => {
    if (!suggestionClicked) return;
    setShowFilteredInputList(false);
  }, [suggestionClicked]);

  // GENERATE FEEDBACK FOR A GUESS
  useEffect(async () => {
    if (!guessToCheck) return;
    clearErrorMessages();

    const guessedPokemon = Pokedex.filter((pokemon) => pokemon.name === guessToCheck)[0];
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

    const filteredData = filterPokedex(feedback[feedback.length - 1], Pokedex);
    setFilteredPokedex(filteredData);
    setFilteredInputList(filteredData);

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
      <Title gameOn={gameOn} win={win} lose={lose} />
      <GameContainer
        showLanguageSelector={showLanguageSelector}
        setShowLanguageSelector={setShowLanguageSelector}
        handleChangeLanguage={handleChangeLanguage}
        currentLanguageCode={currentLanguageCode}
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        gameLoading={gameLoading}
        gameOn={gameOn}
        setGameOn={setGameOn}
        filteredPokedex={filteredPokedex}
        filteredInputList={filteredInputList}
        showFilteredInputList={showFilteredInputList}
        setSuggestionClicked={setSuggestionClicked}
        guessInput={guessInput}
        setGuessInput={setGuessInput}
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
      <InstructionsModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        showLanguageSelector={showLanguageSelector}
        setShowLanguageSelector={setShowLanguageSelector}
        handleChangeLanguage={handleChangeLanguage}
        currentLanguageCode={currentLanguageCode}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        setIsStatsPokedexModalOpen={setIsStatsPokedexModalOpen}
        guessFeedback={guessFeedback}
        win={win}
        lose={lose}
        stats={stats}
        isGymLeaderMode={isGymLeaderMode}
        isEliteFourMode={isEliteFourMode}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isPokemonTrainerMode={isPokemonTrainerMode}
        setIsPokemonTrainerMode={setIsPokemonTrainerMode}
        isGymLeaderMode={isGymLeaderMode}
        setIsGymLeaderMode={setIsGymLeaderMode}
        isEliteFourMode={isEliteFourMode}
        setIsEliteFourMode={setIsEliteFourMode}
        guessFeedback={guessFeedback}
      />
      <DataSourcesModal isOpen={isSourcesModalOpen} handleClose={() => setIsSourcesModalOpen(false)} />
      <PokedexModal
        isOpen={isStatsPokedexModalOpen}
        handleClose={() => setIsStatsPokedexModalOpen(false)}
        filteredPokedex={filteredPokedex}
        stats={stats}
      />
    </>
  );
}

export default App;
