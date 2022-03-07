import { useTranslation } from "react-i18next";
import { answer } from "../../lib/generateAnswer";

import Pic from "../../img/mystery.jpg";
import pokeball from "../../img/pokeball-2.png";
import pokedexTitle from "../../img/pokedex-title.png";
import GuessHeaders from "./GuessHeaders";
import ErrorMessage from "../alerts/ErrorMessage";
import Sprite from "./Sprite";
import Navbar from "../Navbar";
import Pokemon from "./Pokemon";
import GuessFeedback from "./GuessFeedback";
import RemainingGuesses from "./RemainingGuesses";
import GameOver from "../alerts/GameOver";
import AnswerAttack from "../alerts/AnswerAttack";

function GameContainer(props) {
  const {
    showLanguageSelector,
    setShowLanguageSelector,
    handleChangeLanguage,
    currentLanguageCode,
    setIsInfoModalOpen,
    setIsStatsModalOpen,
    setIsSettingsModalOpen,
    gameLoading,
    gameOn,
    setGameOn,
    filteredPokedex,
    filteredInputList,
    showFilteredInputList,
    setSuggestionClicked,
    guessInput,
    setGuessInput,
    setGuessToCheck,
    guessFeedback,
    win,
    lose,
    spriteUrl,
    errorMessage,
    isAnimation,
    answerAttack,
    showAnswerAttack,
    isGymLeaderMode,
    isEliteFourMode,
  } = props;

  const { t } = useTranslation();

  const guessNumber = [1, 2, 3, 4, 5, 6];

  function handleStartGame() {
    if (gameLoading) return;
    setGameOn(true);
  }

  function handleGuessInput(e) {
    setSuggestionClicked(false);
    setGuessInput(e.target.value);
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      handleGuess();
    }
  }

  function handleUpKey(e) {
    if (e.keyCode !== 38) return;
    if (e.target.value === "") return;
    const filterListEl = document.querySelector("[data-filter-list]").lastElementChild;
    filterListEl.focus();
  }

  function handleGuess() {
    const input = guessInput;
    const sanitizedInput = input.trim().toLowerCase();
    setGuessToCheck(sanitizedInput);
  }

  return (
    <div className="container mt-4 is-flex is-justify-content-center">
      <div className="is-flex is-flex-direction-column">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          showLanguageSelector={showLanguageSelector}
          setShowLanguageSelector={setShowLanguageSelector}
          handleChangeLanguage={handleChangeLanguage}
          currentLanguageCode={currentLanguageCode}
        />
        <div className="game mt-3">
          <div className="card custom-card-size">
            <div className={`card-image ${gameOn && "custom-card-image"}`}>
              {!gameOn && !win && !lose && (
                <div className="custom-start-img">
                  <button className="custom-start-text is-loading" onClick={handleStartGame}>
                    {gameLoading ? t("gameLoading") : t("gameStart")}
                  </button>
                  <img className="" src={pokeball} alt="Placeholder image" onClick={handleStartGame} />
                </div>
              )}

              {(win || lose) && <img className="custom-sprite-img" src={spriteUrl} alt="Placeholder image" />}
              {gameOn && !isEliteFourMode ? (
                <div className="custom-sprite-gallery">
                  <div className="custom-pokedex-title">
                    <img className="custom-pokedex-title-img" src={pokedexTitle} />
                  </div>
                  <div className="custom-sprite-gallery-images">
                    {filteredPokedex.map((pokemon, index) => {
                      return (
                        <Sprite
                          key={index}
                          pokemon={pokemon}
                          setGuessInput={setGuessInput}
                          setSuggestionClicked={setSuggestionClicked}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <figure className="image is-16by9">
                  <img src={Pic} alt="Placeholder image" />
                </figure>
              )}
            </div>
            {(gameOn || win || lose) && (
              <div className="card-content custom-input-area">
                <div className="content">
                  <GuessHeaders guessFeedback={guessFeedback} />

                  {/* Guess feeback */}
                  {guessFeedback &&
                    guessFeedback.map((guess, index) => {
                      return <GuessFeedback key={index} guess={guess} />;
                    })}

                  {/* button */}
                  {gameOn && (
                    <div className="custom-input-container mb-1">
                      {guessInput && guessInput.length > 0 && showFilteredInputList && (
                        <div className="card custom-search-filter">
                          <div className="card-content pt-1 pb-1">
                            <div className="content" data-filter-list>
                              {filteredInputList.map((pokeman, index) => {
                                return (
                                  <Pokemon
                                    key={index}
                                    pokeman={pokeman}
                                    setGuessInput={setGuessInput}
                                    setSuggestionClicked={setSuggestionClicked}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="custom-input">
                        <input
                          className="input"
                          type="text"
                          placeholder={`${t("guessPlaceholderText")}${guessFeedback.length + 1}...`}
                          value={guessInput}
                          onChange={handleGuessInput}
                          onKeyPress={handleEnterKey}
                          onKeyDown={handleUpKey}
                          data-guess-input
                        />
                        <button
                          className={`button is-flex is-justify-content-center custom-start-btn`}
                          onClick={handleGuess}
                        >
                          <img className="custom-pokeball" src={pokeball} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* remaining guesses */}
                  {guessNumber.map((num) => {
                    if (num > guessFeedback.length + 1) return <RemainingGuesses key={num} num={num} />;
                  })}

                  {showAnswerAttack && !win && !isGymLeaderMode && !isEliteFourMode && (
                    <AnswerAttack answerAttack={answerAttack} />
                  )}
                  {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                  {(win || lose) && <GameOver win={win} lose={lose} isAnimation={isAnimation} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameContainer;
