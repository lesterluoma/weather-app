const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  const APIKey = "c0d97e33de77f96dbf22ffd25164e917";
  if (city === "") return;

  //Use the instructions in https://openweathermap.org/current
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json.weather[0].main);
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("FadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("FadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      const celsius = parseInt(json.main.temp);
      const fahrenheit = celsius * 1.8 + 32;
      const KMH = parseInt(json.wind.speed);
      const KmhTomph = KMH * parseInt(json.wind.speed);

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          console.log(image.src);
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;

        default:
          return;
      }

      temperature.innerHTML = `${fahrenheit}<span>°F</span>`;
      description.innerHTML = `${parseInt(json.weather[0].description)}`;
      humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
      wind.innerHTML = `${KmhTomph}mph`;

      weatherBox.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
