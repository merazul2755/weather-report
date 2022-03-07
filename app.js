const API_KEY = `3d5e99a2cc4ad6bfe12dde356406a873`;

const searchTemp = () => {
    const city = document.getElementById("search").value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5e1aecac0154555fcd88a2ddf21743f1`)
        .then((res) => res.json())
        .then((data) => displayTemp(data));
};

const setInnerText = (id, text) => {
    document.getElementById(id).innerText = text;
}

const displayTemp = (info) => {
    
    setInnerText('city-name', info.name + ', ' + info.sys.country);
    setInnerText('temperature', info.main.temp);
    setInnerText('weather', info.weather[0].main);

    const url = `http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
    const img = document.getElementById('img');
    img.setAttribute('src', url);



    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${info.name}&units=metric&appid=5e1aecac0154555fcd88a2ddf21743f1`)
        .then((res) => res.json())
        .then((data) => displayForcast(data));


}

const displayForcast = (data) => {
    const row = document.getElementById('row');
    row.textContent='';

    for(let i=4; i<= data.list.length; i+=8) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card w-75 bg-light text-dark shadow text-center">
        <p class="card-text">${data.list[i].dt_txt.slice(0,10)}</p>
        <img class="h-25 w-25 m-auto" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title ">${data.list[i].main.temp} &deg;C</h5>
            <p class="card-text">${data.list[i].weather[0].description}</p>
        </div>
    </div>
        `;
        row.appendChild(div);
        
    };

}