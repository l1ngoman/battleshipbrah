let winArr = []

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
  let newShipArr;
  //Determines veritcal or horizontal ship
  let axis = Math.floor(Math.random()*2)
  console.log("Axis: " + axis + "(0 for horizontal, 1 for vertical)");
  do{
    newShipArr =[]
      if(axis === 0){ //horizontal axis
        tens = (Math.floor(Math.random()*9)) * 10
        ones = Math.floor(Math.random()*handcuffs)
        for(let i=0;i<shipLength;i++){
          newShipArr.push(tens+ones+i);
        }
      }else{// vertical axis
        tens = (Math.floor(Math.random()*handcuffs)) * 10
        ones = Math.floor(Math.random()*9)
        for(let i=0;i<shipLength*10;i+=10){
          newShipArr.push(tens+ones+i);
        }
      }
      console.log(newShipArr);
  }while(winArr.length<1? false: !isValidShip(newShipArr))
  return newShipArr
}
isValidShip = (shipArr) => {
  let bool;
  for (let i=0;i<winArr.length;i++) {
    for(let j=0;j<shipArr.length;j++){
      if(winArr[i].includes(shipArr[j])){
        console.log(`${winArr[i]} does have a ****************************${shipArr[j]}.`);
        return false;
      }else{
        console.log(`${winArr[i]} doesn't have ${shipArr[j]}.`);
        bool = true;
      }
    }
  }
  console.log(bool);
  return bool
}
positionShips();
console.log(winArr);
