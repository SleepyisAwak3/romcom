var homeButton = document.querySelector(".home-button.hidden");
var randomCoverButton = document.querySelector(".random-cover-button");
var saveCoverButton = document.querySelector(".save-cover-button");
var viewSavedButton = document.querySelector(".view-saved-button");
var makeOwnCoverButton = document.querySelector(".make-new-button");
var makeMyBookButton = document.querySelector(".create-new-book-button");

var covImage = document.querySelector(".cover-image");
var covTitle = document.querySelector(".cover-title");
var firstCovTag = document.querySelector(".tagline-1");
var secCovTag = document.querySelector(".tagline-2");

var homePageSection = document.querySelector(".main-cover");
var savedCoversMain = document.querySelector(".view.saved-view.hidden");
var savedCoversSection = document.querySelector('.saved-covers-section');

var viewingSaved = false;



var newCoverForm = document.querySelector(".view.form-view.hidden");

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;



document.onload = makeCovAndUpdate();
randomCoverButton.addEventListener("click", makeCovAndUpdate);
saveCoverButton.addEventListener("click", saveCover);
viewSavedButton.addEventListener("click", viewSavedCovers);
makeOwnCoverButton.addEventListener("click", viewForm);
homeButton.addEventListener("click", viewHome);
makeMyBookButton.addEventListener("click", saveFormData);




function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function makeCovAndUpdate() {
  newRandCover();
  updateHome();
};

function newRandCover() {
  currentCover = new Cover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)])
};

function updateHome() {
  covImage.src = currentCover.cover;
  covTitle.innerText = currentCover.title;
  firstCovTag.innerText = currentCover.tagline1;
  secCovTag.innerText = currentCover.tagline2;
};

function saveCover() {
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id === currentCover.id) {
      return;
    };
  };
  savedCovers.push(currentCover);
};

function viewSavedCovers() {
  viewingSaved = true;
  randomCoverButton.classList.add("hidden");
  saveCoverButton.classList.add("hidden");
  homePageSection.classList.add("hidden");
  newCoverForm.classList.add("hidden");
  homeButton.classList.remove("hidden");
  savedCoversMain.classList.remove('hidden');
  
  for (var i = 0; i < savedCovers.length; i++) {
    displaySavedCovers(i);
  };
};

function displaySavedCovers(numCycle) {
  var display = document.createElement("div");
  var smallImage = document.createElement("img");
  var smallPage = document.createElement("p");
  var smallTag = document.createElement("p");
  
  savedCoversSection.appendChild(display);
  
  addClass(display, smallImage, smallPage, smallTag);
  
  smallImage.setAttribute("id", `coverImg${numCycle}`);
  smallImage.src = savedCovers[numCycle].cover;
  display.appendChild(smallImage);
  
  smallPage.setAttribute("id", `coverTitle${numCycle}`);
  smallPage.innerText = savedCovers[numCycle].title;
  display.appendChild(smallPage);
  
  smallTag.setAttribute("id", `coverTags${numCycle}`);
  smallTag.innerText = `A tale of ${savedCovers[numCycle].tagline1} and ${savedCovers[numCycle].tagline2}`;
  display.appendChild(smallTag);
};

function addClass(disp, smlI, smlP, smlT) {
  disp.classList.add("mini-cover");
  smlI.classList.add("mini-cover");
  smlP.classList.add("cover-title");
  smlT.classList.add("tagline");
};

function resetSaved() {
  var hold = document.querySelector("div");
  hold.remove();
};

function loopSaveReset() {
  for (var i = 0; i < savedCovers.length; i++) {
      resetSaved();
  };
};

function viewForm() {
  saveCoverButton.classList.add("hidden");
  homePageSection.classList.add("hidden");
  randomCoverButton.classList.add("hidden");
  homeButton.classList.remove("hidden");
  newCoverForm.classList.remove("hidden");

  if (viewingSaved) {
    loopSaveReset();
    viewingSaved = false;
  };
};

function viewHome() {
  savedCoversMain.classList.add("hidden");
  newCoverForm.classList.add("hidden");
  homeButton.classList.add("hidden");
  saveCoverButton.classList.remove("hidden");
  randomCoverButton.classList.remove("hidden");
  homePageSection.classList.remove("hidden");

  if (viewingSaved) {
    loopSaveReset();
    viewingSaved = false;
  };
};

function saveFormData(event) {
  event.preventDefault();
  var coverInput = document.querySelector("#cover").value;
  var titleInput = document.querySelector("#title").value;
  var desc1Input = document.querySelector("#descriptor1").value;
  var desc2Input = document.querySelector("#descriptor2").value;

  covers.push(coverInput);
  titles.push(titleInput);
  descriptors.push(desc1Input, desc2Input);

  currentCover = new Cover(coverInput, titleInput, desc1Input, desc2Input);

  viewHome();
  updateHome();
 
  document.querySelector("#cover").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#descriptor1").value = "";
  document.querySelector("#descriptor2").value = "";
};
