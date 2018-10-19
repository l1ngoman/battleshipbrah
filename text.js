var winArr = []


positionShips = () => {
  winArr.push(buildAShip(5))
}

buildAShip = (shipLength) => {
  //computer will pick random number
  //the number will be the first number of the array
  let handcuffs = 9 - shipLength
  let tens;
  let ones;
  let newShipArr = [];
  //Determines veritcal or horizontal ship
  let axis = Math.floor(Math.random()*2)
  console.log("Axis: "+axis);
  if(axis === 0){ //horizontal axis
    tens = (Math.floor(Math.random()*9)) * 10
    ones = Math.floor(Math.random()*handcuffs)
    console.log("Tens (H): "+tens);
    console.log("Ones (H): "+ones);
    for(let i=0;i<shipLength;i++){
      newShipArr.push(tens+ones+i);
    }
  }else{// vertical axis
    tens = (Math.floor(Math.random()*handcuffs)) * 10
    ones = Math.floor(Math.random()*9)
    console.log("Tens (V): "+tens);
    console.log("Ones (V): "+ones);
    for(let i=0;i<shipLength*10;i+=10){
      newShipArr.push(tens+ones+i);
    }
  }
  console.log(newShipArr);
  return newShipArr
}
positionShips();
