const premiumVersion = document.querySelector('.pv');

premiumVersion.addEventListener('click', ()=> {
    let premium = confirm('Оплатите подписку!');
    if (premium == true) {
        prompt('Введите номер Вашей банковской карты:', 4627100101654724);
        prompt('Введите код cvc или cvv Вашей банковской карты:', 123);
        premiumVersion.href = './premium-index.html'
    } else {
        alert('Вам не доступна премиум версия')
        premiumVersion.href = './index.html'
    }
})