
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');  
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`; 
            const API = `${proxy}https://api.darksky.net/forecast/22b8ac8c5d663bc57d5e800ab0e0d693/${lat},${long}`;

            fetch(API)
               .then(data => {
                   data.json()
                   .then(response => {
                    const { temperature, summary, icon } = response.currently;
                    
                    //SET DOM ELEMENTS FROM THE API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = response.timezone;
                     
                    //FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);
                    setIcons(icon, document.querySelector('.icon'));

                    //CTA F TO C 
                     degreeSection.addEventListener('click', () => {
                         if(temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);

                         } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                         }
                     })
                   })
                  
               })
        });
    }

   function setIcons(icon, iconId) {
       const skycons = new Skycons( {color: 'white'} );
       const currentIcon = icon.replace(/-/g, '_').toUpperCase();
       skycons.play();
       return skycons.set(iconId, skycons[currentIcon]);
   }
});
