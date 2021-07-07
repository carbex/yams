import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Dice(props) {

  let handleClickOnDice = () => {
    props.handleClickOnDiceParent(props.index)
  }
  
  let styleSelected = {color: '#234567', cursor: 'pointer', margin: '10px'}
  if(props.selected === true) {
    styleSelected = {color: '#FF4567', cursor: 'pointer', margin: '10px'}
  }
  
 return (
    
      <FontAwesomeIcon onClick={ () => handleClickOnDice() } style={styleSelected} icon={props.faDiceNumber} />
    
 )
}

export default Dice;