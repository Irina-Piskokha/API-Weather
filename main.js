const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "e1dccdc48026d4ec2a3764e197ab5d75",
};

const cities = {
  703448: "Kyiv",
  698740: "Odessa",
  700568: "Mykolaiv",
  702550: "Lviv",
  706369: "Khmelnytskyi",
  706448: "Kherson",
  707471: "Ivano-Frankivsk",
  709717: "Donetsk",
  709930: "Dnipro",
  710719: "Chernivtsi",
  710735: "Chernihiv",
};

let select = document.createElement("select");
select.classList.add("list-city");
for (let id in cities) {
  let option = document.createElement("option");
  option.value = id;
  option.textContent = cities[id];
  select.append(option);
}
document.querySelector(".out").append(select);

function getWeather() {
  const cityId = document.querySelector(".list-city").value;

  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  console.log(data);
  document.querySelector(".weather-name").textContent = data.name;
  document.querySelector(".weather-temp").innerHTML =
    Math.round(data.main.temp) + "&deg;";
  document.querySelector(
    ".weather-icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
  document.querySelector(".weather-description").textContent =
    data.weather[0]["description"];
  document.querySelector(
    ".weather-wind"
  ).textContent = `Направлення вітру: ${data.wind.deg} градусів`;
  document.querySelector(
    ".weather-speed"
  ).textContent = `Швидкість вітру: ${data.wind.speed} метр/сек`;
  document.querySelector(
    ".weather-pressure"
  ).textContent = `Атмосферний тиск на рівні моря: ${data.main.pressure} гПа`;
}

getWeather();
document.querySelector(".list-city").onchange = getWeather;
