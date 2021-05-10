/*  This function is called when a snap event occurrs
- What this does is gets the coordinates of the dropzone centre
and snaps the tile (dragged item) to the dropzone
- Will only be called after a drop event  */
function snapEvent(event) {
  const dropRect = interact.getElementRect(event.target);
  // dropCenter is the centre coords of the dropzone
  dropCenter = {
    x: dropRect.left + dropRect.width / 2,
    y: dropRect.top + dropRect.height / 2,
  };
  console.log(dropRect.top, dropRect.left);
  console.log(event);
  event.draggable.draggable({
    // This initiates the snap to dropCentre
    snap: {
      targets: [dropCenter],
    },
  });
}

/*  This function is called when a dragEnter event occurs
- It simply changes different styling of the dropzone on drag enter  */
function dragEnter(event) {
  const draggableElement = event.relatedTarget;
  const dropzoneElement = event.target;

  if (dropzoneElement.classList.contains('occupied') === false) {
    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
    snapEvent(event);
  }
}

/*  This function is called when a dragLeave event occurs
- Resets the dropzone's styling and removes any 'occupied' classlist if it exists  */
function dragLeave(event) {
  // When target leaves dropzone, the possible drop feedback styling is removed
  event.target.classList.remove('drop-target');
  event.relatedTarget.classList.remove('can-drop');
  if (event.relatedTarget.classList.contains('dropped-tile')) {
    event.target.classList.remove('occupied');
    event.relatedTarget.classList.remove('dropped-tile');
  }
}

/*  This function is called on a dropEvent
- Possible drop styling is removed and the occupied class is added to prevent and further drops in the dropzone
- The tile dropped is also pushed to the droppedItems array to keep track of placed pieces  */
function onDrop(event) {
  event.target.classList.remove('drop-target');
  event.relatedTarget.classList.remove('can-drop');
  event.target.classList.add('occupied');
  event.relatedTarget.classList.add('dropped-tile');
  const data = { tile: event.relatedTarget.classList[0], dropZone: event.target.classList[1] };
  if (event.target.classList[0] !== 'drop-box') {
    droppedItems.push(data);
    console.log(`[LOG]  Dropped Items Add: ${droppedItems}`);
  } else {
    removeElement(droppedItems, data);
    console.log(`[LOG]  Dropped Items Remove: ${droppedItems}`);
  }
  console.log(`[LOG]  Dropped Items Complete: ${droppedItems}`);
}

/*  This function is called when a target is no longer being dragged
any active drop styling will be removed  */
function dropDeactivate(event) {
  event.target.classList.remove('drop-active');
  event.target.classList.remove('drop-target');
}

//  This is an issue to be fixed, not knowing where to declare these shared arrays
// const previousWords = [];
// const allDropped = [];

/*  This function is called once all the board is generated and waits for the user to finish
their turn by pressing the finish turn button, then the game continues  */
function finishGo(gameId) {
  const turnEnd = document.getElementById('finishBtn');
  turnEnd.addEventListener('click', () => {
    if (droppedItems.length !== 0) {
      socket.emit('saveDropped', { droppedItems: droppedItems, gameId: gameId });
    } else {
      console.log('[LOG]  Please play your turn or skip');
      window.alert('Please play your turn or skip');
    }
  });

  /*  This is used to generate the skip button for both users in the game
  this button will allow the user to skip their turn by replacing their pieces  */
  const skip = document.getElementById('skipBtn');
  skip.addEventListener('click', () => {
    const pieces = [];
    for (let i = 0; i < 7; i++) {
      const dropBox = document.getElementById(`${i}dropBox`);
      const child = dropBox.childNodes[0];
      pieces.push(child.id);
      dropBox.removeChild(child);
    }
    socket.emit('skip', { pieces: pieces, gameId: gameId });
  });
}
