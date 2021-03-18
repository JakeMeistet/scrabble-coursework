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
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.5,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target
    

    if (dropzoneElement.classList.contains('occupied') == false){
        // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
    }

    dropRect         = interact.getElementRect(dropzoneElement),
    dropCenter       = {
      x: dropRect.left + dropRect.width  / 2,
      y: dropRect.top  + dropRect.height / 2
    };

    event.draggable.draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [
            dropCenter
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        })
      ],
      
    });
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    if (event.relatedTarget.classList.contains('dropped-tile')) {
      event.target.classList.remove('occupied')
      event.relatedTarget.classList.remove('dropped-tile')
    }
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.target.classList.add('occupied')
    event.relatedTarget.classList.add('dropped-tile')
    findPlacement(event.target.classList[0])
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  },
});

interact('.box-light-pink').dropzone({
 // Only accepts elements with id 'droppable' to be dropped into the dropzone
 accept: '.drag-drop',
 // Require a 75% element overlap for a drop to be possible
 overlap: 1,

 // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
 ondragenter: function (event) {
   const draggableElement = event.relatedTarget
   const dropzoneElement = event.target

   if (dropzoneElement.classList.contains('occupied') == false){
       // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
       dropzoneElement.classList.add('drop-target')
       draggableElement.classList.add('can-drop')
   }
 },

 ondragleave: function (event) {
   // When target leaves dropzone, the possible drop feedback styling is removed
   event.target.classList.remove('drop-target')
   event.relatedTarget.classList.remove('can-drop')
   if (event.relatedTarget.classList.contains('dropped-tile')) {
     event.target.classList.remove('occupied')
     event.relatedTarget.classList.remove('dropped-tile')
   }
 },

 ondrop: function (event) {
   // When target is dropped, the possible drop feedback styling is removed
   event.target.classList.remove('drop-target')
   event.relatedTarget.classList.remove('can-drop')
   event.target.classList.add('occupied')
   event.relatedTarget.classList.add('dropped-tile')
   findPlacement(event.target.classList[0])
 },

 ondropdeactivate: function (event) {
   // // When target is no longer being dragged, the drop active feedback styling is removed
   event.target.classList.remove('drop-active')
   event.target.classList.remove('drop-target')
 },
})

interact('.box-light-blue').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 1,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    if (dropzoneElement.classList.contains('occupied') == false){
        // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
    }
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    if (event.relatedTarget.classList.contains('dropped-tile')) {
      event.target.classList.remove('occupied')
      event.relatedTarget.classList.remove('dropped-tile')
    }
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.target.classList.add('occupied')
    event.relatedTarget.classList.add('dropped-tile')
    findPlacement(event.target.classList[0])
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  },
})

interact('.box-dark-pink').dropzone({
 // Only accepts elements with id 'droppable' to be dropped into the dropzone
 accept: '.drag-drop',
 // Require a 75% element overlap for a drop to be possible
 overlap: 1,

 // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
 ondragenter: function (event) {
   const draggableElement = event.relatedTarget
   const dropzoneElement = event.target

   if (dropzoneElement.classList.contains('occupied') == false){
       // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
       dropzoneElement.classList.add('drop-target')
       draggableElement.classList.add('can-drop')
   }
 },

 ondragleave: function (event) {
   // When target leaves dropzone, the possible drop feedback styling is removed
   event.target.classList.remove('drop-target')
   event.relatedTarget.classList.remove('can-drop')
   if (event.relatedTarget.classList.contains('dropped-tile')) {
     event.target.classList.remove('occupied')
     event.relatedTarget.classList.remove('dropped-tile')
   }
 },

 ondrop: function (event) {
   // When target is dropped, the possible drop feedback styling is removed
   event.target.classList.remove('drop-target')
   event.relatedTarget.classList.remove('can-drop')
   event.target.classList.add('occupied')
   event.relatedTarget.classList.add('dropped-tile')
   findPlacement(event.target.classList[0])
 },

 ondropdeactivate: function (event) {
   // // When target is no longer being dragged, the drop active feedback styling is removed
   event.target.classList.remove('drop-active')
   event.target.classList.remove('drop-target')
 },
})

interact('.box-dark-blue').dropzone({
  // Only accepts elements with id 'droppable' to be dropped into the dropzone
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 1,

  // Listens for drop events e.g. drag enters a dropzone, drag leaves a dropzone
  ondragenter: function (event) {
    const draggableElement = event.relatedTarget
    const dropzoneElement = event.target

    if (dropzoneElement.classList.contains('occupied') == false){
        // Changes styling of div on posibility of a drop occuring (feedback from possible drop)
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
    }
  },

  ondragleave: function (event) {
    // When target leaves dropzone, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    if (event.relatedTarget.classList.contains('dropped-tile')) {
      event.target.classList.remove('occupied')
      event.relatedTarget.classList.remove('dropped-tile')
    }
  },

  ondrop: function (event) {
    // When target is dropped, the possible drop feedback styling is removed
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.target.classList.add('occupied')
    event.relatedTarget.classList.add('dropped-tile')
    findPlacement(event.target.classList[0])
  },

  ondropdeactivate: function (event) {
    // // When target is no longer being dragged, the drop active feedback styling is removed
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  },
})
var startPos = null;
interact('.drag-drop').draggable({

    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.parent',
        endOnly: true
      }),
      interact.modifiers.snap({
        targets: [
          interact.snappers.grid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      })
    ],
    autoScroll: true,
    listeners: { move: dragMoveListener },

      

});
