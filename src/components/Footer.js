const Footer = () => {
  return (
    <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center mt-3">
      <p className="has-text-white pb-3">
        <span>Created by </span>
        <a className="has-text-white is-underlined" href="https://www.nathanfretz.me/" target="_blank">
          Nathan Fretz
        </a>
      </p>
      <p className="has-text-white is-size-7">
        <span>Inspired by </span>
        <a
          className="has-text-white is-underlined"
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
        >
          Wordle
        </a>
        <span> (created by </span>
        <a className="has-text-white is-underlined" href="https://twitter.com/powerlanguish" target="_blank">
          Josh Wardle
        </a>
        <span>)</span>
      </p>
      <p className="has-text-white is-size-7">
        <span>Pokémon data from </span>
        <a className="has-text-white is-underlined" href="https://pokeapi.co/" target="_blank">
          PokéApi
        </a>
      </p>
    </div>
  );
};

export default Footer;
