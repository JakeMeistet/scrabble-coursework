
function snapEvent(event) {
  let dropRect = interact.getElementRect(event.target)
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
    let dropDetails = findPlacement(event.target)
    let dropRect = interact.getElementRect(event.relatedTarget)
    if (event.target.classList[0] != 'drop-box') {
      event.relatedTarget.style.visibility = "hidden"
      dropSocket({top: dropRect.top, left: dropRect.left, tile: event.relatedTarget.classList[0], placement: dropDetails.placement, coords: dropDetails.coords})
    }

  }
  
  function dropDeactivate(event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }

  function finishTurn() {
    const turnEnd = document.getElementById = 'finishBtn'
    turnEnd.addEventListener('click', () => {

    })
    
  }