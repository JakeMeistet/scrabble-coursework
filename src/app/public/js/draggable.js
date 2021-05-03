const droppedItems = [];
let startPos = null;

/*  This sets out all the 'rules' and defines the element with class .drag-drop
as a draggable element using the interact.js drag drop api */
interact('.drag-drop').draggable({
  /*  This is the basic ruleset for snapping
  The target will be startPos (as mentioned below this is the dropzone
  from which the element was dragged from/ last dragged over)
  - If the element is not dropped on a valid dropzone it will drop here
  - relativePoints specifies that the snap should be to the centre of the
  dropzone  */
  snap: {
    targets: [startPos],
    range: Infinity,
    relativePoints: [{ x: 0.5, y: 0.5 }],
    endOnly: true,
  },
  /*  When a drag starts, the element is removed from the droppedItems
  array if necessary as the element is no longer dropped on the gameboard  */
  onstart: function (event) {
    const rect = interact.getElementRect(event.target);
    console.log(droppedItems);
    if (droppedItems.length !== 0) {
      for (let i = 0; i < droppedItems.length; i++) {
        if (droppedItems[i].tile === event.target.classList[0]) {
          removeElement(droppedItems, droppedItems[i]);
        }
      }
    }

    console.log(droppedItems);
    /*  This will record the center of the first drag
    (the dropzone in which an element leaves)
    - If the draggable element is not dropped in a valid dropzone
    it snaps back to these coordinates (that dropzone)  */
    startPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    event.interactable.draggable({
      snap: {
        targets: [startPos],
      },
    });
  },

  /*  Every time a dragmove event occurs this function is called
  - It keeps the current dragged position for the element in the x, y attributes
  - Then it translates the element and updates the position attributes for that element  */
  onmove: function (event) {
    x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    event.target.style.webkitTransform =
    event.target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    event.target.setAttribute('data-x', x);
    event.target.setAttribute('data-y', y);
    event.target.classList.add('getting--dragged');
  },

  /*  When an element is no longer being dragged the
  relevant classes are removed  */
  onend: function (event) {
    event.target.classList.remove('getting--dragged');
  },
});

/* Everything below defines what to do oon each of the different dropzones
(.box, .box-light-pink, .box-dark-pink, .box-light-blue, .box-dark-blue and .drop-box)
- .drop-box: this simply is where the user's 7 pieces are stored
- the other boxes are all the board placements, the colours depend on whether they are a special
box or not

- accept, only accepts elements with the id 'drag-drop'
- overlap: allows for an element to only be hovered over
50% of a dropzone to allow a drop

- all others listen for events:
  ondragenter - when a draggable element enters a dropzone
  ondragleave - when a draggable element leaves a dropzone
  ondrop - when a draggable element is dropped in a dropzone
  ondropdeactivate - when a draggable element is no longer being dragged  */

interact('.box').dropzone({
  accept: '.drag-drop',
  overlap: 0.5,
  ondragenter: function (event) {
    dragEnter(event);
  },

  ondragleave: function (event) {
    dragLeave(event);
  },
  ondrop: function (event) {
    onDrop(event);
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event);
  },
});

interact('.box-light-pink').dropzone({
  accept: '.drag-drop',
  overlap: 0.5,

  ondragenter: function (event) {
    dragEnter(event);
  },

  ondragleave: function (event) {
    dragLeave(event);
  },

  ondrop: function (event) {
    onDrop(event);
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event);
  },
});

interact('.box-light-blue').dropzone({
  accept: '.drag-drop',
  overlap: 0.5,

  ondragenter: function (event) {
    dragEnter(event);
  },

  ondragleave: function (event) {
    dragLeave(event);
  },

  ondrop: function (event) {
    onDrop(event);
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event);
  },
});

interact('.box-dark-pink').dropzone({
  accept: '.drag-drop',
  overlap: 0.5,

  ondragenter: function (event) {
    dragEnter(event);
  },

  ondragleave: function (event) {
    dragLeave(event);
  },

  ondrop: function (event) {
    onDrop(event);
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event);
  },
});

interact('.box-dark-blue').dropzone({
  accept: '.drag-drop',
  overlap: 0.5,

  ondragenter: function (event) {
    dragEnter(event);
  },

  ondragleave: function (event) {
    dragLeave(event);
  },

  ondrop: function (event) {
    onDrop(event);
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event);
  },
});

interact('.drop-box').dropzone({
  accept: '.drag-drop',
  overlap: 0.5,

  ondragenter: function (event) {
    dragEnter(event);
  },

  ondragleave: function (event) {
    dragLeave(event);
  },

  ondrop: function (event) {
    onDrop(event);
  },

  ondropdeactivate: function (event) {
    dropDeactivate(event);
  },
});
