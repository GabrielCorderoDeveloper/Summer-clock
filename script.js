//It will call the function setClock every second.
setInterval(setClock, 1000)
//It will change the background every 6 seconds
setInterval(getUnsplashImage, 6000);

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

//This function will update the hanldes of the clock
function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

//2? Changing the background using Unsplash API
const key = 'koTlmoMUfSn6Z4ZfvydHX7dvIrSzKgsb5hTWP_iYKsM';
function getUnsplashImage() {
fetch(`https://api.unsplash.com/photos/random?query=beach&orientation=landscape&client_id=${key}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    const imageUrl = data.urls.regular;
    document.body.style.backgroundImage = `url('${imageUrl}')`;
})
.catch(error => {
    console.log('Error when loading image:', error);
});
}

//Executing functions when page is loaded
setClock();
getUnsplashImage();
