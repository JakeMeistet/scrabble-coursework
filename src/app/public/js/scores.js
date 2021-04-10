
function wordSearch(data) {
  console.log(data)
    console.log('test here')
    const allDroppedSorted = data.allDropped.sort(compare)
    console.log(allDroppedSorted)
    let sortByCol = []
    let sortByRow = []
    
    for (let i = 0; i < allDroppedSorted.length; i++) {
      const coords = allDroppedSorted[i].dropZone.split('')
      const tiles = allDroppedSorted[i].tile.split('')
      if (coords.length === 2) {
        sortByCol[i] = {row: allDroppedSorted[i].dropZone.split('')[0], column: allDroppedSorted[i].dropZone.split('')[1], tile: tiles}
        sortByRow[i] = {row: allDroppedSorted[i].dropZone.split('')[0], column: allDroppedSorted[i].dropZone.split('')[1], tile: tiles}
      } else {
        console.log(tiles)
        sortByCol[i] = {row: allDroppedSorted[i].dropZone.split('')[0], column: (allDroppedSorted[i].dropZone.split('')[1] + allDroppedSorted[i].dropZone.split('')[2]), tile: tiles}
        sortByRow[i] = {row: allDroppedSorted[i].dropZone.split('')[0], column: (allDroppedSorted[i].dropZone.split('')[1] + allDroppedSorted[i].dropZone.split('')[2]), tile: tiles}
      }
    }

    sortByCol.sort(sortObjArr('column', false, parseInt))
    sortByRow.sort(compareRows)
    let testArr = []
    let testArr2 = []
    let rowNum = 0
    for (let i = 0; i < sortByRow.length; i++) {
      if (i !== 0){
        console.log(sortByRow[i].row)
        console.log(sortByRow[i-1].row)
        if (sortByRow[i].row === sortByRow[i-1].row){
          testArr.push(sortByRow[i])
          console.log(testArr)
        } else {
          for (let j = 0; j < testArr.length; j++){
            testArr2.push(testArr[i])
          }
          testArr = []
        }
      } else {
        testArr.push(sortByRow[i])
      }
    }

    
    console.log(sortByRow)
    console.log('sorted row arr')

    let wordCount = 0
    let word = []


    check(sortByCol, word, wordCount, 'column')
    check(sortByRow, word, wordCount, 'row')

    placement = []
}


function checkDropped (gameId, droppedItems) {
  socket.emit('checkDropped', { gameId: gameId, droppedItems: droppedItems })
}

function compare (a, b) {
  const dropZoneA = a.dropZone
  const dropZoneB = b.dropZone

  let comparison = 0
  if (dropZoneA > dropZoneB) {
    comparison = 1
  } else if (dropZoneA < dropZoneB) {
    comparison = -1
  }
  return comparison
}

function sortObjArr (field, reverse, primer) {
  const key = primer ?
    function(x) {
      return primer(x[field])
    } :
    function(x) {
      return x[field]
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }

}

function undefinedCheck (x) {
  if (x === undefined) {
    x = ''
    return x
  } else {
    return x
  }
}




function alphabetCheck (currentRow, previousRow) {
  const alphabet =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  let position = []
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === previousRow){
      position[0] = i
    } else if (alphabet[i] === currentRow) {
      position[1] = i
    } else {
      continue
    }
  }
  return (position[0] === position[1] - 1)
}



