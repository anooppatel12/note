const addNoteIcon = document.getElementById('add-note');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
  displayNotes(filteredNotes);
});
addNoteIcon.addEventListener('click', () => {
  const noteInterface = document.createElement('div');
  noteInterface.classList.add('note-interface');

  const titleInput = document.createElement('input');
  titleInput.classList.add('title');
  titleInput.placeholder = 'Title';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Write your note here...';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');

  const timeSpan = document.createElement('span');
  timeSpan.classList.add('time');
  timeSpan.textContent = 'Time: ' + new Date().toLocaleTimeString();

  const charactersSpan = document.createElement('span');
  charactersSpan.classList.add('characters');
  charactersSpan.textContent = 'Characters: 0';

  infoDiv.appendChild(timeSpan);
  infoDiv.appendChild(charactersSpan);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  noteInterface.appendChild(titleInput);
  noteInterface.appendChild(textarea);
  noteInterface.appendChild(infoDiv);
  noteInterface.appendChild(saveButton);

  document.body.appendChild(noteInterface);

  saveButton.addEventListener('click', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (titleInput.value.trim() && textarea.value.trim()) {
      notes.push({
        title: titleInput.value,
        content: textarea.value,
        time: new Date().toLocaleTimeString(),
        characters: textarea.value.length
      });
      localStorage.setItem('notes', JSON.stringify(notes));

      // Hide the note interface after saving
      noteInterface.remove();
    } else {
      alert('Please enter a title and some content for the note.');
    }
  });

  textarea.addEventListener('input', () => {
    charactersSpan.textContent = 'Characters: ' + textarea.value.length;
  });
});

const notes = JSON.parse(localStorage.getItem('notes')) || [];
const notesContainer = document.getElementById('notes-container');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
  displayNotes(filteredNotes);
});

function displayNotes(notes) {
  notesContainer.innerHTML = '';
notes.forEach(note => {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');

  const titleElement = document.createElement('h2');
  titleElement.textContent = note.title;
  noteElement.appendChild(titleElement);

  const contentElement = document.createElement('p');
  contentElement.textContent = note.content;
  noteElement.appendChild(contentElement);

  const timeElement = document.createElement('p');
  timeElement.textContent = 'Time: ' + note.time;
  timeElement.id = 'time-element';
  noteElement.appendChild(timeElement);

  const charactersElement = document.createElement('p');
  charactersElement.textContent = 'Characters: ' + note.characters;
  charactersElement.id = 'characters-element';
  noteElement.appendChild(charactersElement);

  const deleteNoteButton = document.createElement('button');
  deleteNoteButton.textContent = 'Delete';
  deleteNoteButton.className = 'btn deleteBtn'
  noteElement.appendChild(deleteNoteButton);

  deleteNoteButton.addEventListener('click', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const index = notes.findIndex(note => note.title === titleElement.textContent);
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));

    // Remove the note element from the DOM
    noteElement.remove();
  });

  const editNoteButton = document.createElement('button');
  editNoteButton.textContent = 'Show';
  editNoteButton.className = 'btn editBtn'
  noteElement.appendChild(editNoteButton);

  editNoteButton.addEventListener('click', () => {
  const editInterface = document.createElement('div');
  editInterface.classList.add('edit-interface');

  const titleInput = document.createElement('input');
  titleInput.value = note.title;
  titleInput.classList.add('heading');
  titleInput.placeholder = 'Title';

  const contentInput = document.createElement('textarea');
  contentInput.value = note.content;
  contentInput.classList.add('content-input');
  contentInput.placeholder = 'Write your note here...';

  const inforDiv = document.createElement('div');
  inforDiv.classList.add('info');

  const timeSpan = document.createElement('span');
  timeSpan.classList.add('time');
  timeSpan.textContent = 'Time: ' + new Date().toLocaleTimeString();

  const charactersSpan = document.createElement('span');
  charactersSpan.classList.add('characters');
  charactersSpan.textContent = 'Characters: 0';

  inforDiv.appendChild(timeSpan);
  inforDiv.appendChild(charactersSpan);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.id = 'cancelbtn'
  cancelButton.className = 'cancelBtn'

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.id = 'savebtn'
  saveButton.className = 'saveBtn'

  editInterface.appendChild(titleInput);
  editInterface.appendChild(contentInput);
  editInterface.appendChild(inforDiv);
  editInterface.appendChild(cancelButton);
  editInterface.appendChild(saveButton);

  document.body.appendChild(editInterface);

  cancelButton.addEventListener('click', () => {
    editInterface.remove();
  });

  saveButton.addEventListener('click', () => {
    note.title = titleInput.value;
    note.content = contentInput.value;
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const index = notes.findIndex(note => note.title === titleElement.textContent);
    notes[index].title = note.title;
    notes[index].content = note.content;
    notes[index].time = new Date().toLocaleTimeString();
    notes[index].characters = contentInput.value.length;
    localStorage.setItem('notes', JSON.stringify(notes));
    
    timeElement.textContent = 'Time: ' + notes[index].time;
    charactersElement.textContent = 'Characters: ' + notes[index].characters;

    editInterface.remove();
  });

  contentInput.addEventListener('input', () => {
  charactersSpan.textContent = 'Characters: ' + contentInput.value.length;
  });

  });

  notesContainer.appendChild(noteElement);
});
}

// Display all notes by default
displayNotes(notes);


// Add event listener to the search button

const checkImage = document.getElementById('check-image');
const dotsImage = document.getElementById('dots-image');
const searchIcon = document.querySelector('#search-container img');

searchIcon.addEventListener('click', () => {
  if (searchInput.style.display === 'none') {
    searchInput.style.display = 'block';
    searchButton.style.display = 'block';
    checkImage.style.display = 'none'
    dotsImage.style.display = 'none'
  } else {
    searchInput.style.display = 'none';
    searchButton.style.display = 'none';
    checkImage.style.display = 'block'
    dotsImage.style.display = 'block'
  }
});

// Hide the search input and button by default
searchInput.style.display = 'none';
searchButton.style.display = 'none';


