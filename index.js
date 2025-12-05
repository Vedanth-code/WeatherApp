import {apiKey} from './api.js';     // Default import

document.getElementById('dashboard').style.borderRight = " 4px solid black";

let stories = [
    {
        id: 1,
        weather: "winter weather",
        headline: "Polar vortex to bring triple whammy of Arctic cold to US",
        time: "27min ago",
        img: "https://cms.accuweather.com/wp-content/uploads/2025/12/page-2_75647d.jpg?w=64&h=64&crop=1"

    },
    {
        id: 2,
        weather: "winter weather",
        headline: "Snow squalls to create dangerous conditions in Northeast, Midwest",
        time: "27min ago",
        img: "https://cms.accuweather.com/wp-content/uploads/2022/02/alex.gif?w=64&h=64&crop=1"
    },
    {
        id: 3,
        weather: "winter weather",
        headline: "Minneapolis was briefly colder than Mars as wintry weather expands",
        time: "14hours ago",
        img: "	https://cms.accuweather.com/wp-content/uploads/2025/12/AP18320766289437.jpg?w=64&h=64&crop=1"
    },
    // {
    //     id: 4,
    //     weather: "winter weather",
    //     headline: "Where will late-week rainstorm turn into snow, ice in the eastern US?",
    //     time: "30min ago",
    //     img: "https://cms.accuweather.com/wp-content/uploads/2025/12/page-3_729a3d.jpg?w=64&h=64&crop=1"

    // }
]

