//console.log((Math.floor(Math.random()*9) * 10))
// let handcuffs = 9-3;
// console.log(Math.floor(Math.random()*handcuffs))

fillShip = (startBoat, length, inc) => {
  let newShipArr = []
  for(let i=0;i<length;i++){
    newShipArr.push(startBoat+i)
  }
  console.log(newShipArr)
}

fillShip(44,3,1)
