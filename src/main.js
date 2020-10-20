//~~~~~~~~~~~~~~~~~~~~~~~~QUERY SELECTOR VARIABLES 👇~~~~~~~~~~~~~~~~~~~~~~~~

  //poster attributes
var title = document.querySelector('.poster-title')
var quote = document.querySelector('.poster-quote')
var image = document.querySelector('img')


  //pages
var posterForm = document.querySelector('.poster-form')
var savedPostersPage = document.querySelector('.saved-posters')
var mainPoster = document.querySelector('.main-poster')
var savedPostersGrid = document.querySelector('.saved-posters-grid')

  //buttons
var showFormButton = document.querySelector('.show-form')
var showSavedButton = document.querySelector('.show-saved')
var showMainButton = document.querySelector('.show-main')
var backToMainButton = document.querySelector('.back-to-main')
var showMyPosterButton = document.querySelector('.make-poster')
var saveThisPosterButton = document.querySelector('.save-poster')
var showAnotherRandomPosterButton = document.querySelector('.show-random')


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DATA 👇~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var images = [
  "./assets/bees.jpg",
  "./assets/bridge.jpg",
  "./assets/butterfly.jpg",
  "./assets/cliff.jpg",
  "./assets/elephant.jpg",
  "./assets/flock.jpg",
  "./assets/fox.jpg",
  "./assets/frog.jpg",
  "./assets/horse.jpg",
  "./assets/lion.jpg",
  "./assets/mountain.jpg",
  "./assets/pier.jpg",
  "./assets/puffins.jpg",
  "./assets/pug.jpg",
  "./assets/runner.jpg",
  "./assets/squirrel.jpg",
  "./assets/tiger.jpg",
  "./assets/turtle.jpg"
];
var titles = [
  "determination",
  "success",
  "inspiration",
  "perspiration",
  "grit",
  "empathy",
  "feelings",
  "hope",
  "believe",
  "try",
  "conviction",
  "accomplishment",
  "achievement",
  "ambition",
  "clarity",
  "challenge",
  "commitment",
  "confidence",
  "action",
  "courage",
  "focus",
  "breathe",
  "gratitude",
  "imagination",
  "kindness",
  "mindfulness",
  "knowledge",
  "opportunity",
  "passion",
  "patience",
  "practice",
  "smile",
  "trust",
  "understanding",
  "wisdom"
];
var quotes = [
  "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
  "You are braver than you believe, stronger than you seem and smarter than you think.",
  "You are confined only by the walls you build yourself.",
  "The one who has confidence gains the confidence of others.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Never bend your head. Always hold it high. Look the world straight in the eye.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe you can and you're halfway there.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
  'Limit your "always" and your "nevers."',
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "The most wasted of days is one without laughter.",
  "You must do the things you think you cannot do.",
  "It isn't where you came from. It's where you're going that counts.",
  "It is never too late to be what you might have been.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
  "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
  "Be the change that you wish to see in the world.",
  "Let us make our future now, and let us make our dreams tomorrow's reality.",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
  "If I cannot do great things, I can do small things in a great way.",
  "Don't wait. The time will never be just right.",
  "With the right kind of coaching and determination you can accomplish anything.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "No matter what people tell you, words and ideas can change the world.",
  "Each person must live their life as a model for others.",
  "A champion is defined not by their wins but by how they can recover when they fall."
];

var savedPosters = [];

var currentPoster = {};

//~~~~~~~~~~~~~~~~~~~~~~~~~~EVENT LISTENERS👇~~~~~~~~~~~~~~~~~~~~~~~~~~

showAnotherRandomPosterButton.addEventListener('click', showAnotherRandomPoster);
showFormButton.addEventListener('click', openForm);
showSavedButton.addEventListener('click', openSavedPosters);
showMainButton.addEventListener('click', openMainPoster);
backToMainButton.addEventListener('click', openMainPoster);
showMyPosterButton.addEventListener('click', showMyPoster);
saveThisPosterButton.addEventListener('click', saveCurrentPoster);
savedPostersGrid.addEventListener('dblclick', function(event) {
  deleteMiniPoster()
})

//~~~~~~~~~~~~~~~~~~~EVENT HANDLERS/HELPERS 👇~~~~~~~~~~~~~~~~~~~~~

//handler for showAnotherRandomPosterButton
function showAnotherRandomPoster() {
  randomizePropertiesOfCurrentPoster();
  displayCurrentPoster();
}

//hander for showMyPosterButton
function showMyPoster() {
  storeCustomPosterAsCurrentPoster();
  savePropertiesForFutureRandomPosters();
  openMainPoster();
  displayCurrentPoster();
}

//handler for showFormButton
function openForm() {
  switchPages(posterForm, mainPoster, savedPostersPage);
}

//handler for showSavedButton
function openSavedPosters() {
  switchPages(savedPostersPage, mainPoster, posterForm);
}

//handler for showMainButton and backToMainButton
function openMainPoster() {
  switchPages(mainPoster, savedPostersPage, posterForm)
}

