//It will call the function setClock every second.
setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');
const clockDate = document.querySelector('[data-clock-date]');

//This function will update the hanldes of the clock
function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    const day = currentDate.getDay();

    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
    clockDate.innerHTML = `<p>${day}</p>`
    
    //Playing the sound
    const audio = document.getElementById("sound");
    audio.volume = 0.1;
    audio.play();
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

//2? Changing the background using Unsplash API
const key = 'koTlmoMUfSn6Z4ZfvydHX7dvIrSzKgsb5hTWP_iYKsM';
let imageUrls = [];

function getUnsplashImages() {
  const requests = [];
//It fetches 5 different images of beach and storages them on imageUrls
  for (let i = 0; i < 5; i++) {
    const request = fetch(`https://api.unsplash.com/photos/random?query=beach&orientation=landscape&client_id=${key}`)
      .then(response => response.json())
      .then(data => {

        const imageUrl = data.urls.regular;
        imageUrls[i] = imageUrl;
      })
      .catch(error => {
        console.log('Error when loading image:', error);
      });

    requests.push(request);
  }

  Promise.all(requests)
    .then(() => {
      changeBackgroundImage()
      //It changes the background every 6 seconds
      setInterval(changeBackgroundImage, 6000);
    });
}

//It selects randomly one of the 5 storaged images
function changeBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const imageUrl = imageUrls[randomIndex];
  if (imageUrl) { //If the API fails, the default image wont be changed.
    document.body.style.backgroundImage = `url('${imageUrl}')`;
  }
}

//Executing functions when page is loaded
setClock();
getUnsplashImages();