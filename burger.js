const burger = document.querySelector('.menu-burger');
const menuList = document.querySelector('.menu-list')

burger.addEventListener('click', ()=> {
    menuList.classList.toggle('active')
    document.querySelector('body').classList.toggle('hidden')
})