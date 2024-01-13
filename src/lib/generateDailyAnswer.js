import AnswerKey from "../constants/answerKey.json";
import Pokedex from "../constants/pokedex.json";
import { MILLISECONDS_TO_DAYS } from "../constants/settings";
import regions from "../constants/regions";

// export function generateDailyAnswer() {
//   function generateRandomDate(from, to) {
//     return new Date(
//       from.getTime() +
//         Math.random() * (to.getTime() - from.getTime()),
//     );
//   }
  
//   // const sqwordleStartDate = new Date(2022, 1, 21);
//   const sqwordleStartDate = generateRandomDate(new Date(2023, 0, 1), new Date());
//   const msOffset = Date.now() - sqwordleStartDate;
//   const dayOffset = msOffset / MILLISECONDS_TO_DAYS;
//   const index = Math.floor(dayOffset);

//   const tomorrow = sqwordleStartDate.valueOf() + (index + 1) * MILLISECONDS_TO_DAYS;
//   const answerName = AnswerKey[index].answer;
//   const answer = Pokedex.find((pokemon) => pokemon.name === answerName);
//   return { answer, index, tomorrow };
// }

export function generateDailyAnswer(region) {
  function generateRandomDate(from, to) {
    return new Date(
      from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
  }
  
  // const sqwordleStartDate = new Date(2022, 1, 21);
  const sqwordleStartDate = generateRandomDate(new Date(2023, 0, 1), new Date());
  const msOffset = Date.now() - sqwordleStartDate;
  const dayOffset = msOffset / MILLISECONDS_TO_DAYS;
  const POKEMON_ID_START = regions[region]?.start || 1;
  const POKEMON_ID_END = regions[region]?.end || 151;


  const randomNumber = Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START) + POKEMON_ID_START);

  const answer =Pokedex[randomNumber];
  const index = answer.id;

  const tomorrow = sqwordleStartDate.valueOf() + (index + 1) * MILLISECONDS_TO_DAYS;
  const answerName = AnswerKey[index].answer;
  console.log('answer', answer)
  return { answer, index, tomorrow };
}

// export const { answer, index, tomorrow } = generateDailyAnswer(region);
