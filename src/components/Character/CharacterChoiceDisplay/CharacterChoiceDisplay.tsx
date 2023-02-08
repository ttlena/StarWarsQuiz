import React, { useContext, useState } from "react";
import css from "./CharacterChoiceDisplay.module.css";
import { CharacterContext } from "../../../context/CharacterContext";
import { Character } from "../CharacterPicture/CharacterPicture";


export const CharacterChoiceDisplay= () => {
  const { charChoiceHandlerNext, charChoiceHandlerPrev, returnCharacter } = useContext(CharacterContext);
  
  const [toggleChar, setToggleChar] = useState(false);

  

  return (
    <div className={css.choosechar}>
      <div
        className={css.arrowleft}
        onClick={() => charChoiceHandlerPrev()}
      ></div>
      <div
        className={`${css.characterDisplay} ${
          toggleChar ? css.characterDisplayToggle : css.characterDisplay
        }`}
        
      >
        <Character
          swapi_id={returnCharacter().swapi_id}
          name={returnCharacter().name}
          img_path={returnCharacter().img_path}
        />
      </div>
      <div
        className={css.arrowright}
        onClick={() => charChoiceHandlerNext()}
      ></div>
    </div>
  );
};