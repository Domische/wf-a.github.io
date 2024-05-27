const premiumVersion = document.querySelector('.pv');

premiumVersion.addEventListener('click', () => {
    let premium = confirm('Оплатите подписку!');
    if (premium == true) {
        prompt('Введите номер Вашей банковской карты:');
        prompt('Введите код cvc или cvv Вашей банковской карты:');
        // if (card == '' && cvv == '') {
        //     alert('Вам не доступна премиум версия')
        //     premiumVersion.href = './geo.html'
        // } else {
        //     premiumVersion.href = './premium-index.html'
        // }
    } else {
        alert('Вам не доступна премиум версия')
        premiumVersion.href = './geo.html'
    }
})