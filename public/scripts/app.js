const comingSoonCarousel = document.querySelector('.carousel');
//console.log(comingSoonCarousel);
const listOfComingSoon = document.getElementsByTagName('ul')[0].getElementsByTagName('li');
//console.log(listOfComingSoon);

const slideCount = 3;
const slideWidth = listOfComingSoon[0].offsetWidth;

let currentSlide = 0;

function transitionSlide(){
    if(currentSlide < slideCount){
        comingSoonCarousel.getElementsByClassName.transform = `translateX(${-1000 * currentSlide}px)`;
        currentSlide++;
    }
    else{
        comingSoonCarousel.getElementsByClassName.transform = `translateX(0)`;
        currentSlide = -1;
    }
    console.log('called!')
}

setInterval (transitionSlide, 5000)