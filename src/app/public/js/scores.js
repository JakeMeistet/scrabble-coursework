
function wordSearch (data) {
  const allDroppedSorted = data.allDropped.sort(compare);
  const sortByCol = [];
  let sortByRow = [];

  for (let i = 0; i < allDroppedSorted.length; i++) {
    const coords = allDroppedSorted[i].dropZone.split('');
    const tiles = allDroppedSorted[i].tile.split('');
    if (coords.length === 2) {
      sortByCol[i] = { row: allDroppedSorted[i].dropZone.split('')[0], column: allDroppedSorted[i].dropZone.split('')[1], tile: tiles };
      sortByRow[i] = { row: allDroppedSorted[i].dropZone.split('')[0], column: allDroppedSorted[i].dropZone.split('')[1], tile: tiles };
    } else {
      console.log(tiles);
      sortByCol[i] = { row: allDroppedSorted[i].dropZone.split('')[0], column: (allDroppedSorted[i].dropZone.split('')[1] + allDroppedSorted[i].dropZone.split('')[2]), tile: tiles };
      sortByRow[i] = { row: allDroppedSorted[i].dropZone.split('')[0], column: (allDroppedSorted[i].dropZone.split('')[1] + allDroppedSorted[i].dropZone.split('')[2]), tile: tiles };
    }
  }
  const rowNum = 0;
  sortByCol.sort(sortObjArr('column', false, parseInt));
  sortByRow.sort(compareRows);
  let testArr = [];
  const completeArr = [];
  let lastRow;
  for (let i = 0; i < sortByRow.length; i++) {
    if (i === sortByRow.length - 1) {
      testArr.push(sortByRow[i]);
      console.log('finish');
      testArr.sort(sortObjArr('column', false, parseInt));
      for (let j = 0; j < testArr.length; j++) {
        completeArr.push(testArr[j]);
        console.log(completeArr);
      }
    } else if (i !== 0 && i !== sortByRow.length - 1) {
      console.log(sortByRow[i].row);
      console.log(`Last row = ${lastRow}`);
      if (sortByRow[i].row === lastRow) {
        testArr.push(sortByRow[i]);
        console.log(testArr);
        lastRow = sortByRow[i].row;
      } else {
        testArr.sort(sortObjArr('column', false, parseInt));
        for (let j = 0; j < testArr.length; j++) {
          completeArr.push(testArr[j]);
          console.log(completeArr);
        }
        testArr = [];
        testArr.push(sortByRow[i]);
        lastRow = sortByRow[i].row;
      }
    } else {
      lastRow = sortByRow[i].row;
      testArr.push(sortByRow[i]);
    }
  }
  console.log(sortByRow);
  console.log(completeArr);
  console.log('sorted row arr');
  sortByRow = completeArr;
  const wordCount = 0;
  const word = [];
  const allWords = [];

  const colWords = check(sortByCol, word, wordCount, 'column');
  elemRemove(colWords);
  const rowWords = check(sortByRow, word, wordCount, 'row');
  elemRemove(rowWords);

  console.log('complete arrays');
  console.log(colWords);
  console.log(rowWords);

  for (let i = 0; i < colWords.length; i++) {
    if (colWords[i].length >= 2) {
      allWords.push(colWords[i]);
    } else {
      continue;
    }
  }
  for (let i = 0; i < rowWords.length; i++) {
    if (rowWords[i].length >= 2) {
      allWords.push(rowWords[i]);
    } else {
      continue;
    }
  }

  console.log(allWords);
  console.log('arrays');
  placement = [];
  searchSocket(allWords, data.droppedItems, data.gameId, data.allDropped, data.previousWords)
}

function checkDropped(gameId, droppedItems, allDropped, previousWords) {
  socket.emit('checkDropped', { gameId: gameId, droppedItems: droppedItems, allDropped: allDropped, previousWords: previousWords });
}

