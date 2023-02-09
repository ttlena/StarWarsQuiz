import React, { useContext, useState } from "react";
import css from "./CharacterChoiceDisplay.module.css";
import { CharacterStylingContext } from "../../../context/CharacterStylingContext";
import { CharacterPicture } from "../CharacterPicture/CharacterPicture";


export const CharacterChoiceDisplay= () => {
  const { charChoiceHandlerNext, charChoiceHandlerPrev, returnCharacter } = useContext(CharacterStylingContext);
  
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
        <CharacterPicture
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
