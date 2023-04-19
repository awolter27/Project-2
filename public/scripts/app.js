const comingSoonCarousel = document.querySelector('#comingSoonTiles');
const listOfComingSoon = document.querySelectorAll('.slide');
const slideCount = listOfComingSoon.length;
const slideWidth = listOfComingSoon[0].offsetWidth;

let currentSlide = 1;

function transitionSlide() {
    if (currentSlide < slideCount) {
        comingSoonCarousel.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
        currentSlide++;
    }
    else {
        comingSoonCarousel.style.transform = `translateX(0)`;
        currentSlide = 1;
    }
}

setInterval(transitionSlide, 5000);