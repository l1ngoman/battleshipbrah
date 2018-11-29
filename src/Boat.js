class Boat {
  constructor() {
  this.pieces = [
    {type: 'carrier', size: 5, coordinates: []},
    {type: 'battleship', size: 4, coordinates: []},
    {type: 'cruiser', size: 3, coordinates: []},
    {type: 'submarine', size: 3, coordinates: []},
    {type: 'destroyer', size: 2, coordinates: []}]
  }

  positionShips = () => {
    for(let i=0;i<this.pieces.length;i++){
      this.pieces[i].coordinates.push(this.buildAShip(this.pieces[i].size));
    }
    return this.pieces;
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
    //console.log("Axis: " + axis + "(0 for horizontal, 1 for vertical)");
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
        //console.log(newShipArr);
    }while(shipLength>1 && !this.isValidShip(newShipArr))
    return newShipArr
  }

  //takes in a newShipArr and returns false if the ship has the same value as another ship in the winArr or true if not
  //check if winArr contains a value in shipArr
  isValidShip = (shipArr) => {
    let bool;
    for (let i=0;i<this.ships.length;i++) {
      for(let j=0;j<shipArr.length;j++){
        if(this.ships[i].includes(shipArr[j])){
          //console.log(`${this.ships[i]} does have a ****************************${shipArr[j]}.`);
          return false;
        }else{
          //console.log(`${this.ships[i]} doesn't have ${shipArr[j]}.`);
          bool = true;
        }
      }
    }
    //console.log(bool);
    return bool
  }
}

export default Boat;
