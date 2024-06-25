let r = 20, c = 20, s = 50, boxes, field, flag, fail, reveal, 
  canvas = document.getElementById('canvas'), 
  replayButton = document.getElementById('replay'),
  saveButton = document.getElementById('save');

function Put(row, col) {
  return row + '-' + col;
}

function Get(key) {
  return key.split('-').map(Number);
}

function createButtons() {
  let i, j, box;
  canvas.style.width = r * s + 'px';
  canvas.style.height = c * s + 'px';
  for (i = 0; i < r; i++) {
    for (j = 0; j < c; j++) {
      box = document.createElement('button');
      box.style.float = 'left';
      box.style.width = s + 'px';
      box.style.height = s + 'px';
      box.oncontextmenu = (e) => {
        if (fail !== null) 
          return;
        e.preventDefault();
        changeState(key);
        update();
      }
      box.onclick = (e) => {
        if (fail !== null) 
          return;
        if (flag.has(key)) 
          return;
        openBox(key);
        update();
      }
      canvas.appendChild(box);
      let key = Put(i, j);
      boxes.set(key, box);
    }
  }
  replayButton.onclick = localStorage.clear();
  replayButton.onclick = start;
  saveButton.onclick = save;
}

function save() {
  let i, j, key, box;
  storage = window.localStorage;
  
  for (i = 0; i < r; i++) 
    for (j = 0; j < c; j++) 
    {
      key = Put(i, j);
      box = boxes.get(key);
      value = field.get(key);
    //  num[i][j] = box;
    }
   // localStorage.setItem() = num;
}

function start() {
  fail = null;
  reveal = new Set();
  flag = new Set();
  field = createField(createBombs())
  if (boxes) 
    update();
  else {
    boxes = new Map();
    createButtons();
  }
}

function update() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let key = Put(i, j),
        box = boxes.get(key),
        value = field.get(key);

      box.style.backgroundColor = '';
      box.style.color = 'black';
      box.textContent = '';
      box.disabled = false;

        if (fail !== null && value === 'b') {
          box.disabled = true;
          box.textContent = '💥';
        if (key === fail) {
          box.style.backgroundColor = 'green';
        }
      } else if (reveal.has(key)) {
            box.disabled = true
            if (value === undefined) 
              box.textContent = ' ';
            else if (value === 1) {
              box.textContent = '1';
              box.style.color = 'blue';
            } else if (value === 2) {
              box.textContent = '2';
              box.style.color = 'green';
            } else if (value >= 3) {
              box.textContent = value;
              box.style.color = 'red';
            } else 
              throw Error('o-o');
      } else if (flag.has(key)) 
        box.textContent = '❓';
    }
  }
  if (fail !== null) {
    canvas.style.pointerEvents = 'none';
    replayButton.style.display = 'block';
    saveButton.style.display = 'block';
  } else {
    canvas.style.pointerEvents = '';
    replayButton.style.display = '';
    saveButton.style.display = '';   
  }
}

function changeState(key) {
  if (flag.has(key)) 
    flag.delete(key);
  else 
    flag.add(key);
}

function openBox(key) {
  if (field.get(key) === 'b') 
    fail = key;
  else 
  revealMore(key, new Set());
}

function revealMore(key, visited) {
  reveal.add(key);
  visited.add(key);

  let isEmpty = !field.has(key);
  if (isEmpty) 
    for (let neighborKey of getNeighbors(key)) 
      if (!visited.has(neighborKey)) 
        revealMore(neighborKey, visited);
}

function isInBounds([row, col]) {
  if (row < 0 || col < 0) 
    return false;
  if (row >= r || col >= c)
    return false;
  return true;
}

function getNeighbors(key) {
  let [x, y] = Get(key),
    neighbors = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    ];
  return neighbors.filter(isInBounds).map(([r, c]) => Put(r, c));
}

function createBombs() {
  let count = Math.round(Math.sqrt(r * c)),
    allKeys = [], coinFlip;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) 
      allKeys.push(Put(i, j));
  }
  allKeys.sort(() => {
    coinFlip = Math.random() > 0.5;
    return coinFlip ? 1 : -1;
  })
  return allKeys.slice(0, count);
}

function createField(numOfB) {
  let field = new Map(), key, old;
  function incrementDanger(neighborKey) {
    if (!field.has(neighborKey)) 
        field.set(neighborKey, 1);
    else {
      old = field.get(neighborKey);
      if (old !== 'b') 
        field.set(neighborKey, old + 1);
    }
  }
  for (key of numOfB) {
    field.set(key, 'b');
    for (let neighborKey of getNeighbors(key)) 
      incrementDanger(neighborKey);
  }
  return field;
}

start();