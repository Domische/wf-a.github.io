function attractions() {
    document.querySelector('.circle').classList.add('anim');
    document.querySelectorAll('.geo-place').forEach(el => {
        el.remove();
    })
    let geoCountryName = document.querySelector('.input').value;
    fetch(`https://api.opentripmap.com/0.1/ru/places/geoname?name=${geoCountryName}&apikey=5ae2e3f221c38a28845f05b64927635651aeae9deb35f265562b3d78`)
        .then(response => response.json())
        .then(data => {

            fetch(`https://api.opentripmap.com/0.1/ru/places/radius?radius=10000&lon=${data.lon}&lat=${data.lat}&apikey=5ae2e3f221c38a28845f05b64927635651aeae9deb35f265562b3d78`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    // console.log(geoData.features);
                    let geoDataArr = geoData.features;
                    let geoDataArrNameTrue = geoDataArr.filter((item, index) => {
                        if (item.properties.name !== '') {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    // console.log(geoDataArrNameTrue);
                    // geoDataArrNameTrue.forEach(el => {
                    //     console.log(el.properties.xid);
                    // });
                    let geoDataArrPropXid = geoDataArrNameTrue.map((item, index) => {
                        return item.properties.xid;
                    })
                    // console.log(geoDataArrPropXid);
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
                                    newList.style.marginBottom = 20 + 'px';
                                    newList.style.marginInline = 10 + 'px';
                                    newList.style.padding = 10 + 'px';
                                    newList.style.borderRadius = 5 + 'px';

                                    // ymaps.ready(init);
                                    // function init() {
                                    //     let myMap = new ymaps.Map(document.querySelector('.map'), {
                                    //         center: [lat, lon],
                                    //         zoom: 8
                                    //     });
                                    // }

                                    newList.innerHTML = html;
                                    geoCont.appendChild(newList);

                                    


                                    // let geoList = document.querySelector('.geo-list');
                                    // const newMap = document.createElement('li');
                                    // newMap.classList.add(`map ${i}`);
                                    // newMap.style.paddingBottom = 10 + 'px';
                                    // geoList.appendChild(newMap);


                                }
                            })
                            .catch(err => console.log(err))

                    }

                })
        })
        .catch(err => console.error(err))
}


document.querySelector('.search-img').addEventListener('click', attractions);

document.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        attractions();
    }
})

document.querySelector('.clear').addEventListener('click', () => {
    window.location.reload();
})


