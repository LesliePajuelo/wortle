import { useEffect, useState } from "react";
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
import BugReportModal from "./components/modals/bugReportModal/BugReportModal";
import filterPokemonInput from "./lib/filterPokemonInput";
import generateFeedback from "./lib/generateFeedback";
import filterPokedex from "./lib/filterPokedex";
import calculateStats, { loadStats, badgesForLegacyUsers } from "./lib/calculateStats";
import { answer, index } from "./lib/generateDailyAnswer";
import {
  loadLanguagePreferenceFromLocalStorage,
  saveStatsToLocalStorage,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";
import { FLIP_DURATION_GAME_OVER, STATS_MODAL_DELAY, ATTACK_DELAY, INFO_MODAL_DELAY } from "./constants/settings";
import BugReportSuccessMessage from "./components/modals/bugReportModal/BugReportSuccessMessage";
import DonateModal from "./components/modals/DonateModal";

function App() {
  const { t, i18n } = useTranslation();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isStatsPokedexModalOpen, setIsStatsPokedexModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [isBugReportModalOpen, setIsBugReportModalOpen] = useState(false);
  const [isBugReportSuccess, setIsBugReportSuccess] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const [isPokemonTrainerMode, setIsPokemonTrainerMode] = useState(() => {
    const gameState = loadGameStateFromLocalStorage();
    return gameState ? gameState.pokemonTrainerMode : true;
  });

  const [isGymLeaderMode, setIsGymLeaderMode] = useState(() => {
    const gameState = loadGameStateFromLocalStorage();
    return gameState ? gameState.gymLeaderMode : false;
  });

  const [isEliteFourMode, setIsEliteFourMode] = useState(() => {
    const gameState = loadGameStateFromLocalStorage();
    return gameState ? gameState.eliteFourMode : false;
  });

  const [gameLoading, setGameLoading] = useState(true);
  const [gameOn, setGameOn] = useState(false);

  const [guessInput, setGuessInput] = useState("");
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [guessToCheck, setGuessToCheck] = useState(null);

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

  const [guessFeedback, setGuessFeedback] = useState(() => {
    const gameState = loadGameStateFromLocalStorage();
    if (gameState) {
      if (gameState?.solutionIndex !== index) {
        return []; // new game
      }
      // restore game state
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
      return gameState.guessFeedback;
    }
    return []; // first time playing
  });

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
    const attack = AnswerKey[index].randomAttacks[guessFeedback.length - 1];
    setAnswerAttack(attack);
    setShowAnswerAttack(true);
    setTimeout(() => {
      setShowAnswerAttack(false);
    }, ATTACK_DELAY);
  }

  function clearErrorMessages() {
    setErrorMessage(null);
  }

  // LOAD PAGE
  useEffect(() => {
    // show instructions if no game state in local storage
    if (!loadGameStateFromLocalStorage()) {
      console.log("No previous game state. Showing instructions modal");
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, INFO_MODAL_DELAY);
    }
    // Check to see if badges are in user's localStorage... legacy users may not have badges.
    if (stats.badges === undefined) {
      setStats({ ...stats, badges: badgesForLegacyUsers });
    }
    setGameLoading(false);
  }, []);

  // STORE STATS TO LOCAL STORAGE (separate useEffect hook due to legacy badge issue)
  useEffect(() => {
    saveStatsToLocalStorage(stats);
  }, [stats]);

  // FILTER INPUT SUGGESTIONS WHEN TYPING IN GUESS INPUT FIELD
  useEffect(() => {
    if (guessInput === "") return;
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
  useEffect(() => {
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

    const filteredData = filterPokedex(feedback[feedback.length - 1], Pokedex);
    setFilteredPokedex(filteredData);
    setFilteredInputList(filteredData);

    window.scrollTo(0, 0); // for mobile users
    setGuessInput("");
  }, [guessToCheck]);

  // CHECK FOR WIN, LOSS, OR ATTACK
  useEffect(() => {
    if (!guessToCheck) return;

    if (answer.name === guessToCheck) {
      renderGameWin();
      // gameState saved in below useEffect hook
    } else if (guessFeedback.length === 6) {
      renderGameLoss();
      // gameState saved in below useEffect hook
    } else if (guessFeedback.length > 0 && guessFeedback.length < 6) {
      renderAttack();
      saveGameStateToLocalStorage({
        guessFeedback: guessFeedback,
        pokemonTrainerMode: isPokemonTrainerMode,
        gymLeaderMode: isGymLeaderMode,
        eliteFourMode: isEliteFourMode,
        lastPlayed: Date.now(),
        winStatus: win,
        loseStatus: lose,
        gameOn: gameOn,
        spriteUrl: spriteUrl,
        solutionIndex: index,
      });
    }
  }, [guessFeedback]);

  // STORE GAMESTATE AFTER WIN OR LOSS
  useEffect(() => {
    if (!guessToCheck) return;
    saveGameStateToLocalStorage({
      guessFeedback: guessFeedback,
      pokemonTrainerMode: isPokemonTrainerMode,
      gymLeaderMode: isGymLeaderMode,
      eliteFourMode: isEliteFourMode,
      lastPlayed: Date.now(),
      winStatus: win,
      loseStatus: lose,
      gameOn: gameOn,
      spriteUrl: spriteUrl,
      solutionIndex: index,
    });
  }, [renderGameWin, renderGameLoss]);

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
        suggestionClicked={suggestionClicked}
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
      <Footer
        setIsSourcesModalOpen={setIsSourcesModalOpen}
        setIsBugReportModalOpen={setIsBugReportModalOpen}
        setIsDonateModalOpen={setIsDonateModalOpen}
      />
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
      <PokedexModal
        isOpen={isStatsPokedexModalOpen}
        handleClose={() => setIsStatsPokedexModalOpen(false)}
        filteredPokedex={filteredPokedex}
        stats={stats}
      />
      <DataSourcesModal isOpen={isSourcesModalOpen} handleClose={() => setIsSourcesModalOpen(false)} />
      <BugReportModal
        isOpen={isBugReportModalOpen}
        handleClose={() => setIsBugReportModalOpen(false)}
        setIsBugReportSuccess={setIsBugReportSuccess}
      />
      {isBugReportSuccess && <BugReportSuccessMessage />}
      <DonateModal isOpen={isDonateModalOpen} handleClose={() => setIsDonateModalOpen(false)} />
    </>
  );
}

export default App;
