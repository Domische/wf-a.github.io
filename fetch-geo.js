function premiumApi() {
    document.querySelector('.circle').classList.add('anim');
    document.querySelectorAll('.geo-place').forEach(el => {
        el.remove();
    })
    let countryName = document.querySelector('.input').value;
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryName}?unitGroup=metric&key=JXS7B427UY8KY6YFLDLC23JB6&contentType=json`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)

            //map---------------------------
            let lat = data.latitude;
            let lon = data.longitude;

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


            //front----------------------

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

            //weather-graph-day-----------------------------

            const graphMinusItems = document.querySelectorAll('.weather-minus-item');
            const graphMinusList = document.querySelector('.weather-minus-list');
            const graphPlusItems = document.querySelectorAll('.weather-plus-item');

            const graphMinusDeg = document.querySelectorAll('.weather-minus-deg');
            const graphPlusDeg = document.querySelectorAll('.weather-plus-deg');

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

            const doubleGraphItems = document.querySelectorAll('.weather-graph-item');
            const predData = document.querySelectorAll('.weather-predict-data');

            for (let i = 0; i < doubleGraphItems.length; i++) {
                predData[i].innerHTML = data.days[i].datetime;
            }

            //uv-index--------------------------------

            const uvItems = document.querySelectorAll('.uv-graph-text-day');
            const uvNums = document.querySelector('.uv-num-list-day');

            console.log(uvNums.offsetHeight);

            for (let i = 0; i < uvItems.length; i++) {
                uvItems[i].style.height = 0 + 'px';
                uvItems[i].style.height = ((data.days[i].uvindex * uvNums.offsetHeight) / 13) + 'px';
            }

            //weather-graph-hours-----------------------------
            const graphMinusItemsHours = document.querySelectorAll('.hours-minus-item');
            const graphMinusListHours = document.querySelector('.hours-minus-list');
            const graphPlusItemsHours = document.querySelectorAll('.hours-plus-item');

            const graphMinusDegHours = document.querySelectorAll('.hours-minus-deg');
            const graphPlusDegHours = document.querySelectorAll('.hours-plus-deg');

            console.log(graphMinusListHours.offsetWidth);


            for (let i = 0; i < graphMinusItemsHours.length; i++) {
                if (data.days[0].hours[i].temp < 0) {
                    graphPlusItemsHours[i].style.width = 0 + '%';
                    graphPlusDegHours[i].innerHTML = '';
                    graphMinusItemsHours[i].style.width = `${(data.days[0].hours[i].temp) * (-1)}%`
                    graphMinusDegHours[i].style.transform = `translateX(${graphMinusItemsHours[i].offsetWidth}px) rotateZ(180deg) scaleX(1)`;
                    graphMinusDegHours[i].innerHTML = data.days[0].hours[i].temp + '&deg';
                } else if (data.days[0].hours[i].temp >= 0) {
                    graphMinusItemsHours[i].style.width = 0 + '%';
                    graphMinusDegHours[i].innerHTML = '';
                    graphPlusItemsHours[i].style.width = `${(data.days[0].hours[i].temp)}%`
                    graphPlusDegHours[i].style.transform = `translateX(${graphPlusItemsHours[i].offsetWidth}px) rotateZ(-180deg) scaleX(-1)`;
                    graphPlusDegHours[i].innerHTML = data.days[0].hours[i].temp + '&deg';
                }
            }

            //humidity-hours---------------------------

            const uvItemsHumidity = document.querySelectorAll('.uv-graph-text-humidity');
            const uvNumsHumidity = document.querySelector('.humidity-num-list');

            console.log(uvNumsHumidity.offsetHeight);

            for (let i = 0; i < uvItemsHumidity.length; i++) {
                uvItemsHumidity[i].style.height = 0 + 'px';
                uvItemsHumidity[i].style.height = ((data.days[0].hours[i].humidity * uvNumsHumidity.offsetHeight) / 100) + 'px';
            }

            //uv-index-hours-----------------------------

            const uvItemsHours = document.querySelectorAll('.uv-graph-text-hours');
            const uvNumsHours = document.querySelector('.uv-num-list-hours');

            console.log(uvNumsHours.offsetHeight);

            for (let i = 0; i < uvItemsHours.length; i++) {
                uvItemsHours[i].style.height = 0 + 'px';
                uvItemsHours[i].style.height = ((data.days[0].hours[i].uvindex * uvNumsHours.offsetHeight) / 13) + 'px';
            }

            //humidity-day

            const uvItemsHumidityDay = document.querySelectorAll('.humidity-graph-text-day');
            const uvNumsHumidityDay = document.querySelector('.humidity-num-list-day');

            console.log(uvNumsHumidityDay.offsetHeight);

            for (let i = 0; i < uvItemsHumidityDay.length; i++) {
                uvItemsHumidityDay[i].style.height = 0 + 'px';
                uvItemsHumidityDay[i].style.height = ((data.days[i].humidity * uvNumsHumidityDay.offsetHeight) / 100) + 'px';
            }


        })
        .catch((err) => {
            let conf = confirm('Приносим свои извинения за неудобства. Этого города/страны нет в базе данных api, по всем вопросам обращаться к владельцу базы данных (ссылка на владельца: https://weather.visualcrossing.com)');
            if (conf==true) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        });

    //fetch+geo!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    fetch(`https://api.opentripmap.com/0.1/ru/places/geoname?name=${countryName}&apikey=5ae2e3f221c38a28845f05b64927635651aeae9deb35f265562b3d78`)
        .then(response => response.json())
        .then(data => {

            fetch(`https://api.opentripmap.com/0.1/ru/places/radius?radius=10000&lon=${data.lon}&lat=${data.lat}&apikey=5ae2e3f221c38a28845f05b64927635651aeae9deb35f265562b3d78`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {

                    let geoDataArr = geoData.features;
                    let geoDataArrNameTrue = geoDataArr.filter((item, index) => {
                        if (item.properties.name !== '') {
                            return true;
                        } else {
                            return false;
                        }
                    })

                    let geoDataArrPropXid = geoDataArrNameTrue.map((item, index) => {
                        return item.properties.xid;
                    })



                    for (let i = 0; i < geoDataArrPropXid.length; i++) {

                        fetch(`https://api.opentripmap.com/0.1/ru/places/xid/${geoDataArrPropXid[i]}?apikey=5ae2e3f221c38a28845f05b64927635651aeae9deb35f265562b3d78`)
                            .then(geoDataResult => geoDataResult.json())
                            .then(geoDataResultEnd => {
                                if (geoDataResultEnd.wikipedia_extracts.text !== undefined) {
                                    console.log(geoDataResultEnd);

                                    let resultArrItem = {
                                        'name': geoDataResultEnd.name,
                                        'addressCountry': geoDataResultEnd.address.country,
                                        'addressCity': geoDataResultEnd.address.city,
                                        'text': geoDataResultEnd.wikipedia_extracts.text,
                                    };

                                    const geoCont = document.querySelector('.geo-container')
                                    let lat = geoDataResultEnd.point.lat;
                                    let lon = geoDataResultEnd.point.lon;
                                    let addrCity = resultArrItem.addressCity + ',';

                                    if (resultArrItem.addressCity == undefined) {
                                        addrCity = '';
                                    }

                                    let html = `<ul class="geo-list">
                                                                <li class="geo-item name"><p class="geo-title">Достопримечательность:</p> ${resultArrItem.name}</li>
                                                                <li class="geo-item city"><p class="geo-title">Адрес:</p> ${resultArrItem.addressCountry}, ${addrCity} <a class="link-map" href="https://www.latlong.net/c/?lat=${lat}&long=${lon}" target="_blank">${lat}, ${lon}</a></li>
                                                                <li class="geo-item text"><p class="geo-title">Описание:</p> ${resultArrItem.text}</li>
                                                            </ul>`;

                                    const newList = document.createElement('div');

                                    newList.classList.add('geo-place');
                                    newList.style.marginBottom = 10 + 'px';
                                    newList.style.padding = 10 + 'px';
                                    newList.innerHTML = html;
                                    geoCont.appendChild(newList);
                                }
                            })
                            .catch(err => console.log(err))
                    }

                })
        })
        .catch(err => console.error(err))
}




document.querySelector('.search-img').addEventListener('click', premiumApi);

document.addEventListener('keydown', event => {
    if (event.code == 'Enter') {
        premiumApi();
    }
})

document.querySelector('.clear').addEventListener('click', () => {
    window.location.reload();
})

// document.querySelector('.white-black').addEventListener('click', ()=> {
//     document.querySelector('.bottom').classList.toggle('white');
//     document.querySelector('.top').classList.toggle('white');
//     document.querySelector('.menu-list').classList.toggle('white');
//     document.querySelector('.logo').classList.toggle('white');
//     document.querySelector('.menu-burger').classList.toggle('white');
//     document.querySelector('.premium-title').classList.toggle('white');
//     document.querySelector('.geo-premium-title').classList.toggle('white');
//     document.querySelector('body').classList.toggle('white');
//     document.querySelector('.grid-container').classList.toggle('white');
// })
