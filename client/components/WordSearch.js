
export function getAllWords(arr) {
  let horizWordArr = [];
  let y = 0;
  while (y < arr.length) {
    let prevRow = arr[y-1]
    let currRow = arr[y];
    let nextRow = arr[y+1];
    let x = 0;
    while (x < currRow.length) {
      if (currRow[x]) {
        if (currRow[x+1] && !currRow[x-1] ) {
          let connectedWord = getHorizWord(currRow, x, prevRow, nextRow)
          horizWordArr.push(connectedWord);
        }
      }
      x++;
    }
    y++;
  }
  let vertWordArr = [];
  y = 0
  while(y < arr.length) {
    let currRow = arr[y];
    for (let x = 0; x < currRow.length; x++) {
      if (currRow[x]){
        let nextRow = arr[y+1];
        let prevRow = arr[y-1];
        if (nextRow && (((!prevRow && nextRow[x]) || (prevRow && (!prevRow[x] && nextRow[x]))))) {
          let connectedWord = getVertWord(arr.slice(y), x);
          vertWordArr.push(connectedWord)
        }
      }
    }
    y++
  }
  console.log('HHHHHHH')

  console.log(vertWordArr.concat(horizWordArr))
  return vertWordArr.concat(horizWordArr)
}

export function getVertWord(arrs, y) {
  console.log('VERTS')
  let tempWord = '';
  for (let row of arrs) {
    if (!row[y]) break;
    if (row[y]) {
      tempWord += row[y];
    }
  }
  return tempWord;
}

export function getHorizWord (curr, y, prev, next) {
  console.log('HORIZS')
  let newWord = '';
  while (curr[y]) {
    newWord+=curr[y];
    y++;
  }
  return newWord;
}

