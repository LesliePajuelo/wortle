const Footer = ({ setIsSourcesModalOpen }) => {
  return (
    <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center mt-3 pb-5">
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
        <a className="has-text-white is-underlined" onClick={() => setIsSourcesModalOpen(true)}>
          sources
        </a>
      </p>
      <p className="has-text-white is-size-7 has-text-centered pt-3 pl-3 pr-3">
        <span>Suggestions for improvements/changes are very welcome at this </span>
        <a
          className="has-text-white is-underlined"
          href="https://www.reddit.com/r/pokemon/comments/t1htd3/sqwordle_wordle_for_pokémon/?utm_source=share&utm_medium=web2x&context=3"
          target="_blank"
        >
          Reddit Post
        </a>
        <span> or </span>
        <a
          className="has-text-white is-underlined"
          href="https://twitter.com/nmfretz/status/1497327845298737152?s=20&t=45kgJ03lkPjIBP77t_qLfg"
          target="_blank"
        >
          Twitter Thread
        </a>
      </p>
    </div>
  );
};

export default Footer;