//handler for saveThisPosterButton
function saveCurrentPoster() {
  var newPoster = new Poster(currentPoster.imageURL, currentPoster.title, currentPoster.quote);
  if(!testIfAnyPosterIsAMatch(savedPosters, newPoster)) {
  savedPosters.push(newPoster);
  updateGridDisplay();
  //addDeleteFunctionalityToMiniPosters();
  }
}

function deleteMiniPoster() {
  removeMiniPosterFromSavedPosters(event.target);
  updateGridDisplay();
}




//~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED INSIDE EVENT HANDLERS 👇~~~~~~~~~~~~~~~~~~~~~~~

//updates HTML for mainPoster based on data model stored in currentPoster
//called in helper handlers for showAnotherRandomPosterButton and showMyPosterButton
function displayCurrentPoster() {
  title.innerText = currentPoster.title;
  quote.innerText = currentPoster.quote;
  image.src = currentPoster.imageURL;
}

//updates data model, as stored in currentPoster object,
//with randomly selected values from images, titles, and quotes arrays
//called in helper handler for showAnotherRandomPosterButton
function randomizePropertiesOfCurrentPoster() {
  currentPoster.imageURL = images[getRandomIndex(images)];
  currentPoster.title = titles[getRandomIndex(titles)];
  currentPoster.quote = quotes[getRandomIndex(quotes)];
}

//gets random index
//called in randomizePropertiesOfCurrentPoster() to choose random image, title, and quote
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

//updates data model, as stored in currentPoster object,
//with custom inputs from form
//called inside helper handler for showMyPosterButton
function storeCustomPosterAsCurrentPoster() {
  var inputImage = document.querySelector('#poster-image-url').value
  var inputTitle = document.querySelector('#poster-title').value
  var inputQuote = document.querySelector('#poster-quote').value
  currentPoster.imageURL = inputImage;
  currentPoster.title = inputTitle;
  currentPoster.quote = inputQuote;
}

//saves currentPoster properties to titles, quotes, and images arrays
//to be used as values in future random posters
//called inside helper handler for showMyPosterButton
function savePropertiesForFutureRandomPosters() {
  images.push(currentPoster.imageURL);
  titles.push(currentPoster.title);
  quotes.push(currentPoster.quote);
}


//takes destination and starting page as arguments
//shows the former and hides the latter
//called in helper handlers for
//showFormButton, showSavedButton, showMainButton, and backToMainButton
//**may want to toggle "hidden" class instead***
function switchPages(pageToOpen, pageToHideOne, pageToHideTwo) {
  pageToOpen.style.display = "block";
  pageToHideOne.style.display = "none";
  pageToHideTwo.style.display = "none";
}

//compares poster to every poster in array and returns true if there is a match
//called in helper handler for saveThisPosterButton,
//which only saves a poster to data model (savePosters array) and savedPostersGrid
//if the poster is not a duplicate of previously saved poster
function testIfAnyPosterIsAMatch(arrayOfPosters, mainPoster) {
  for(var i = 0; i < arrayOfPosters.length; i++) {
    if (testIfPostersMatch(arrayOfPosters[i], mainPoster)) {
          return true;
        }
      }
    }

//compares two posters and returns true if they share all values
//called in testIfAnyPosterIsAMatch() for each item in arrayOfPosters
function testIfPostersMatch(posterOne, posterTwo) {
    return posterOne.imageURL === posterTwo.imageURL &&
    posterOne.title === posterTwo.title &&
    posterOne.quote === posterTwo.quote
  }


//loops through savedPosters array and adds mini-poster element to savedPostersGrid
//for each element in the array
function updateGridDisplay() {
var html = "";
for (var i = 0; i < savedPosters.length; i++) {
  var savedPoster = savedPosters[i];
  html +=
  `
  <section class="mini-poster" id=miniposter${savedPoster.id}>
    <img class="poster-img" src="${savedPoster.imageURL}">
    <h1 class="poster-title">${savedPoster.title}</h1>
    <h3 class="poster-quote">${savedPoster.quote}</h3>
  </section>
`
  }
 savedPostersGrid.innerHTML = html;
}


function removeMiniPosterFromSavedPosters(element) {
    for (var i = 0; i < savedPosters.length; i++) {
    if (element.className === 'mini-poster' && element.id === `miniposter${savedPosters[i].id}`) {
      savedPosters.splice(i, 1)
    } else if (element.className === 'poster-img' && element.parentNode.id === `miniposter${savedPosters[i].id}`) {
      savedPosters.splice(i, 1)
    } else if (element.className === 'poster-title' && element.parentNode.id === `miniposter${savedPosters[i].id}`) {
      savedPosters.splice(i, 1)
    } else if (element.className === 'poster-quote' && element.parentNode.id === `miniposter${savedPosters[i].id}`) {
      savedPosters.splice(i, 1)
    }
  }
}


//~~~~~~~~~~~~~~~~~~~DEFAULT SETTINGS ON PAGE LOAD 👇~~~~~~~~~~~~~~~~~~~~~~

//need random poster to be generated and displayed when page loads
showAnotherRandomPoster();

//mainPoster is displayed and other two pages are hidden when page loads
savedPostersPage.style.display = "none"
posterForm.style.display = "none"
