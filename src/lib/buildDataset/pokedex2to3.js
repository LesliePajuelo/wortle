const fs = require('fs');

function transformObject(obj) {
    const idRegex = /\/(\d+)\.png$/;
    const match = obj.spriteUrl.match(idRegex);
    const id = match ? parseInt(match[1], 10) : null;
    const evolutions = Array.isArray(obj.evolutions) ? obj.evolutions : [];
    return {
            "id": id,
            "name": obj.name,
            "height": obj.height,
            "weight": obj.weight,
            "stats": obj.stats.reduce((acc, item) => {
                acc[item.stat.name] = item.base_stat;
                return acc;
            }, {}),
            "types": obj.types.map(item => item.type.name),
            "moves": obj.moves.map(item => item.move),
            "evolutions": { "chainId": 78, "pokemonInChain": evolutions, "numberOfPokemonInChain": evolutions?.length },
            "spriteUrl": obj.spriteUrl,
            "animatedSpriteUrl": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
            "filtered": obj.filtered
    };
}

fs.readFile('pokedex2.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the JSON data and transform each object
    const dataArray = JSON.parse(data);
    const transformedData = dataArray.map(transformObject);

    // Write the transformed array to poke3.json
    fs.writeFile('pokedex3.json', JSON.stringify(transformedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Transformed data written to poke3.json');
        }
    });
});
