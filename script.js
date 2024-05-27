const mainSlider = document.querySelector('.main-slider')
const sliderList = document.querySelector('.slider-list');
const sliderItem = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let count = 0;
let width;

function init() {
    width = mainSlider.offsetWidth;
    sliderItem.forEach(el=> {
        el.style.width = width + 'px';
        el.style.minHeight = 400 + 'px';
        el.style.height = 'auto';
    })
    moveSlider();
}

window.addEventListener('resize', init);
init()

nextBtn.addEventListener('click', ()=> {
    count++;
    if (count>sliderItem.length-1) {
        count=0;
    }
    moveSlider();
})

prevBtn.addEventListener('click', ()=> {
    count--;
    if (count<0) {
        count = sliderItem.length-1;
    }
    moveSlider();
})

function moveSlider() {
    sliderList.style.transform = `translate(-${count*(width)}px)`;
    sliderList.style.transition = 'transform 0.4s ease';
}


mainSlider.addEventListener('touchstart', handleTouchStart, false);
mainSlider.addEventListener('touchmove', handleMoveStart, false);

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
    x1 = event.touches[0].clientX;
    y1 = event.touches[0].clientY;
}

function handleMoveStart(event) {
    if (x1==null || y1==null) {
        return false
    }

    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;
    if (Math.abs(xDiff)>Math.abs(yDiff)) {
        //right or left
        if (xDiff<0) {
            count++;
            if (count>=sliderItem.length) {
                count = 0;
            }
            moveSlider();
        } else {
            count--;
            if (count<0) {
                count = sliderItem.length - 1;
            }
            moveSlider();
        }
    }
    x1 = null;
    y1 = null;
}