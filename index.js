import { apiKey, url } from './config.js';     // Default import
import {stories} from './arrays.js';
document.getElementById('dashboard').style.borderRight = " 4px solid black";


let text;
let img;

function searchTrigger(event) {
    event.preventDefault();

    let city = document.getElementById("search").value;
    console.log("the city val is ", city);

    fetchWeather(city);

}

async function fetchWeather(city) {
    let data = undefined;
    await clearingData();

    try {

        document.getElementById("error").style.display = "none";
        let modifiedUrl = url+`&q=${city}`;
      
        const response = await fetch(modifiedUrl);

        if (response.status == 401) {
            throw new Error("Network Issues Come again later ..")
        }
        if (!response.ok) {
            throw new Error(`City "${city}" not found`);
        }
        
        data = await response.json();

        console.log('Weather data:', data); // Process the weather data here

        await getImageText(data.main.feels_like);

        await makingChangesinUI(data);

    } catch (error) {
        document.getElementById("error").style.display = "flex";
        document.getElementById("errormessage").textContent = error;
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById("stories").style.display = "flex";
    }


}

function sidenav(id) {
    document.getElementById('map').style.borderRight = "";
    document.getElementById('dashboard').style.borderRight = "";
    document.getElementById('savedloc').style.borderRight = "";
    document.getElementById('logout').style.borderRight = "";

    document.getElementById(id).style.borderRight = " 4px solid black";

}

function getImageText(temp) {

    if (temp < 0) {
        text = "Freezing cold! Stay warm and bundle up.";
        img = 'https://media.istockphoto.com/id/2178761812/photo/snow-covered-empty-landscape-over-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=orZ3ntzSeorBNdkS_AugdtUo_jjQNWN9sLzZYjfzhIw=';
    } else if (temp < 10) {
        text = "Chilly weather. Wear a jacket.";
        img = 'https://plus.unsplash.com/premium_photo-1760696149731-6dbeb9a8f519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q3Jpc3AlMjBibHVlJTIwb3IlMjBwYXJ0bHklMjBjbG91ZHklMjBza2llcyUyMHdpdGglMjBiYXJlJTIwdHJlZXMlMjBvciUyMGZhbGwlMjBmb2xpYWdlLnxlbnwwfHwwfHx8MA%3D%3D';

    } else if (temp < 15) {
        text = "Cool and crisp outside"
        img = 'https://images.unsplash.com/photo-1702383295296-29d95af73a68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGlnaHQlMjBjbG91ZHMlMjBkcmlmdGluZyUyMGluJTIwYmx1ZSUyMHNreSUyQyUyMGVhcmx5JTIwc3ByaW5nJTIwdmliZXMufGVufDB8fDB8fHww';

    } else if (temp < 20) {
        text = "Pleasant and mild weather."
        img = 'https://images.unsplash.com/photo-1658706626611-a55a111558d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QnJpZ2h0JTIwc3VubnklMjBza3klMkMlMjBjbGVhciUyMHdpdGglMjB3YXJtJTIwZ29sZGVuJTIwc3VubGlnaHQufGVufDB8fDB8fHww';

    } else if (temp < 25) {
        text = "Warm and comfortable."
        img = 'https://images.unsplash.com/photo-1552256648-3508c4cfd03f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VmlicmFudCUyMHN1bm55JTIwYmx1ZSUyMHNreSUyQyUyMGZldyUyMGZsdWZmeSUyMGN1bXVsdXMlMjBjbG91ZHMufGVufDB8fDB8fHww';

    } else if (temp < 30) {
        text = "It's getting hot. Stay hydrated.."
        img = 'https://images.unsplash.com/photo-1651407295090-d5153b835c4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEJyaWdodCUyMHN1biUyMHdpdGglMjBhJTIwc2xpZ2h0JTIwaGF6ZSUyMG9yJTIwbGlnaHQlMjB3aXNwcyUyMG9mJTIwY2xvdWRzLnxlbnwwfHwwfHx8MA%3D%3D';

    } else {
        text = "Hot weather! Take precautions."
        img = 'https://images.unsplash.com/photo-1447601932606-2b63e2e64331?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGFyc2glMkMlMjBnbGFyaW5nJTIwc3VubGlnaHQlMkMlMjBtaXJhZ2UlMjBlZmZlY3RzJTIwb3ZlciUyMGFzcGhhbHQlMjBvciUyMGJhcnJlbnxlbnwwfHwwfHx8MA%3D%3D';
    }
}

function makingChangesinUI(data) {

    document.getElementById("stories").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById('main-card-min2').style.display = "flex";
    
    document.getElementById('tempdesc').textContent = text;
    document.getElementById('main-card').style.backgroundImage = `url(${img})`;
    document.getElementById('main-card').style.height = "80vh";

    document.getElementById("components").style.display = "grid";


    let storingFields =
    {
        "locationspan": data.name + ", " + data.sys.country,
        "date": "Today",
        "temp": data.main.temp + "\u00B0C",
        "windtext": "Wind",
        "winddes": "Today Wind Speed",
        "windval": data.wind.speed + "km/h",

        "humiditytext": "Humidity",
        "humiditydes": "Today humidity is",
        "humidityval": data.main.humidity + "%",

        "pressuretext": "Pressure",
        "pressuredes": "Today pressure is",
        "pressureval": data.main.pressure + "hpa",

        "maxmintext": "Max & Min Temperature",
        "maxtemptext": "Max temperature: ",
        "maxtempval": data.main.temp_max + "\u00B0C",
        "mintemptext": "Min temperature: ",
        "mintempval": data.main.temp_min + "\u00B0C"
    };

    Object.keys(storingFields).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = storingFields[key];
        }

    })
}

function clearingData() {
    let clearingfields = [
        {
            "locationspan": "City Not Found",
            "date": "",
            "temp": "",
            "tempdesc": "",
            "windtext": "",
            "winddes": "",
            "windval": "",
            "humiditytext": "",
            "humiditydes": "",
            "humidityval": "",
            "pressuretext": "",
            "pressuredes": "",
            "pressureval": "",
            "maxmintext": "",
            "maxtemptext": "",
            "maxtempval": "",
            "mintemptext": "",
            "mintempval": ""
        }
    ]

    clearingfields.map((item) => {
        Object.keys(item).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = item[key];
            }
        })
    })

    // Optionally hide weather container or reset background
    document.getElementById('main-card-min2').style.display = "none";
    document.getElementById('main-card').style.backgroundImage = "";
    document.getElementById('main-card').style.height = "";
    document.getElementById("components").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('stories').innerHTML += stories.map((item) => {
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
    document.getElementById('searchForm').addEventListener('submit', searchTrigger);

    // Sidenav handlers
    ['dashboard', 'map', 'savedloc', 'logout'].forEach(id => {
        document.getElementById(id).addEventListener('click', () => sidenav(id));
    });
});