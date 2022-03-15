import AnswerKey from "../constants/answerKey.json";
import Pokedex from "../constants/pokedex.json";
import { MILLISECONDS_TO_DAYS } from "../constants/settings";

function generateAnswer() {
  const sqwordleStartDate = new Date(2022, 1, 21);
  const msOffset = Date.now() - sqwordleStartDate;
  const dayOffset = msOffset / MILLISECONDS_TO_DAYS;
  const index = Math.floor(dayOffset);
  const tomorrow = sqwordleStartDate.valueOf() + (index + 1) * MILLISECONDS_TO_DAYS;
  const answerName = AnswerKey[index].answer;
  const answer = Pokedex.find((pokemon) => pokemon.name === answerName);
  return { answer, index, tomorrow };
}

export const { answer, index, tomorrow } = generateAnswer();
