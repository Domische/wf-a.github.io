function api() {
    let countryName = document.querySelector('.input').value;
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryName}?unitGroup=metric&key=JXS7B427UY8KY6YFLDLC23JB6&contentType=json`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)

            let lat = data.latitude;
            let lon = data.longitude;

            // let map;

            // async function initMap() {
            //     //@ts-ignore
            //     const { Map } = await google.maps.importLibrary("maps");

            //     map = new Map(document.querySelector('.map'), {
            //         center: { lat: lat, lng: lon },
            //         zoom: 8,
            //     });

            // }
            // initMap();

            let yandexMap = document.createElement('div');
            yandexMap.classList.add('map');
            document.querySelector('.map').replaceWith(yandexMap);

            ymaps.ready(init);
            function init() {
                let myMap = new ymaps.Map(document.querySelector('.map'), {
                    center: [lat, lon],
                    zoom: 8
                });              
            }

            document.querySelector('.location').innerHTML = data.resolvedAddress;
            document.querySelector('.temp').innerHTML = `${data.currentConditions.temp}&deg`;
            document.querySelector('.wind').innerHTML = `${data.currentConditions.windspeed} м/с`;
            document.querySelector('.suntop').innerHTML = data.currentConditions.sunrise;
            document.querySelector('.sunbottom').innerHTML = data.currentConditions.sunset;
            document.querySelector('.humidity').innerHTML = data.currentConditions.humidity + '%';
            document.querySelector('.uv-index').innerHTML = data.currentConditions.uvindex;
            document.querySelector('.desc').innerHTML = data.description;

            let prec = document.querySelector('.prec');

            if (data.currentConditions.temp > 20 && data.currentConditions.temp < 25) {
                prec.src = './images/weather>20.webp'
            } else if (data.currentConditions.temp > 25) {
                prec.src = './images/weather>25.png'
            } else if (data.currentConditions.temp > 5) {
                prec.src = './images/weather>5.png'
            } else if (data.currentConditions.temp < 5) {
                prec.src = './images/weather<5.webp'
            } else if (data.currentConditions.temp < 0) {
                prec.src = './images/weather<0.png'
            } else if (data.days[0].preciptype[0] == 'rain') {
                prec.src = './images/ifrain.png'
            } else if (data.currentConditions.windspeed > 15) {
                prec.src = './images/wind>20.png'
            }

            const doubleGraphCont = document.querySelector('.double-graph-container');
            const graphMinusItems = document.querySelectorAll('.graph-minus-item');
            const graphMinusList = document.querySelector('.graph-minus-list');
            const graphPlusItems = document.querySelectorAll('.graph-plus-item');
            const graphPlusList = document.querySelector('.graph-plus-list');

            const graphMinusDeg = document.querySelectorAll('.graph-minus-deg');
            const graphPlusDeg = document.querySelectorAll('.graph-plus-deg');

            // const graphArr = [];

            // for(let i=0; i<graphMinusItems.length; i++) {
            //     graphArr.push(`${data.days[i].temp}`);
            // }

            // console.log(graphArr);

            // const minusArr = graphArr.filter((el) => {
            //     if (el<0) {
            //         return el;
            //     }
            // })

            // console.log(minusArr);

            console.log(graphMinusList.offsetWidth);


            for (let i = 0; i < graphMinusItems.length; i++) {
                if (data.days[i].temp < 0) {
                    graphPlusItems[i].style.width = 0 + '%';
                    graphPlusDeg[i].innerHTML = '';
                    graphMinusItems[i].style.width = `${(data.days[i].temp) * (-1)}%`
                    graphMinusDeg[i].style.transform = `translateX(${graphMinusItems[i].offsetWidth}px) rotateZ(180deg) scaleX(1)`;
                    graphMinusDeg[i].innerHTML = data.days[i].temp + '&deg';
                } else if (data.days[i].temp > 0) {
                    graphMinusItems[i].style.width = 0 + '%';
                    graphMinusDeg[i].innerHTML = '';
                    graphPlusItems[i].style.width = `${(data.days[i].temp)}%`
                    graphPlusDeg[i].style.transform = `translateX(${graphPlusItems[i].offsetWidth}px) rotateZ(-180deg) scaleX(-1)`;
                    graphPlusDeg[i].innerHTML = data.days[i].temp + '&deg';
                }
            }




            const doubleGraphItems = document.querySelectorAll('.double-graph-item');
            const predData = document.querySelectorAll('.predict-data');

            for (let i = 0; i < doubleGraphItems.length; i++) {
                predData[i].innerHTML = data.days[i].datetime;
            }

            // const uvItems = document.querySelectorAll('.uv-graph-text');
            // const uvNums = document.querySelector('.uv-num-list');

            // console.log(uvNums.offsetHeight);

            // for (let i = 0; i < uvItems.length; i++) {
            //     uvItems[i].style.height = 0 + 'px';
            //     uvItems[i].style.height = ((data.days[i].uvindex * uvNums.offsetHeight) / 13) + 'px';
            // }

        })
        .catch((err) => {
            let conf = confirm('Приносим свои извинения за неудобства. Этого города/страны нет в базе данных api, по всем вопросам обращаться к владельцу базы данных (ссылка на владельца: https://weather.visualcrossing.com)');
            if (conf==true) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        });
}

document.querySelector('.search-img').addEventListener('click', api);

document.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        api();
    }
})