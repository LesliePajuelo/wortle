function Characteristics({ pokemon }) {
  return (
    <>
      {pokemon && (
        <div className="content">
          <p>{`name: ${pokemon.data.name}`}</p>

          <p>{`id: ${pokemon.data.id}`}</p>
          {pokemon.data.types.map((item, index) => {
            return <p key={index}>{`Type slot ${item.slot}: ${item.type.name}`}</p>;
          })}
          <p>{`height: ${pokemon.data.height}`}</p>
          <p>{`weight: ${pokemon.data.weight}`}</p>
          {pokemon.data.stats.map((stat, index) => {
            return <p key={index}>{`${stat.stat.name}: ${stat.base_stat}`}</p>;
          })}
        </div>
      )}
    </>
  );
}

export default Characteristics;
