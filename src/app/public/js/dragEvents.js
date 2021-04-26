
function snapEvent (event) {
  const dropRect = interact.getElementRect(event.target)
  dropCenter = {
    x: dropRect.left + dropRect.width / 2,
    y: dropRect.top + dropRect.height / 2
  }
  console.log(dropRect.top, dropRect.left)
  console.log(event)
  event.draggable.draggable({
    snap: {
      targets: [dropCenter]
    }
  })
}

function dragEnter (event) {
  const draggableElement = event.relatedTarget
  const dropzoneElement = event.target

  if (dropzoneElement.classList.contains('occupied') == false) {
    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    snapEvent(event)
  }
}

function dragLeave (event) {
  // When target leaves dropzone, the possible drop feedback styling is removed
  event.target.classList.remove('drop-target')
  event.relatedTarget.classList.remove('can-drop')
  if (event.relatedTarget.classList.contains('dropped-tile')) {
    event.target.classList.remove('occupied')
    event.relatedTarget.classList.remove('dropped-tile')
  }
}

function onDrop (event) {
  // When target is dropped, the possible drop feedback styling is removed
  event.target.classList.remove('drop-target')
  event.relatedTarget.classList.remove('can-drop')
  event.target.classList.add('occupied')
  event.relatedTarget.classList.add('dropped-tile')
  // const dropDetails = findPlacement(event.target)
  if (event.target.classList[0] != 'drop-box') {
    const data = { tile: event.relatedTarget.classList[0], dropZone: event.target.classList[1] }
    droppedItems.push(data)
    console.log(droppedItems)
  }
}

function dropDeactivate (event) {
  // // When target is no longer being dragged, the drop active feedback styling is removed
  event.target.classList.remove('drop-active')
  event.target.classList.remove('drop-target')
}

function finishGo (gameId, allDropped, previousWords) {
  const turnEnd = document.getElementById('finishBtn')
  console.log(turnEnd)
  turnEnd.addEventListener('click', () => {
    socket.emit('saveDropped', { droppedItems: droppedItems, gameId: gameId, previousWords: previousWords, allDropped: allDropped })
  })
}
