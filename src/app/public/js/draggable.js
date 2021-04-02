

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

var startPos = null
interact('.drag-drop').draggable({
  snap: {
    targets: [startPos],
    range: Infinity,
    relativePoints: [ { x: 0.5, y: 0.5 } ],
    endOnly: true
  },
  onstart: function (event) {
      var rect = interact.getElementRect(event.target);

      // record center point when starting the very first a drag
      startPos = {
        x: rect.left + rect.width  / 2,
        y: rect.top  + rect.height / 2
      }

    event.interactable.draggable({
      snap: {
        targets: [startPos]
      }
    });
  },
  // call this function on every dragmove event
  onmove: function (event) {
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    event.target.style.webkitTransform =
    event.target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    event.target.setAttribute('data-x', x);
    event.target.setAttribute('data-y', y);
    event.target.classList.add('getting--dragged');
  },
  onend: function (event) {
    event.target.classList.remove('getting--dragged')
  }
})

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

interact('.box').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    dragEnter(event)
  },

  ondragleave: function (event) {
    dragLeave(event)
  },

  ondrop: function (event) {
    onDrop(event)
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event)
  }
})

interact('.box-light-pink').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    dragEnter(event)
  },

  ondragleave: function (event) {
    dragLeave(event)
  },

  ondrop: function (event) {
    onDrop(event)
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event)
  }
})

interact('.box-light-blue').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    dragEnter(event)
  },

  ondragleave: function (event) {
    dragLeave(event)
  },

  ondrop: function (event) {
    onDrop(event)
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event)
  }
})

interact('.box-dark-pink').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    dragEnter(event)
  },

  ondragleave: function (event) {
    dragLeave(event)
  },

  ondrop: function (event) {
    onDrop(event)
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event)
  }
})

interact('.box-dark-blue').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    dragEnter(event)
  },

  ondragleave: function (event) {
    dragLeave(event)
  },

  ondrop: function (event) {
    onDrop(event)
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event)
  }
})