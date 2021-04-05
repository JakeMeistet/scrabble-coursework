
function findPlacement (target) {
  let boxClass = target.classList[0]
  let coord = target.classList[1]
  let currentPlacement = ''
  
  if (boxClass === 'box') {
    currentPlacement = 'plain'   
  } else if (boxClass === 'box-dark-pink' && coord != 'H8') {
    currentPlacement = '3W'    
  } else if (boxClass === 'box-light-pink') {
    currentPlacement = '2W'    
  } else if (boxClass === 'box-dark-blue') {
    currentPlacement = '3L'    
  } else if (boxClass === 'box-light-blue') {
    currentPlacement = '2L'  
  } else {
    currentPlacement = '★'    
  }
  console.log(currentPlacement)
  console.log(coord)

  return ({placement: currentPlacement, coords: coord})
}
