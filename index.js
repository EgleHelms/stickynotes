let paletteBtn = document.querySelectorAll(".colorBtn");
let colorChoice = document.querySelectorAll(".noteColor");
let colors = document.querySelectorAll(".noteColor > div");
let note = document.querySelectorAll(".stickyNote");
let newNoteBtn = document.getElementById("newNoteBtn");
let main = document.querySelector("main");
let notesNodeList = main.childNodes;  //live node list - dynamically added html elements get displayed right away

//////////////user manual button function
let infoBtn = document.getElementById("infoBtn");
let infoSec = document.querySelector(".infoContainer");

infoBtn.addEventListener("click", function () {
  infoSec.style.display ==="none" ? infoSec.style.display = "block" : infoSec.style.display = "none";
});


function setIdToNotes(id) {
  let clone = createNewNote();
  if (id) {
    clone.setAttribute("id", id);
  }
  return clone; 
}

/////////new note  - navbar "+" button
newNoteBtn.addEventListener("click", createNewNote);

function createNewNote () {
  ///cloning the first note
  let noteCount = notesNodeList.length;
  let clone = note[0].cloneNode(true);
  clone.id = noteCount;
  clone.classList.add("stickyNote");
  clone.classList.remove("hide");
  main.appendChild(clone);

  ///delete feature of the single note   //accesing trash button on the note via live notes nodelist
  let deleteBtn = 
    Array.from(Array.from(Array.from(Array.from(clone.children)
      .filter(el => el.className == "noteHead")[0].children)
      .filter(el => el.classList.contains("headBtns"))[0].children))
      .filter(el => el.classList.contains("list-item"))[1];

  deleteBtn.addEventListener("click", deleteNote);

///change color feature of the single note
  let paletteBtn = 
    Array.from(Array.from(Array.from(Array.from(clone.children)
    .filter(el => el.className == "noteHead")[0].children)
    .filter(el => el.classList.contains("headBtns"))[0].children))
    .filter(el => el.classList.contains("list-item"))[0];

  paletteBtn.addEventListener("click", showColors);

  let noteContent = Array.from(Array.from(clone.children)
    .filter(el => el.className == "noteContentContainer")[0].children)
    .filter(el => el.classList.contains("noteContent"))[0]; 

  noteContent.value = "";
  noteContent.addEventListener("change", (e) => store(e));
  //noteContent.addEventListener("onchange", notSavedAlert)
}

deleteNote = (e) => {
  let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
  localStorage.removeItem(id) 
  let notesArray = getNotesArray();
  if (notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
      if (id == notesArray[i]) {
        notesArray.splice(i, 1);
      }
    }
  localStorage.setItem("notesArray", JSON.stringify(notesArray));
  removeFromDOM(id);
  }
}

removeFromDOM = (id) => {
  var note = document.getElementById(id);
  note.parentNode.removeChild(note);
}

function showColors (e) {
  let colorChoice = e.target.parentNode.parentNode.nextElementSibling
  if (colorChoice.style.display == "flex") {
      colorChoice.style.display = "none";
  } else {
    colorChoice.style.display = "flex";
    changeNoteColor(e);
}
};

changeNoteColor = (e) => {
  let colorChoice = e.target.parentNode.parentNode.nextElementSibling
  let colors = e.target.parentNode.parentNode.nextElementSibling.children
  let colorsArr = Array.from(colors);
  let note = e.target.parentNode.parentNode.parentNode.parentNode
colorsArr.forEach(el => {
  el.addEventListener("click", function (e) {
    el.getAttribute("class") === "noteColor1" ? note.style.backgroundColor = "#abd0ec" : 
    el.getAttribute("class") === "noteColor2" ? note.style.backgroundColor = "#a8c498" : 
    el.getAttribute("class") === "noteColor3" ? note.style.backgroundColor = "#f8ced8" : 
    el.getAttribute("class") === "noteColor4" ? note.style.backgroundColor = "#ccb6fa" : 
    el.getAttribute("class") === "noteColor5" ? note.style.backgroundColor = "#ffd966" : false;

    if ( e.target !== colorChoice) {
      colorChoice.style.display = 'none';
    }
  })
})}

/////////////feature to delete all notes
let deleteAll = document.getElementById("deleteAllBtn");
deleteAll.addEventListener("click", function () {
  deleteAllNotes();
})

deleteAllNotes = () => {
  localStorage.clear();

  let main = document.querySelector("main");
  while (main.children.length > 1) {
    main.removeChild(main.lastChild);
  }
  document.querySelector(".stickyNote").style.backgroundColor = "#ffd966" ;
  document.querySelector(".noteContent").value = "";
}

////////local storage setup

const store = (e) => {
  let notesArray = getNotesArray();
  let note = e.target.parentNode.parentNode;
  let id = note.id;
  let noteContent = e.target.value;
  let noteColor =  getComputedStyle(note).backgroundColor;

  let notesObj = {
    id: id,
    content: noteContent,
    color: noteColor
  };

  if (notesArray === []){
    notesArray.push(notesObj);
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
  } else {
    notesArray.forEach(el => {
      if (el.id === id){
        el.content = content;
        el.color = color;
      }
    })
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
  }
}

function setIdToNotes(id) {
  let clone = createNewNote();
  if (id) {
    clone.setAttribute("id", id);
  }
  return clone; 
}

function addOldNotesToDOM() {
  let notesArray = getNotesArray();
  notesArray.forEach((el,i)=>{
    let clone = setIdToNotes(); 
    Array.from(Array.from(clone.children)
    .filter(el => el.className == "noteContentContainer")[0].children)
    .filter(el => el.classList.contains("noteContent"))[0].value = note.content
    getComputedStyle(clone).backgroundColor = note.color;
  })
}

getNotesArray = () => {
  let notesArray = localStorage.getItem("notesArray");
  if (!notesArray){
    notesArray = [];
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
  } else {
    notesArray = JSON.parse(notesArray);
  }
  return notesArray;
}