async function fetchWeather(city) { 
    let data = undefined;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

    try {
        
        document.getElementById("error").style.display = "none";

        const response = await fetch(url);
        
        if (response.status == 401) {
            throw new Error("Network Issues Come again later ..")
        }
        if (!response.ok) {
            throw new Error(`City "${city}" not found`);
        }
        data = await response.json();

        console.log('Weather data:', data); // Process the weather data here


        document.getElementById("locationspan").textContent = data.name + ", "+data.sys.country;
        document.getElementById("date").textContent = "Today";

        document.getElementById("temp").textContent = data.main.temp + "\u00B0C";

        let text;
        let img;
        if (data.main.feels_like < 0) {
            text = "Freezing cold! Stay warm and bundle up.";
            img = 'https://media.istockphoto.com/id/2178761812/photo/snow-covered-empty-landscape-over-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=orZ3ntzSeorBNdkS_AugdtUo_jjQNWN9sLzZYjfzhIw=';
        } else if (data.main.feels_like < 10) {
            text = "Chilly weather. Wear a jacket.";
            img = 'https://plus.unsplash.com/premium_photo-1760696149731-6dbeb9a8f519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q3Jpc3AlMjBibHVlJTIwb3IlMjBwYXJ0bHklMjBjbG91ZHklMjBza2llcyUyMHdpdGglMjBiYXJlJTIwdHJlZXMlMjBvciUyMGZhbGwlMjBmb2xpYWdlLnxlbnwwfHwwfHx8MA%3D%3D';

        } else if (data.main.feels_like < 15) {
            text = "Cool and crisp outside"
            img = 'https://images.unsplash.com/photo-1702383295296-29d95af73a68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGlnaHQlMjBjbG91ZHMlMjBkcmlmdGluZyUyMGluJTIwYmx1ZSUyMHNreSUyQyUyMGVhcmx5JTIwc3ByaW5nJTIwdmliZXMufGVufDB8fDB8fHww';

        } else if (data.main.feels_like < 20) {
            text = "Pleasant and mild weather."
            img = 'https://images.unsplash.com/photo-1658706626611-a55a111558d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QnJpZ2h0JTIwc3VubnklMjBza3klMkMlMjBjbGVhciUyMHdpdGglMjB3YXJtJTIwZ29sZGVuJTIwc3VubGlnaHQufGVufDB8fDB8fHww';

        } else if (data.main.feels_like < 25) {
            text = "Warm and comfortable."
            img = 'https://images.unsplash.com/photo-1552256648-3508c4cfd03f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VmlicmFudCUyMHN1bm55JTIwYmx1ZSUyMHNreSUyQyUyMGZldyUyMGZsdWZmeSUyMGN1bXVsdXMlMjBjbG91ZHMufGVufDB8fDB8fHww';

        } else if (data.main.feels_like < 30) {
            text = "It's getting hot. Stay hydrated.."
            img = 'https://images.unsplash.com/photo-1651407295090-d5153b835c4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEJyaWdodCUyMHN1biUyMHdpdGglMjBhJTIwc2xpZ2h0JTIwaGF6ZSUyMG9yJTIwbGlnaHQlMjB3aXNwcyUyMG9mJTIwY2xvdWRzLnxlbnwwfHwwfHx8MA%3D%3D';

        } else {
            text = "Hot weather! Take precautions."
            img = 'https://images.unsplash.com/photo-1447601932606-2b63e2e64331?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGFyc2glMkMlMjBnbGFyaW5nJTIwc3VubGlnaHQlMkMlMjBtaXJhZ2UlMjBlZmZlY3RzJTIwb3ZlciUyMGFzcGhhbHQlMjBvciUyMGJhcnJlbnxlbnwwfHwwfHx8MA%3D%3D';
        }

        document.getElementById("stories").style.display="none";
        document.getElementById("welcome").style.display="none";

        document.getElementById('main-card-min2').style.display = "flex";
        document.getElementById('tempdesc').textContent = text;
        document.getElementById('main-card').style.backgroundImage = `url(${img})`;
        document.getElementById('main-card').style.height = "80vh";



        document.getElementById("components").style.display = "grid";
        document.getElementById("windtext").textContent = "Wind";
        document.getElementById("winddes").textContent = "Today Wind Speed"
        document.getElementById("windval").textContent = data.wind.speed + "km/h";


        document.getElementById("humiditytext").textContent = "Humidity";
        document.getElementById('humiditydes').textContent = "Today humidity is";
        document.getElementById("humidityval").textContent = data.main.humidity + "%";

        document.getElementById("pressuretext").textContent = "Pressure";
        document.getElementById('pressuredes').textContent = "Today pressure is";
        document.getElementById("pressureval").textContent = data.main.pressure + "hpa";


        document.getElementById("maxmintext").textContent = "Max & Min Temperature";

        document.getElementById("maxtemptext").textContent = "Max temperature: ";
        document.getElementById("maxtempval").textContent = data.main.temp_max + "\u00B0C";

        document.getElementById("mintemptext").textContent = "Min temperature: ";
        document.getElementById("mintempval").textContent = data.main.temp_min + "\u00B0C";


    } catch (error) {
        document.getElementById("error").style.display = "flex";
        document.getElementById("errormessage").textContent = error;
        console.error('There was a problem with the fetch operation:', error);

        document.getElementById("stories").style.display="flex";


        // Clear previous weather data from UI
        document.getElementById("locationspan").textContent = "City Not Found";
        document.getElementById("date").textContent = "";
        document.getElementById("temp").textContent = "";
        document.getElementById("tempdesc").textContent = "";
        document.getElementById("windtext").textContent = "";
        document.getElementById("winddes").textContent = "";
        document.getElementById("windval").textContent = "";
        document.getElementById("humiditytext").textContent = "";
        document.getElementById("humiditydes").textContent = "";
        document.getElementById("humidityval").textContent = "";
        document.getElementById("pressuretext").textContent = "";
        document.getElementById("pressuredes").textContent = "";
        document.getElementById("pressureval").textContent = "";
        document.getElementById("maxmintext").textContent = "";
        document.getElementById("maxtemptext").textContent = "";
        document.getElementById("maxtempval").textContent = "";
        document.getElementById("mintemptext").textContent = "";
        document.getElementById("mintempval").textContent = "";

        // Optionally hide weather container or reset background
        document.getElementById('main-card-min2').style.display = "none";
        document.getElementById('main-card').style.backgroundImage = "";
        document.getElementById('main-card').style.height = "";

        document.getElementById("components").style.display = "none";
    }


}

function searchTrigger(event) {
    event.preventDefault();
    
    let city = document.getElementById("search").value;
    console.log("the city val is ", city);

    fetchWeather(city);

}

function sidenav(id) {
    document.getElementById('map').style.borderRight = "";
    document.getElementById('dashboard').style.borderRight = "";
    document.getElementById('savedloc').style.borderRight = "";
    document.getElementById('logout').style.borderRight = "";

    document.getElementById(id).style.borderRight = " 4px solid black";

}

function onLoad() {
    document.getElementById('stories').innerHTML +=stories.map((item) => {
            return `
                <div class="story">
                    <div id="story-comp1">
                        <p>${item.weather}</p>
                        <h4>${item.headline}</h4>
                        <p>${item.time}</p>
                    </div>
                    <div id="story-comp2">
                        <img src=${item.img} alt="" />
                    </div>
                </div>
            `
        }).join("");
    }

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchForm').addEventListener('submit', searchTrigger);

        // Sidenav handlers
    ['dashboard', 'map', 'savedloc', 'logout'].forEach(id => {
        document.getElementById(id).addEventListener('click', () => sidenav(id));
    });

    onLoad();

});


