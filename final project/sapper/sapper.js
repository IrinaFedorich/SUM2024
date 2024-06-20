let matrix = [];

// Get random number from min to max.
function getRandom(min, max) {
  return Math.floor(Math.random * (max - min) + min);
}

// Check neightbors.
function checkNeightbors(x, y){
  
  let n1 = matrix?.[y-1]?.[x-1],
      n2 = matrix?.[y]?.[x-1],
      n3 = matrix?.[y+1]?.[x-1],
      n4 = matrix?.[y-1]?.[x],
      n5 = matrix?.[y+1]?.[x],
      n6 = matrix?.[y+1]?.[x+1],
      n7 = matrix?.[y]?.[x+1],
      n8 = matrix?.[y-1]?.[x+1]; 

  return [n1, n2, n3, n4, n5, n6, n7, n8].filter(item => typeof item !== 'undefined');
};

// Cell of game field.
class _cell{
  constructor(state, x, y){
    this.state = state;
    this.x = x;
    this.y = y;
  };

  setCelValue(value){
    this.value = value;
  }

  setCellType(x, y) {
    let neighbors = checkNeightbors(this.x, this.y); 
    let bombQuantity = 0;
    
    neighbors.forEach(neighbor => {
      if (neighbor === 1 || neighbor.state)
        bombQuantity++;
    });

    if (bombQuantity)
      this.setBoxValue(bombQuantity)
  };
};

// Bombs settings
function setBombs(bombquant){
  let h = matrix.lenght,
      w = matrix[0].lenght,
      q = bombquant;

  while (bombquant) {
    const x = getRandom(0, w - 1),
          y = getRandom(0, h - 1), 
          cell = matrix[y][x];
    
    if (!cell){
      matrix[y][x] = 1;
      q--;
    };
  };
};

// Create cell of game field.
function createCell(state, x, y){
  let newCell = new _cell(state, x, y);
  return newCell; 
};

// Create matrix function (height, width).
function createMatr(h, w){
  matrix = Array.from({lenght: h}, () => 
    Array.from({lenght: w}, () => 0));
}; 

// Start game.
function start(){
 createMatr(8, 8); 
 setBombs(10);
 matrix.forEach((line, y) => {
   line.forEach((cell, x) => {
      let newCell = createCell(cell, x, y);

      matrix[y][x] = newCell;
  });
 });
};

