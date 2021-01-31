//////////////user manual button function
let infoBtn = document.getElementById("infoBtn");
let infoSec = document.querySelector(".infoContainer");

// document.body.addEventListener("click", function () {
//   infoSec.style.display ==="none";
//   //colorChoice.style.display ==="none";
// },false)

infoBtn.addEventListener("click", function () {
  infoDisplay();
});

infoDisplay = () => {
 infoSec.style.display ==="none" ? infoSec.style.display = "block" : infoSec.style.display = "none";
}

/////////color choice feature
let paletteBtn = document.querySelectorAll(".colorBtn");
let colorChoice = document.querySelectorAll(".noteColor");
let colors = document.querySelectorAll(".noteColor > div");
let note = document.querySelectorAll(".stickyNote");
let notesArr = Array.from(note);

paletteBtn.forEach(el => {
  console.log(paletteBtn)
  let id = el.closest(".stickyNote").getAttribute("id");
  el.addEventListener("click", function () {
    if (colorChoice[id].style.display == "flex") {
        colorChoice[id].style.display = "none";
    } else {
      colorChoice[id].style.display = "flex";
      changeNoteColor(id);
}})});

changeNoteColor = (id) => {
  colors.forEach(el => {
    el.addEventListener("click", function () {
      el.getAttribute("class") === "noteColor1" ? note[id].style.backgroundColor = "#abd0ec" : 
      el.getAttribute("class") === "noteColor2" ? note[id].style.backgroundColor = "#a8c498" : 
      el.getAttribute("class") === "noteColor3" ? note[id].style.backgroundColor = "#f8ced8" : 
      el.getAttribute("class") === "noteColor4" ? note[id].style.backgroundColor = "#ccb6fa" : 
      el.getAttribute("class") === "noteColor5" ? note[id].style.backgroundColor = "#ffd966" : false;
    colorChoice[id].style.display === "none";
    })
  })
}

/////////new note feature
let newNoteBtn = document.getElementById("newNoteBtn");
let main = document.querySelector("main")

newNoteBtn.addEventListener("click", function () {
  let noteCount = notesArr.length;
  let clone = note[0].cloneNode(true);
  clone.id = noteCount;
  notesArr.push(clone.id);
  clone.class = "stickyNote";
  main.appendChild(clone);
})

//////////delete Note feature
let deleteNote = document.querySelectorAll(".delete");
deleteNote.forEach(el => {
  let id = el.closest(".stickyNote").getAttribute("id");
  el.addEventListener("click", function () {
    deleteNote(id);
  });
})

deleteNote = (id) => {
  main.removeChild(note[id]);
}

/////////////feature to delete all notes
let deleteAll = document.getElementById("deleteAllBtn");
deleteAll.addEventListener("click", function () {
  deleteAllNotes();
})
deleteAllNotes = () => {
  notesArr.forEach(el => {
    main.removeChild(el);
  })
  localStorage.clear();
}

////////local storage setup
store = () => {
  let storedNotes = localStorage.getItem("notes");
  if (storedNotes){

  }
}