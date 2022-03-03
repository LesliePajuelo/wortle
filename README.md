# Sqwordle - Wordle for Pokémon!

A daily Pokémon guessing game, inspired by the popular game [Wordle](https://www.nytimes.com/games/wordle/index.html) by [Josh Wardle](https://twitter.com/powerlanguish).

Currently deployed at https://www.sqwordle.io/.

<kbd>
<img src="https://user-images.githubusercontent.com/85373263/155868537-6cd25c35-3364-41fc-81d3-30384f2a3d3e.png"/>
</kbd>

### Features & Design

- React Framework for frontend build.
- Bulma.io CSS framework + custom CSS
- Responsive design
- [react-countdown](https://www.npmjs.com/package/react-countdown) for countdown clock
- [PokéApi](https://pokeapi.co/) for Pokémon data

  <br />

- Guess the mystery Pokémon in 6 tries.
- Each guess must be a valid Gen 1 Pokémon.
- After each guess, you are provided with feedback to show how close your guess is to the mystery Pokémon.
- Instead of feedback on spelling like in Wordle, you get feedback based on your guess's Type, Evolution Tree, Attack, Defense, Height, and Weight relative to the mystery Pokémon.
- The mystery Pokémon will attack you after each guess, giving you an additional clue as to who it is.
- There are 3 difficulty modes. For example, Gym Leader mode disables the mystery Pokémon attacks.
- Your stats are shown and you can share your results, like in Wordle. When you share results, a random Trainer quote is included from Red/Blue (e.g, "Hi! I like shorts! They're comfy and easy to wear!" -Youngster).
- There is a Safari Zone where you can play unlimited Sqwordle, but your activity doesn't contribute to your stats.

### TODOS

- [ ] make default difficulty mode harder. Consider filtering attacks unique to one Pokémon and/or only attacking on certain guesses.
- [ ] error handling for case where user inputs the same guess twice.
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

Currently deployed to https://www.sqwordle.io/

Build for production with `npm run build`. Deploy the `build` folder.

# Screenshots

<kbd>
<img src="https://user-images.githubusercontent.com/85373263/155868537-6cd25c35-3364-41fc-81d3-30384f2a3d3e.png"/>
</kbd>
<br />
<br />
<kbd>
<img src="https://user-images.githubusercontent.com/85373263/155868672-827a551b-dd62-404a-821f-2baf930ea1db.png"/>
</kbd>
<br />
<br />
<kbd>
<img src="https://user-images.githubusercontent.com/85373263/155868697-e89d2bd6-1ad4-48fe-af62-b3d6e8740e7e.png"/>
</kbd>
<br />
<br />
<kbd>
<img src="https://user-images.githubusercontent.com/85373263/156083562-8ec68a38-daf6-467a-8fbe-b6f6ad2976e2.png"/>
</kbd>
<br />
<br />
<kbd>
<img src="https://user-images.githubusercontent.com/85373263/155868979-ab65218f-3af7-4c7c-ada7-d80b57f30de2.png"/>
</kbd>
