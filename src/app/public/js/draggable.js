
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

interact('.box').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '#droppable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.box-light-pink').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '#droppable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.box-light-blue').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '#droppable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.box-dark-pink').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '#droppable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.box-dark-blue').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '#droppable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        // restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    listeners: { move: dragMoveListener }
  })