function check (placement, word, wordCount, check) {
    let tile = null
    let previousRow = null
    let previousColumn = null
    let currentColumn = null
    let currentRow = null
    let nextRow = null
    let nextColumn = null

      // console.log(sortByRow)
      console.log('rowSort')
      for (let i = 0; i < placement.length; i++) {   
        console.log(wordCount) 
        tile = placement[i].tile
        console.log(placement)
        
        if (i !== 0) {
          previousColumn = placement[i - 1].column
          previousRow = placement[i - 1].row
        }
        currentColumn = placement[i].column
        currentRow = placement[i].row
  
        if (placement[i+1] !== undefined) {
          nextRow = placement[i+1].row
          nextColumn = placement[i+1].column  
        } 
        console.log(tile)
  
        if (i === 0) {
          if (tile.length === 3) {
            word[wordCount] = tile[2]
          } else {
            word[wordCount] = tile[1]
          }
        } else {
          console.log(currentRow - 1)
          word[wordCount] = undefinedCheck(word[wordCount])
          console.log('check')
          const rowCheck = (alphabetCheck(currentRow, previousRow))
          const colCheck = (parseInt(currentColumn) !== (parseInt(previousColumn) + 1))
          let checkVal = null
          let current
          let previous
          let previous2
          let next
          if (check === 'row'){
            checkVal = colCheck
            current = currentRow
            previous = previousRow
            previous2 = previousColumn
            next = nextRow
          } else if (check === 'column') {
            checkVal = !rowCheck
            current = currentColumn
            previous = previousColumn
            previous2 = previousRow
            next = nextColumn
          }
          if (checkVal) {
            wordCount += 1
          }
          if (current === previous && (checkVal === false || previous2 === null)) {
            if (tile === undefined) {
              continue
            }
            if (tile.length === 3) {
              word[wordCount] = word[wordCount] + tile[2]
              // word[wordCount] = word[wordCount] + tile[2]
            } else {
              console.log(tile[1])
              word[wordCount] = word[wordCount] + tile[1]
              // word[wordCount] = word[wordCount] + tile[1]
            }
            if (current !== next){
              wordCount += 1
            }
          } else if (checkVal === true && current === previous) { 
            if (tile.length === 3) {
              console.log(tile[2])
              word[wordCount] =  tile[2]
            } else {
              console.log(tile[1])
              word[wordCount] = tile[1]
            }
            if (current !== next){
              wordCount += 1
            }
          
          } else {
            if (tile.length === 3) {
              console.log(tile[2])
              word[wordCount] = tile[2]
            } else {
              console.log(tile[1])
              word[wordCount] = tile[1]
            }
          }
  
        }
        console.log(check)
        console.log(word)
      }
// // //////////////////////////////////////

//       // console.log(sortByCol)
//       console.log('colSort')
//       for (let i = 0; i < placement.length; i++) {    
//         console.log(wordCount)
//         tile = placement[i].tile
//         if (i !== 0) {
//           previousColumn = placement[i - 1].column
//           previousRow = placement[i - 1].row
//         }
//         currentColumn = placement[i].column
//         currentRow = placement[i].row
  
//         if (placement[i+1] !== undefined) {
//           nextRow = placement[i+1].row
//           nextColumn = placement[i+1].column  
//         } 
//         console.log(tile)
  
//         if (i === 0) {
//           if (tile.length === 3) {
//             word[wordCount] = tile[2]
//           } else {
//             word[wordCount] = tile[1]
//           }
//         } else {
//           console.log(currentRow - 1)
//           word[wordCount] = undefinedCheck(word[wordCount])
//           console.log('check')
//           const rowCheck = alphabetCheck(currentRow, previousRow)
          
//           if (rowCheck === false) {
//             wordCount += 1
//           }
//           if (currentColumn === previousColumn && (rowCheck === true || previousRow === null)) {
//             if (tile === undefined) {
//               continue
//             }
//             if (tile.length === 3) {
//               word[wordCount] = word[wordCount] + tile[2]
//               // word[wordCount] = word[wordCount] + tile[2]
//             } else {
//               console.log(tile[1])
//               word[wordCount] = word[wordCount] + tile[1]
//               // word[wordCount] = word[wordCount] + tile[1]
//             }
//             if (currentColumn !== nextColumn){
//               wordCount += 1
//             }
//           } else if (rowCheck === false && currentColumn === previousColumn) { 
//             if (tile.length === 3) {
//               console.log(tile[2])
//               word[wordCount] =  tile[2]
//             } else {
//               console.log(tile[1])
//               word[wordCount] = tile[1]
//             }
//             if (currentColumn !== nextColumn){
//               wordCount += 1
              
//             }
          
//           } else {
//             if (tile.length === 3) {
//               console.log(tile[2])
//               word[wordCount] = tile[2]
//             } else {
//               console.log(tile[1])
//               word[wordCount] = tile[1]
//             }
//           }
  
//         }
//         console.log(check)
//         console.log(word)

//         }
      // }
  }  
  
  function compareRows(a, b) {
    let index = 0
    // converting to uppercase to have case-insensitive comparison
    const row1 = a.row.charCodeAt(index)
    const row2 = b.row.charCodeAt(index)
  
    let comparison = 0;
  
    if (row1 > row2) {
        comparison = 1;
    } else if (row1 < row2) {
        comparison = -1;
    }
    return comparison;
    }