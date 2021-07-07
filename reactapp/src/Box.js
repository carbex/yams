import React from 'react';


function Box(props) {

  let handleClickOnBox = () => {
    props.handleClickOnBoxParent(props.indexI, props.indexJ)
  }
  let style = {cursor: 'pointer', textAlign: 'center'}
  if(props.value !== null || props.turn !== props.indexI) {
    style = {cursor: 'pointer', textAlign: 'center', pointerEvents: 'none'}
  }
  
 return (   
  <td onClick={ () => handleClickOnBox() } style={style}>{props.value}</td>  
 )
}

export default Box;