// Drag move listener function - listens to movements when a drag event occurs and keeps the position of the x and y positioning
function dragMoveListener (event) {
  const target = event.target
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // Translate the element to pixels
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

  // Update the position attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

function snapEvent(event) {
  let dropRect = interact.getElementRect(event.target)
  dropCenter = {
    x: dropRect.left + dropRect.width / 2,
    y: dropRect.top + dropRect.height / 2
  }
  console.log(dropCenter)
  console.log(event)
  event.draggable.draggable({
    snap: {
      targets: [dropCenter]
    }
  });
}

function dragEnter(event) {
    const draggableElement = event.relatedTarget
      const dropzoneElement = event.target
  
      if (dropzoneElement.classList.contains('occupied') == false) {
        // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        snapEvent(event)
      }
  }
  
  function dragLeave(event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    if (event.relatedTarget.classList.contains('dropped-tile')) {
      event.target.classList.remove('occupied')
      event.relatedTarget.classList.remove('dropped-tile')
    }
  }
  
  function onDrop(event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.target.classList.add('occupied')
    event.relatedTarget.classList.add('dropped-tile')
    findPlacement(event.target.classList[0])
  }
  
  function dropDeactivate(event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }