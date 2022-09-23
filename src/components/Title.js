import squirtle from "../img/squirtle_official.png";
import title from "../img/title-6.png";

function Title({ gameOn, win, lose }) {
  return (
    <>
      <nav
        className={`navbar has-background-black-bis has-text-white is-flex is-justify-content-center is-align-items-center custom-title ${
          gameOn || win || lose ? "custom-title-game-on-mobile" : ""
        }`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="is-flex is-align-items-center">
          <figure className="image custom-squirtle-image-left">
            <img className="" src={squirtle} />
            {/* <img
              className=""
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
            /> */}
          </figure>
          <img
            className={`custom-title-img ${gameOn || win || lose ? "custom-title-img-game-on-mobile" : ""}`}
            src={title}
          />
          <figure className="image custom-squirtle-image-right">
            <img className="" src={squirtle} />
            {/* <img
              className=""
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
            /> */}
          </figure>
        </div>
      </nav>
    </>
  );
}

export default Title;
