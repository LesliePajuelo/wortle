export default function calculateStats(stats, pokemon, guessFeedback, winBoolean) {
  const statistics = { ...stats };
  if (winBoolean) {
    statistics.gamesPlayed += 1;
    statistics.gamesWon += 1;
    statistics.currentStreak += 1;
    statistics.guesses[guessFeedback.length] += 1;
    statistics.winPercentage = Math.round((statistics.gamesWon / statistics.gamesPlayed) * 100);

    // TODO: could use reduce here instead
    let sumGuesses = 0;
    for (const [key, value] of Object.entries(statistics.guesses)) {
      if (key !== "fail") {
        sumGuesses += parseInt(key) * value;
      }
    }
    statistics.averageGuesses = Math.round(sumGuesses / statistics.gamesWon);
    if (statistics.currentStreak > statistics.maxStreak) {
      statistics.maxStreak += 1;
    }

    if (!statistics.pokemonCaught.includes(pokemon)) {
      statistics.pokemonCaught.push(pokemon);
    }

    // Boulder Badge
    if (statistics.gamesPlayed > 4) {
      statistics.badges["Boulder Badge"] = true;
    }

    // Cascade Badge
    if (statistics.maxStreak > 9) {
      statistics.badges["Cascade Badge"] = true;
    }

    // Thunder Badge
    if (statistics.pokemonCaught.length > 19) {
      statistics.badges["Thunder Badge"] = true;
    }

    // Rainbow Badge
    const threeAndFewerGuesses = statistics.guesses["1"] + statistics.guesses["2"] + statistics.guesses["3"];
    console.log(threeAndFewerGuesses);
    if (threeAndFewerGuesses > 9) {
      statistics.badges["Rainbow Badge"] = true;
    }

    // Soul Badge
    // Marsh Badge
    // Volcano Badge

    // Earth Badge
    const moltres = statistics.pokemonCaught.includes("moltres");
    const zapdos = statistics.pokemonCaught.includes("zapdos");
    const articuno = statistics.pokemonCaught.includes("articuno");
    if (moltres && zapdos && articuno) {
      statistics.badges["Earth Badge"] = true;
    }
  } else {
    // loss state here
    statistics.gamesPlayed += 1;
    statistics.currentStreak = 0;
    statistics.guesses.fail += 1;
    statistics.winPercentage = Math.round((statistics.gamesWon / statistics.gamesPlayed) * 100);
  }
  return statistics;
}
