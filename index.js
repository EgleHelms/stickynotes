
let paletteBtn = document.getElementById("palette");
let colorChoice = document.getElementById("noteColor");

paletteBtn.addEventListener("mouseover", function () {
    if (colorChoice.style.display === "none") {
        colorChoice.style.display = "flex";
      } else {
        colorChoice.style.display = "none";
      }
})