/*  The wordSearch function is used to search through the board pieces to find straight lines
by this I mean, the tiles that have been placed, in a straight line horizontally and vertically
to determine which words to run through the dictionary to check whether valid or not  */
function wordSearch(data) {
  const allDroppedSorted = data.allDropped.sort(compare);
  const sortByCol = [];
  let sortByRow = [];

  /*  This is used to set the values of the arrays sortByCol and sortByRow
  these arrays are arrays of objects containing row, column and tile with
  tile being the letter and the others, the board placements (coords)  */
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
  /*  The two arrays are sorted using certain comparison algorithms
  sortByCol - sorts the array by column value in ascending order
  sortByRow - sorts the array by row value in alphabetical ascending order */
  sortByCol.sort(sortObjArr('column', false, parseInt));
  sortByRow.sort(compareRows);
  let tempArr = [];
  const completeArr = [];
  let lastRow;
  /*  This will loop over the sortByRow array, getting each value and sorting
  it by column in ascending order, this is required to ensure that words can
  be found correctly. If not, the pieces may not be in the correct order after
  being sorted by row alphabetically */
  for (let i = 0; i < sortByRow.length; i++) {
    if (i === sortByRow.length - 1) {
      tempArr.push(sortByRow[i]);
      console.log('finish');
      // Here the tempArr is now sorted by column
      tempArr.sort(sortObjArr('column', false, parseInt));
      for (let j = 0; j < tempArr.length; j++) {
        completeArr.push(tempArr[j]);
        console.log(completeArr);
      }
    } else if (i !== 0 && i !== sortByRow.length - 1) {
      console.log(sortByRow[i].row);
      console.log(`Last row = ${lastRow}`);
      if (sortByRow[i].row === lastRow) {
        tempArr.push(sortByRow[i]);
        console.log(tempArr);
        lastRow = sortByRow[i].row;
      } else {
        tempArr.sort(sortObjArr('column', false, parseInt));
        for (let j = 0; j < tempArr.length; j++) {
          completeArr.push(tempArr[j]);
          console.log(completeArr);
        }
        tempArr = [];
        tempArr.push(sortByRow[i]);
        lastRow = sortByRow[i].row;
      }
    } else {
      lastRow = sortByRow[i].row;
      tempArr.push(sortByRow[i]);
    }
  }
  console.log(sortByRow);
  console.log(completeArr);
  console.log('sorted row arr');
  sortByRow = completeArr;
  const wordCount = 0;
  const word = [];
  const allWords = [];

  if (allWords.length > 0) {
    allWords.length = 0;
  }

  /*  The two arrays are now used to check for words in the columnd and
  rows, these will then be held in their own arrays (colWords and rowWords)
  then, duplicate elements are removed from both  */
  const colWords = check(sortByCol, word, wordCount, 'column');
  elemRemove(colWords);
  const rowWords = check(sortByRow, word, wordCount, 'row');
  elemRemove(rowWords);

  console.log('complete arrays');
  console.log(colWords);
  console.log(rowWords);

  // Here the colWords and rowWords arrays are combined to make the allWords array
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
  // searchSocket is called to emit a socket to begin the dictionary search
  searchSocket(allWords, data.droppedItems, data.gameId, data.allDropped);
}

// Emits the socket to initiate the word search to scrape the board for words
function checkDropped(gameId, droppedItems, allDropped) {
  socket.emit('checkDropped', { gameId: gameId, droppedItems: droppedItems, allDropped: allDropped });
}

/*  Function used to get words from the placed pieces, by row and by column
the relevant data is passed into the function (sortByCol and sortByRow) which
allows the function to run through the sorted arrays and get words by checking for gaps
in the row or column */
function check(placement, word, wordCount, check) {
  word = [];
  let tile = null;
  let previousRow = null;
  let previousColumn = null;
  let currentColumn = null;
  let currentRow = null;
  let nextRow = null;
  let nextColumn = null;

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

// compareRow comparing algorithm for the sorting, used to sort by row
function compareRows(a, b) {
  const index = 0;
  // allows for it to be case insensitive
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

// Another compare function to sort the all dropped array to allDroppedSorted (in ascending order)
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

// The final compare function to sort by column, I was having a few issues with sorting previously, would aim to use less compare functions
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

// Simply checks if a variable is undefined or not to prevent an error
function undefinedCheck(x) {
  if (x === undefined) {
    x = '';
    return x;
  } else {
    return x;
  }
}

// Used to check if there is a gap between tiles placed along the rows which use the alphabet up to O
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

// Function used to remove an element if the array length is les than 2 or the current element is not '' (prevents errors)
function elemRemove(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < 2 || arr[i] === '') {
      removeElement(arr, arr[i]);
    } else {
      continue;
    }
  }
}
