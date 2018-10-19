var winArr = []


positionShips = () => {

  winArr.push(buildAShip(5))
  winArr.push(buildAShip(4))
  winArr.push(buildAShip(3))
  winArr.push(buildAShip(3))
  winArr.push(buildAShip(2))

}

buildAShip = (shipLength) => {
  //computer will pick random number
  //the number will be the first number of the array
  let handcuffs = 9 - shipLength
  let tens;
  let ones;
  //Determines veritcal or horizontal ship
  let axis = Math.floor(Math.random()*2)

  if(axis === 0){ //horizontal axis
    tens = (Math.floor(Math.random()*9) * 10 //checked
    ones = Math.floor(Math.random()*handcuffs)
    return fillShip((tens+ones), shipLength, 1))
  }else{// vertical axis
    tens = (Math.floor(Math.random()*handcuffs)) * 10
    ones = Math.floor(Math.random()*9)
    return fillShip((tens + ones), shipLength, 10)
  }

}

fillShip = (startBoat, length, inc) => {
  let newShipArr = []
  for(let i=0;i<length;i+=inc){
    newShipArr.push(startBoat+i)
  }
  return newShipArr
}
console.log(positionShips())
console.log(winArr);
