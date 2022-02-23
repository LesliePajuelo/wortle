const Sprite = ({ pokemon }) => {
  return (
    <figure className="image is-64x64">
      <img className={pokemon.filtered ? "custom-sprite-filter" : ""} src={pokemon.spriteUrl} />
    </figure>
  );
};

export default Sprite;
