
function findPlacement (boxClass, text) {
  let currentPlacement = ''
  if (boxClass === 'box') {
    currentPlacement = 'plain'
    console.log(currentPlacement)
  } else if (boxClass === 'box-dark-pink' && text != '★') {
    currentPlacement = '3W'
    console.log(currentPlacement)
  } else if (boxClass === 'box-light-pink') {
    currentPlacement = '2W'
    console.log(currentPlacement)
  } else if (boxClass === 'box-dark-blue') {
    currentPlacement = '3L'
    console.log(currentPlacement)
  } else if (boxClass === 'box-light-blue') {
    currentPlacement = '2L'
    console.log(currentPlacement)
  } else {
    currentPlacement = '★'
    console.log(currentPlacement)
  }
}
