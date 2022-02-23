import Pic from "../img/mystery.jpg";
import pokeball from "../img/pokeball.png";
import GuessHeaders from "./GuessHeaders";
import ErrorMessage from "./ErrorMessage";
import Sprite from "./Sprite";
import Navbar from "./Navbar";
import Pokemon from "../components/Pokemon";
import GuessFeedback from "./GuessFeedback";
import RemainingGuesses from "./RemainingGuesses";
import GameOver from "./GameOver";
import pokedexTitle from "../img/pokedex-title.png";
import AnswerAttack from "./AnswerAttack";

import { useEffect, useRef } from "react";

function GameContainer(props) {
  const {
    setIsInfoModalOpen,
    setIsStatsModalOpen,
    setIsSettingsModalOpen,
    gameLoading,
    gameOn,
    setGameOn,
    pokedex,
    filteredList,
    showFilteredList,
    suggestionClicked,
    setSuggestionClicked,
    guessInput,
    setGuessInput,
    answer,
    setGuessToCheck,
    guessFeedback,
    win,
    lose,
    spriteUrl,
    errorMessage,
    isAnimation,
    answerAttack,
    showAnswerAttack,
  } = props;

  const guessNumber = [1, 2, 3, 4, 5, 6];

  const inputElement = useRef(null);

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

  useEffect(() => {
    if (!inputElement.current) return;
    inputElement.current.onfocus = () => {
      const inputEl = document.querySelector("[data-guess-input]");
      // window.scrollTo(0, 0);
      inputEl.scrollIntoView(false); // check this
      // inputEl.scrollTo
      // document.body.scrollTop = 0;
    };
  });

  return (
    <div className="container mt-4 is-flex is-justify-content-center custom-game-width">
      <div className="is-flex is-flex-direction-column">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />
        <div className="game mt-3">
          <div className="card custom-card-size">
            <div className={`card-image ${gameOn && "custom-card-image"}`}>
              {!gameOn && !win && !lose && (
                <div className="custom-start-img">
                  <button className="custom-start-text is-loading" onClick={handleStartGame}>
                    {gameLoading ? "Loading..." : "Game Start"}
                  </button>
                  <img className="" src={pokeball} alt="Placeholder image" onClick={handleStartGame} />
                </div>
              )}

              {(win || lose) && <img className="custom-sprite-img" src={spriteUrl} alt="Placeholder image" />}
              {gameOn ? (
                <div className="custom-sprite-gallery">
                  <div className="custom-pokedex-title">
                    <img className="custom-pokedex-title-img" src={pokedexTitle} />
                  </div>
                  <div className="custom-sprite-gallery-images">
                    {pokedex &&
                      pokedex.map((pokemon, index) => {
                        return <Sprite key={index} pokemon={pokemon} />;
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
                      {guessInput && guessInput.length > 0 && showFilteredList && (
                        <div className="card custom-search-filter">
                          <div className="card-content pt-1 pb-1">
                            <div className="content" data-filter-list>
                              {filteredList.map((pokeman, index) => {
                                return (
                                  <Pokemon
                                    key={index}
                                    index={index}
                                    pokeman={pokeman}
                                    setGuessInput={setGuessInput}
                                    suggestionClicked={suggestionClicked}
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
                          ref={inputElement}
                          className="input"
                          type="text"
                          placeholder={`Guess #${guessFeedback.length + 1}...`}
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

                  {showAnswerAttack && !win && <AnswerAttack answerAttack={answerAttack} />}
                  {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                  {(win || lose) && <GameOver answer={answer} win={win} lose={lose} isAnimation={isAnimation} />}
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
