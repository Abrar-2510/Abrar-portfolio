 // preloader 
 $(function() {
  setTimeout(function() {
    $("body").addClass("hidden")
  }, 100);
  setTimeout(function() {
    $(".preloader").addClass("end")
  }, 1800);
  setTimeout(function() {
    $(".global-overlay").addClass("show")
  }, 1900);
  setTimeout(function() {
    $("body").removeClass("hidden")
  }, 2300);
});

// nav
const list = document.querySelectorAll(".list");

function activeLink() {
    list.forEach((item) =>
    item.classList.remove("active"));
    this.classList.add("active");
}

list.forEach((item) =>
item.addEventListener("click", activeLink));


// typing effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [ "STEMER ", "programmer" , "UI & UX", "Researcher"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// chat-box
function FunctionChat() {
  document.getElementById("chat").style.display = "block";
}
function FunctionRemove() {
  document.getElementById("chat").style.display = "none";
}
// set skills progress
function setProgrss() {
  let myCircle = document.querySelectorAll(".progress-circle");
  myCircle.forEach(function (e) {
    let myProgress = e.getAttribute("progress");
    e.style = `--skills-persentage:${myProgress * 3.4 + 500}px`;
  });
}
setProgrss();
// keap my skill progress
let mySkills = document.querySelectorAll(".box");
window.addEventListener("scroll", () => {
  mySkills.forEach((ele) => {
    if (ele.getBoundingClientRect().top < 500) {
      ele.classList.add("on-view");
    } else {
      ele.classList.remove("on-view");
    }
  });
});
// make overlay img to view
let overlay = document.querySelector(".overlay-img");
let overlayImg = document.querySelector(".overlay-img img");
let view = document.querySelectorAll(".view");
view.forEach((ele) => {
  ele.addEventListener("click", () => {
    btnSound.play();
    overlayImg.src = ele.previousElementSibling.src;
    overlay.classList.remove("hide-overlay");
  });
});

// hide overlay
// These lines have something wrong, there is nothing with that class "overlay-img"
// overlay.addEventListener("click", () => {
//   overlay.classList.add("hide-overlay");
// });


// gallery
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'add', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
      el.classList.remove('gallery-item-6');
      el.classList.remove('gallery-item-7');
      el.classList.remove('gallery-item-8');
      el.classList.remove('gallery-item-9');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {

    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateGallery();
  }


  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();

        if (control.className == 'gallery-controls-add') {
          const newItem = document.createElement('img');
          const latestItem = this.carouselArray.length;
          const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length)+1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem,{
            className: 'gallery-item',
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length+1}`
          });
          newItem.setAttribute('data-index', this.carouselArray.length+1);

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();

        } else {
          this.setCurrentState(control);
        }

      });
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
// exampleCarousel.setNav();
exampleCarousel.useControls();


// skill
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};
window.onload = function(){
  var max = -219.99078369140625;
  forEach(document.querySelectorAll('.progress'), function (index, value) {
  percent = value.getAttribute('data-progress');
    value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
    value.querySelector('.value').innerHTML = percent + '%';
  });
}
// 