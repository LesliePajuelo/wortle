import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash"; // handles edge cases and is more performant than JSON.parse(JSON.stringify(obj))

import { useAuth } from "../contexts/AuthContext";

import PokedexModal from "./modals/PokedexModal";

import Pokedex from "../constants/pokedex.json";
import AnswerKey from "../constants/answerKey.json";
import Title from "./Title";
import GameContainer from "./mainGame/GameContainer";
import Footer from "./Footer";
import InstructionsModal from "./modals/InstructionsModal";
import StatsModal from "./modals/statsModal/StatsModal";
import SettingsModal from "./modals/SettingsModal";
import DataSourcesModal from "./modals/DataSourcesModal";
import BugReportModal from "./modals/bugReportModal/BugReportModal";
import filterPokemonInput from "../lib/filterPokemonInput";
import generateFeedback from "../lib/generateFeedback";
import filterPokedex from "../lib/filterPokedex";
import calculateStats, { loadStats } from "../lib/calculateStats";
// import { generateDailyAnswer, index } from "../lib/generateDailyAnswer";
import { generateSafariZoneAnswer } from "../lib/generateSafariZoneAnswer";

import {
  loadLanguagePreferenceFromLocalStorage,
  saveStatsToLocalStorage,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadStatsFromLocalStorage,
  loadWelcomeModalSeenFromLocalStorage,
  saveWelcomeModalSeenToLocalStorage,
} from "../lib/localStorage";
import delay from "../lib/delay";
import { FLIP_DURATION_GAME_OVER, STATS_MODAL_DELAY, ATTACK_DELAY, INFO_MODAL_DELAY } from "../constants/settings";
import BugReportSuccessMessage from "./modals/bugReportModal/BugReportSuccessMessage";
import DonateModal from "./modals/DonateModal";
import { updateLanguagePreference, updateUserGameState, updateUserStats } from "../lib/firebaseFunctions";
import ProfileModal from "./modals/ProfileModal";
import EvcModal from "./modals/EvcModal";

