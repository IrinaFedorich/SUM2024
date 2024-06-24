let r = 13, c = 13, s = 50, boxes, field, flag, fail, reveal,
  canvas = document.getElementById('canvas'), 
  replayButton = document.getElementById('replay');

function toKey(row, col) {
  return row + '-' + col;
}

function fromKey(key) {
  return key.split('-').map(Number);
}

function createButtons() {
  canvas.style.width = r * s + 'px';
  canvas.style.height = c * s + 'px';
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let cell = document.createElement('button');
      cell.style.float = 'left';
      cell.style.width = s + 'px';
      cell.style.height = s + 'px';
      cell.oncontextmenu = (e) => {
        if (fail !== null) 
          return;
        e.preventDefault();
        toggleFlag(key);
        update();
      }
      cell.onclick = (e) => {
        if (fail !== null) 
          return;
        if (flag.has(key)) 
          return;
        revealCell(key);
        update();
      }
      canvas.appendChild(cell);
      let key = toKey(i, j);
      boxes.set(key, cell);
    }
  }
  replayButton.onclick = start;
}

function start() {
  fail = null;
  reveal = new Set();
  flag = new Set();
  field = generateMap(generateBombs())
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
      let key = toKey(i, j),
        cell = boxes.get(key),
        value = field.get(key);

      cell.style.backgroundColor = '';
      cell.style.color = 'black';
      cell.textContent = '';
      cell.disabled = false;

        if (fail !== null && value === 'b') {
          cell.disabled = true;
          cell.textContent = '💥';
        if (key === fail) {
          cell.style.backgroundColor = 'purple';
        }
      } else if (reveal.has(key)) {
            cell.disabled = true
            if (value === undefined) 
              cell.textContent = ' ';
            else if (value === 1) {
              cell.textContent = '1';
              cell.style.color = 'blue';
            } else if (value === 2) {
              cell.textContent = '2';
              cell.style.color = 'green';
            } else if (value >= 3) {
              cell.textContent = value;
              cell.style.color = 'red';
            } else 
              throw Error('o-o');
      } else if (flag.has(key)) 
        cell.textContent = '❓';
    }
  }
  if (fail !== null) {
    canvas.style.pointerEvents = 'none';
    replayButton.style.display = 'block';
  } else {
    canvas.style.pointerEvents = '';
    replayButton.style.display = '';   
  }
}

function toggleFlag(key) {
  if (flag.has(key)) 
    flag.delete(key);
  else 
    flag.add(key);
}

function revealCell(key) {
  if (field.get(key) === 'b') 
    fail = key;
  else 
    propagateReveal(key, new Set());
}

function propagateReveal(key, visited) {
  reveal.add(key);
  visited.add(key);

  let isEmpty = !field.has(key);
  if (isEmpty) 
    for (let neighborKey of getNeighbors(key)) 
      if (!visited.has(neighborKey)) 
        propagateReveal(neighborKey, visited);
}

function isInBounds([row, col]) {
  if (row < 0 || col < 0) 
    return false;
  if (row >= r || col >= c)
    return false;
  return true;
}

function getNeighbors(key) {
  let [x, y] = fromKey(key),
    neighbors = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    ]
  return neighbors.filter(isInBounds).map(([r, c]) => toKey(r, c));
}

function generateBombs() {
  let count = Math.round(Math.sqrt(r * c)),
    bombs = [], allKeys = []
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      allKeys.push(toKey(i, j))
    }
  }
  allKeys.sort(() => {
    let coinFlip = Math.random() > 0.5
    return coinFlip ? 1 : -1
  })
  return allKeys.slice(0, count)
}

function generateMap(seedBombs) {
  let field = new Map()
  function incrementDanger(neighborKey) {
    if (!field.has(neighborKey)) {
        field.set(neighborKey, 1);
    } else {
      let oldVal = field.get(neighborKey)
      if (oldVal !== 'b') {
        field.set(neighborKey, oldVal + 1)
      }
    }
  }
  for (let key of seedBombs) {
    field.set(key, 'b');
    for (let neighborKey of getNeighbors(key)) {
      incrementDanger(neighborKey)
    }
  }
  return field;
}

start();