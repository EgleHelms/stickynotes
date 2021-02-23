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

infoSec.style.display = "none";

infoBtn.addEventListener("mouseover", function (e) {
  infoSec.style.display ==="none" ? infoSec.style.display = "block" : infoSec.style.display ==="none"
});

infoBtn.addEventListener("mouseout", (e) => {
  e.target !== infoBtn || e.target !== infoSec ? infoSec.style.display = "none": infoSec.style.display = "none";
});

/////////new note  - navbar "+" button
newNoteBtn.addEventListener("click", createNewNote);

function createNewNote () {
  ///cloning the first note
  let createID = new Date().getTime()
  let clone = note[0].cloneNode(true);
  clone.id = "n"+createID;
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
  return clone;
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
  deteteNoteFromStorage(id);
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

    let id = note.id;
    if (e.target.id === id){
      store(e);
    }
  })
})}

/////////////feature to delete all notes
let deleteAll = document.getElementById("deleteAllBtn");
deleteAll.addEventListener("click", function () {
  deleteAllNotes();
})

const deleteAllNotes = () => {
  localStorage.clear();

  let main = document.querySelector("main");
  while (main.children.length > 1) {
    main.removeChild(main.lastChild);
  }
  document.querySelector(".stickyNote").style.backgroundColor = "#ffd966" ;
  document.querySelector(".noteContent").value = "";
}

const changeContentOfNote = () => {

}

function deteteNoteFromStorage (id) {
  let notesArray = getNotesArray();
  notesArray.forEach((el,i) => {
    if (id !== el.id) {
      notesArray.splice(i,1);
    }
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
  })
}

////////local storage setup
window.addEventListener('load', (e) => {
  getNotesArray();
  addOldNotesToDOM();
});

getNotesArray = () => {
  let notesArray = localStorage.getItem("notesArray");
  if (notesArray === null){
    notesArray = [];
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
  } else {
    notesArray = JSON.parse(notesArray);
  }
  return notesArray;
}

const store = (e) => {
  let notesArray = getNotesArray();
  let note = e.target.parentNode.parentNode;
  let id = note.id;
  let noteContent = e.target.value;
  let noteColor =  getComputedStyle(note).backgroundColor;

  let notesObj = {
    id: id,
    content: noteContent,
    color: noteColor,
    notePosition: "bla",
  };

  if (notesArray.length > 0){
    notesArray.forEach((el,i) => {
      if (el.id === id){
        notesArray.splice(i,1, notesObj);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
        console.log(notesArray);
      } else {
        notesArray.push(notesObj);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
      }
    })
  } else {
    notesArray.push(notesObj);
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
  }
}

function addOldNotesToDOM() {
  let notesArray = getNotesArray();
  notesArray.forEach((el,i)=>{
    let clone = createNewNote();
    clone.id = el.id;
    let cloneTextArea = document.querySelector(`#${el.id}`).querySelector(".noteContentContainer").getElementsByTagName("textarea")
    cloneTextArea[0].value = el.content;
    clone.style.backgroundColor = el.color; 
  })
}
