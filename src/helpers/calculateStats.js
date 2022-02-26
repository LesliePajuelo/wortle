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
  } else {
    // loss state here
    statistics.gamesPlayed += 1;
    statistics.currentStreak = 0;
    statistics.guesses.fail += 1;
    statistics.winPercentage = Math.round((statistics.gamesWon / statistics.gamesPlayed) * 100);
  }
  return statistics;
}
