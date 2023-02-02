import React, { useContext } from 'react'
import { CharacterContext } from '../../context/CharacterContext'
import {side} from "../../typings/ESide"
import css from "./SideChoice.module.css";

interface SideProps{
    side:side
    logopath:string
    className:string
}



export const ChooseSide = ({side,logopath,className}:SideProps) => {

  let choosenSide = side

  const {setFilterList} = useContext(CharacterContext);

  function filterChooseSide(){
    //console.log(choosenSide)
    setFilterList(choosenSide)
  }

  return (
    <div>
         <img src={logopath} className={className} onClick={() =>{filterChooseSide()}} />
    </div>
   
  )
}
