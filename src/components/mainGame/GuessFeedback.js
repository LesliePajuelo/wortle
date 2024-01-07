import { t } from "i18next";
import bug from "../../img/icons/bug.svg"
import dark from "../../img/icons/dark.svg"
import dragon from "../../img/icons/dragon.svg"
import electric from "../../img/icons/electric.svg"
import fairy from "../../img/icons/fairy.svg"
import fighting from "../../img/icons/fighting.svg"
import fire from "../../img/icons/fire.svg"
import flying from "../../img/icons/flying.svg"
import ghost from "../../img/icons/ghost.svg"
import grass from "../../img/icons/grass.svg"
import ground from "../../img/icons/ground.svg"
import ice from "../../img/icons/ice.svg"
import normal from "../../img/icons/normal.svg"
import poison from "../../img/icons/poison.svg"
import psychic from "../../img/icons/psychic.svg"
import rock from "../../img/icons/rock.svg"
import steel from "../../img/icons/steel.svg"
import water from "../../img/icons/water.svg"



function GuessFeedback({ guess }) {
function pullSVG(type){
  if(type === "bug"){
    return bug;
  }
  if(type === "dark"){
    return dark;
  }
  if(type === "dragon"){
    return dragon;
  }
  if(type === "electric"){
    return electric;
  }
  if(type === "fairy"){
    return fairy;
  }
  if(type === "fighting"){
    return fighting;
  }
  if(type === "fire"){
    return fire;
  }
  if(type === "flying"){
    return flying;
  }
  if(type === "ghost"){
    return ghost;
  }
  if(type === "grass"){
    return grass;
  }
  if(type === "ground"){
    return ground;
  }
  if(type === "ice"){
    return ice;
  }
  if(type === "normal"){
    return normal;
  }
  if(type === "poison"){
    return poison;
  }
  
  if(type === "psychic"){
    return psychic;
  }
  
  if(type === "rock"){
    return rock;
  }
  
  if(type === "steel"){
    return steel;
  }
  
  if(type === "water"){
    return water;
  }

  
  
}
  function replaceSVG(guess){


    return guess.types.map((type, index) => {
 

      return (
       
        <span className={`badges has-text-${type.colour} custom-type-text icon ${type.type}`} key={index}>
          {/* {t(`types.${type.type}`)} */}
          {index < guess.types.length - 1 ? " " : " "}
          {/* {type.colour} */}
          <img className={`badges`} src= {pullSVG(type.type,type.colour )}></img>
        </span>
      );
    })
  }
  // styles and formatting here
  return (
    <>
      <div className="columns is-mobile is-centered is-vcentered custom-guess-text">
        <div className="column pt-1 pb-1 has-text-centered custom-border is-3">
          <span className={`has-text-${guess.evolutionCheck}`}>{guess.name.toUpperCase()}</span>
        </div>

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border is-2 is-3-mobile">
          {replaceSVG(guess)}
        </div>

        <div
          className={`column pt-1 pb-1 has-text-${guess.numEvolutionCheck} has-text-centered custom-border is-2-mobile`}
        >
          {guess.numEvolutionCheck === 'success'? '✅' : '✗' }
        </div>
        {/* <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.attackCheck}`}</div> */}
        {/* <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.defenseCheck}`}</div> */}

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.heightCheck}`}</div>

        <div className="column pt-1 pb-1 has-text-black has-text-centered custom-border">{`${guess.weightCheck}`}</div>
      </div>
    </>
  );
}

export default GuessFeedback;
