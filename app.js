window.addEventListener('load', ()=>{
 let long;
 let lat;
 let tempratureDiscription= document.querySelector('.temprature-description');
 let tempratureDegree = document.querySelector('.temprature-degree');
 
 let locationTimezone= document.querySelector('.location-timezone');
 

 if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(
       positon =>{
           long =positon.coords.longitude;
           lat=positon.coords.longitude;


           const proxy = "https://cors-anywhere.herokuapp.com/";
            const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/25.4453,81.8250`;
            fetch(api)
                .then(data=>{

                    return data.json();

                })
                .then(response =>{
                    console.log(response);
                    const {temperature, summary, icon }= response.currently;
                    //set dom elements feom api
                    tempratureDegree.textContent=temperature;
                    tempratureDiscription.textContent=summary;
                    locationTimezone.textContent=response.timezone;
                    // set icons
                    setIcons(icon , document.querySelector('.icon'));

                    


                })

       }
   );

 }

function setIcons(icon, iconID){
    const skycons= new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}


});