function MainGame() {
  const { t, i18n } = useTranslation();

  const [showSpinner, setShowSpinner] = useState(true);

  const { user, loading, documentData, documentLoading, documentError, logout } = useAuth();
  const isDocumentDataLoaded = useRef(false);

  // TODO - refactor these using bootstrap pattern
  const [isAnswer, setAnswer] = useState({
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "stats": { "hp": 45, "attack": 49, "defense": 49, "special-attack": 65, "special-defense": 65, "speed": 45 },
    "types": ["grass", "poison"],
    "moves": [
      "vine-whip",
      "tackle",
      "growl",
      "leech-seed",
      "growth",
      "razor-leaf",
      "solar-beam",
      "poison-powder",
      "sleep-powder"
    ],
    "evolutions": { "chainId": 1, "pokemonInChain": ["bulbasaur", "ivysaur", "venusaur"], "numberOfPokemonInChain": 3 },
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "animatedSpriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
    "filtered": false
  })
  const [index, setIndex] = useState(1);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isEvcModalOpen, setIsEvcModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isStatsPokedexModalOpen, setIsStatsPokedexModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [isBugReportModalOpen, setIsBugReportModalOpen] = useState(false);
  const [isBugReportSuccess, setIsBugReportSuccess] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [whichRegion, setWhichRegion] = useState("kanto");

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

  const [filteredPokedex, setFilteredPokedex] = useState(cloneDeep(Pokedex));
  const [filteredInputList, setFilteredInputList] = useState(cloneDeep(Pokedex));
  const [showFilteredInputList, setShowFilteredInputList] = useState(false);

  const [answerAttack, setAnswerAttack] = useState(null);
  const [showAnswerAttack, setShowAnswerAttack] = useState(false);

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [stats, setStats] = useState(loadStats()); // useEffect below deals with authenticated user database

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
      let filteredPokemon = cloneDeep(Pokedex);
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
    if (user) {
      // write to database
      updateLanguagePreference(user, language);
    }
    i18n.changeLanguage(language);
    setShowLanguageSelector(!showLanguageSelector);
    setCurrentLanguageCode(language);
  }

  function renderGameWin() {
    // setSpriteUrl(answer.spriteUrl);
    setSpriteUrl(isAnswer.animatedSpriteUrl);
    const updatedStats = calculateStats(stats, isAnswer.name, guessFeedback, true);
    setStats(updatedStats);
    setWin(true);
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
    // setSpriteUrl(answer.spriteUrl);
    setSpriteUrl(isAnswer.animatedSpriteUrl);
    const updatedStats = calculateStats(stats, isAnswer.name, guessFeedback, false);
    setStats(updatedStats);
    setLose(true);
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
    if (!isPokemonTrainerMode) return; // guard clause to not render attack or wait time on harder modes
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

    (async () => {
      // loader to allow some time for database vs local storage for better user experience
      await delay(2000);
      setShowSpinner(false);
      // show welcome modal to new user
      if (!loadWelcomeModalSeenFromLocalStorage()) {
        await delay(1000);
        setIsInfoModalOpen(true);
        saveWelcomeModalSeenToLocalStorage();
      }
      setGameLoading(false);
    })();
  }, []);

  // LOAD STATE FROM FIRESTORE THE FIRST TIME DOCUMENTDATA IS NOT NULL
  useEffect(() => {
    if (!documentData) return;
    if (isDocumentDataLoaded.current === false) {
      // guard to only run on first documentData load
      // console.log(user);
      // console.log(documentData.data());
      setTimeout(() => {
        setIsInfoModalOpen(false);
      }, INFO_MODAL_DELAY);

      // language preference
      i18n.changeLanguage(documentData.data().languagePref);
      setCurrentLanguageCode(documentData.data().languagePref);

      // stats
      setStats(documentData.data().stats);

      const gameState = documentData.data().gameState;
      let userFeedback = [];
      // if (gameState && !gameState.guessFeedback && gameState.solutionIndex === index) {
      if(false){  
      console.log("reloading guessFeedback from database");
        // restore  game state
        userFeedback = gameState.guessFeedback;
        let filteredPokemon = cloneDeep(Pokedex);
        for (const feedback of gameState.guessFeedback) {
          filteredPokemon = filterPokedex(feedback, filteredPokemon);
        }
        setFilteredPokedex(filteredPokemon);
        setFilteredInputList(filteredPokemon);

        setWin(gameState.winStatus);
        setLose(gameState.loseStatus);
        setSpriteUrl(gameState.spriteUrl);
        setGameOn(gameState.gameOn);
      } else {
        console.log("resetting all guess feedback");
        //reset everything
        setFilteredPokedex(cloneDeep(Pokedex));
        setFilteredInputList(cloneDeep(Pokedex));

        setWin(false);
        setLose(false);
        setSpriteUrl(null);
        setGameOn(false);
      }

      setGuessFeedback(userFeedback);

      isDocumentDataLoaded.current = true;
    }
  }, [documentData]);

  // STORE STATS WHEN UPDATED
  useEffect(() => {
    if (user) {
      if (!documentData) return; // prevents stats being overwritten with localstorage on initial login
      updateUserStats(user, stats);
    } else {
      saveStatsToLocalStorage(stats);
    }
  }, [stats]);

  // FILTER INPUT SUGGESTIONS WHEN TYPING IN GUESS INPUT FIELD
  useEffect(() => {
    if (guessInput === "") return;
    const tempFilteredList = filterPokemonInput(filteredPokedex, guessInput);
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

    console.log("call generateFeedback", 1, guessedPokemon, 2, isAnswer, 4, guessFeedback)
    const feedback = generateFeedback(guessedPokemon, isAnswer, guessFeedback);
    setGuessFeedback(feedback);

    const filteredData = filterPokedex(feedback[feedback.length - 1], cloneDeep(filteredPokedex));
    setFilteredPokedex(filteredData);
    setFilteredInputList(filteredData);

    window.scrollTo(0, 0); // for mobile users
    setGuessInput("");
  }, [guessToCheck]);

  // CHECK FOR WIN, LOSS, OR ATTACK
  useEffect(() => {
    if (!guessToCheck) return;

    if (isAnswer.name === guessToCheck) {
      // gameState saved in below useEffect hook
      renderGameWin();
    } else if (guessFeedback.length === 6) {
      // gameState saved in below useEffect hook
      renderGameLoss();
    } else if (guessFeedback.length > 0 && guessFeedback.length < 6) {
      renderAttack();
      const updatedGameState = {
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
      };
      if (user) {
        updateUserGameState(user, { ...updatedGameState });
      } else {
        saveGameStateToLocalStorage({ ...updatedGameState });
      }
    }
    // allow users to guess the same pokemon twice
    setGuessToCheck(null);
  }, [guessFeedback]);

  // STORE GAMESTATE AFTER WIN OR LOSS
  useEffect(() => {
    if (!guessToCheck) return;
    const updatedGameState = {
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
    };
    if (user) {
      updateUserGameState(user, { ...updatedGameState });
    } else {
      saveGameStateToLocalStorage({ ...updatedGameState });
    }
  }, [win, lose]);

  return (
    <>
      {showSpinner ? (
        <div className="ball"></div>
      ) : (
        <>
          <Title gameOn={gameOn} win={win} lose={lose} />
          <GameContainer
            showLanguageSelector={showLanguageSelector}
            setShowLanguageSelector={setShowLanguageSelector}
            handleChangeLanguage={handleChangeLanguage}
            currentLanguageCode={currentLanguageCode}
            setIsInfoModalOpen={setIsInfoModalOpen}
            setIsEvcModalOpen={setIsEvcModalOpen}
            setIsStatsModalOpen={setIsStatsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            setIsProfileModalOpen={setIsProfileModalOpen}
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
            whichRegion={whichRegion}
            setWhichRegion={setWhichRegion}
            isAnswer={isAnswer}
            setAnswer={setAnswer}
            index={index}
            setIndex={setIndex}
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
          <EvcModal isOpen={isEvcModalOpen} handleClose={() => setIsEvcModalOpen(false)} />
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
          <ProfileModal
            isOpen={isProfileModalOpen}
            handleClose={() => setIsProfileModalOpen(false)}
            showLanguageSelector={showLanguageSelector}
            setShowLanguageSelector={setShowLanguageSelector}
            handleChangeLanguage={handleChangeLanguage}
            currentLanguageCode={currentLanguageCode}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            setIsStatsPokedexModalOpen={setIsStatsPokedexModalOpen}
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
          {/* <DonateModal isOpen={isDonateModalOpen} handleClose={() => setIsDonateModalOpen(false)} /> */}
        </>
      )}
    </>
  );
}

export default MainGame;
