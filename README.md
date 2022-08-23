# Sqwordle - Wordle for Pokémon!

https://www.sqwordle.io<br />
A daily Pokémon guessing game, inspired by the popular game [Wordle](https://www.nytimes.com/games/wordle/index.html) by [Josh Wardle](https://twitter.com/powerlanguish).

<img src="https://user-images.githubusercontent.com/85373263/157137604-0b153d73-a46f-4a78-9d97-defc37c9ac2a.png" width="50%"/>

### Features & Design

- React Framework for frontend build.
- User statistics, badge achievements, and daily game state persist in local storage.
- Bulma.io CSS framework + custom CSS (responsive design).
- [PokéApi](https://pokeapi.co/) for Pokémon data
- [react-i18next](https://react.i18next.com/) internationalization framework used to manage multiple language translations.

#### Gameplay

- Guess the mystery Pokémon in 6 tries.
- Each guess must be a valid Gen 1 Pokémon.
- After each guess, you are provided with feedback to show how close your guess is to the mystery Pokémon.
- Instead of feedback on spelling like in Wordle, you get feedback based on your guess's Type, Evolution Tree, Attack, Defense, Height, and Weight relative to the mystery Pokémon.
- The mystery Pokémon will attack you after each guess, giving you an additional clue as to who it is.
- There are 3 difficulty modes. For example, Gym Leader mode disables the mystery Pokémon attacks.
- Your stats are shown and you can share your results, like in Wordle. When you share results, a random Trainer quote is included from Red/Blue (e.g, "Hi! I like shorts! They're comfy and easy to wear!" -Youngster).
- There is a Safari Zone where you can play unlimited Sqwordle, but your activity doesn't contribute to your stats.

### TODOS

- [x] add firebase user authentication and cloud firestore option to prevent users from losing data when browser memory is cleared.
- [x] add react router
- [x] make default difficulty mode harder. Consider filtering attacks unique to one Pokémon and/or only attacking on certain guesses.
- [x] refactor code for react-18next and add Spanish.
- [x] clean up mobile response issues for Spanish (share button too large on spanish mobile).
- [ ] refactor some useEffects into functions
- [ ] add error message for case where user inputs the same guess twice in a row.
- [ ] implement better user experience for input field focus on mobile.

# Setup

Run `npm install`

# Development

Generate Pokédex:

```
cd src/helpers
node downloadPokedexJson.js
```

Generate Answer Key:

```
cd src/helpers
node generatateAnswerKey.js
```

Start with react-app by running `npm run start`

# Deployment

Currently deployed to https://www.sqwordle.io

Build for production with `npm run build`. Deploy the `build` folder.

# Screenshots

<img src="https://user-images.githubusercontent.com/85373263/157137613-4c17ef64-67ec-4849-bc62-0ef33a3bed34.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137612-5605e5e5-44ac-455a-8149-76c7b1a4310d.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137614-69d6c5ff-8c15-41b9-a06a-8186b3219857.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137603-38d0e91a-a2a5-4c9e-b92a-ab7d1ce7ae51.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137604-0b153d73-a46f-4a78-9d97-defc37c9ac2a.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137607-ac437498-22d3-47a5-a5f5-2a0830e7ea16.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137609-4d08735e-c67b-4a93-bf22-187080d0243b.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137611-97279782-74d7-4cc4-89d7-9ff9e60c4eae.png" width="40%"/>
<br />
<img src="https://user-images.githubusercontent.com/85373263/157137601-9f6cc5ae-cb89-4c3c-8f78-005f08c92278.png" width="40%"/>