function check(placement, word, wordCount, check) {
  word = [];
  let tile = null;
  let previousRow = null;
  let previousColumn = null;
  let currentColumn = null;
  let currentRow = null;
  let nextRow = null;
  let nextColumn = null;

  console.log('rowSort');
  for (let i = 0; i < placement.length; i++) {
    console.log(wordCount);
    tile = placement[i].tile;
    console.log(placement);

    if (i !== 0) {
      previousColumn = placement[i - 1].column;
      previousRow = placement[i - 1].row;
    }
    currentColumn = placement[i].column;
    currentRow = placement[i].row;

    if (placement[i + 1] !== undefined) {
      nextRow = placement[i + 1].row;
      nextColumn = placement[i + 1].column;
    }
    console.log(tile);

    if (i === 0) {
      if (tile.length === 3) {
        word[wordCount] = tile[2];
      } else {
        word[wordCount] = tile[1];
      }
    } else {
      console.log(currentRow - 1);
      word[wordCount] = undefinedCheck(word[wordCount]);
      console.log('check');
      const rowCheck = (alphabetCheck(currentRow, previousRow));
      const colCheck = (parseInt(currentColumn) !== (parseInt(previousColumn) + 1));
      let checkVal = null;
      let current;
      let previous;
      let previous2;
      let next;
      if (check === 'row') {
        checkVal = colCheck;
        current = currentRow;
        previous = previousRow;
        previous2 = previousColumn;
        next = nextRow;
      } else if (check === 'column') {
        checkVal = !rowCheck;
        current = currentColumn;
        previous = previousColumn;
        previous2 = previousRow;
        next = nextColumn;
      }
      if (checkVal) {
        wordCount += 1;
      }
      if (current === previous && (checkVal === false || previous2 === null)) {
        if (tile === undefined) {
          continue;
        }
        if (tile.length === 3) {
          word[wordCount] = word[wordCount] + tile[2];
        } else {
          console.log(tile[1]);
          word[wordCount] = word[wordCount] + tile[1];
        }
        if (current !== next) {
          wordCount += 1;
        }
      } else if (checkVal === true && current === previous) {
        if (tile.length === 3) {
          console.log(tile[2]);
          word[wordCount] = tile[2];
        } else {
          console.log(tile[1]);
          word[wordCount] = tile[1];
        }
        if (current !== next) {
          wordCount += 1;
        }
      } else {
        if (tile.length === 3) {
          console.log(tile[2]);
          word[wordCount] = tile[2];
        } else {
          console.log(tile[1]);
          word[wordCount] = tile[1];
        }
      }
    }
    console.log(check);
  }

  console.log(word);
  return word;
}

function compareRows(a, b) {
  const index = 0;
  // converting to uppercase to have case-insensitive comparison
  const row1 = a.row.charCodeAt(index);
  const row2 = b.row.charCodeAt(index);

  let comparison = 0;

  if (row1 > row2) {
    comparison = 1;
  } else if (row1 < row2) {
    comparison = -1;
  }
  return comparison;
}

function compare(a, b) {
  const dropZoneA = a.dropZone;
  const dropZoneB = b.dropZone;
  let comparison = 0;
  if (dropZoneA > dropZoneB) {
    comparison = 1;
  } else if (dropZoneA < dropZoneB) {
    comparison = -1;
  }
  return comparison;
}

function sortObjArr(field, reverse, primer) {
  const key = primer
    ? function (x) {
      return primer(x[field]);
    }
    : function (x) {
      return x[field];
    };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
}

function undefinedCheck(x) {
  if (x === undefined) {
    x = '';
    return x;
  } else {
    return x;
  }
}

function alphabetCheck(currentRow, previousRow) {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const position = [];
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === previousRow) {
      position[0] = i;
    } else if (alphabet[i] === currentRow) {
      position[1] = i;
    } else {
      continue;
    }
  }
  return (position[0] === position[1] - 1);
}

function elemRemove(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < 2 || arr[i] === '') {
      removeElement(arr, arr[i]);
    } else {
      continue;
    }
  }
}
