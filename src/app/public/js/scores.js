
function findPlacement (boxClass, text) {
  let currentPlacement = ''
  if (boxClass === 'box') {
    currentPlacement = 'plain'
    console.log('this is a plain box')
  } else if (boxClass === 'box-dark-pink' && text != '★') {
    console.log('3W')
  } else if (boxClass === 'box-light-pink') {
    console.log('2W')
  } else if (boxClass === 'box-dark-blue') {
    console.log('3L')
  } else if (boxClass === 'box-light-blue') {
    console.log('2L')
  } else {
    console.log('★')
  }
}
