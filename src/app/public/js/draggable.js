



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

interact('.drop-box').dropzone({
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