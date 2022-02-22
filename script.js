const zooApp = {};

zooApp.init = function() {
    zooApp.nameEl = document.querySelector('.animal-name');
    zooApp.formEvent(); 
    // Event listener for reload button
    zooApp.reloadBtn.addEventListener('click', function() {
        window.location.reload();
    })
}

zooApp.apiUrl = 'https://zoo-animal-api.herokuapp.com/animals/rand/10';

zooApp.formEvent = () => {
    // Select form elements
    zooApp.formEl = document.querySelector('#animal-chooser');
    zooApp.inputEl = document.querySelector('#type-select');
    zooApp.animalEl = document.querySelector('.animal-container');
    zooApp.reloadBtn = document.querySelector('#reload-btn');

    // Event listener for form submit
    zooApp.formEl.addEventListener('submit', function (event) {
        event.preventDefault();
        // Assign input value to userType variable
        zooApp.userType = zooApp.inputEl.value;
        // Fetch data from API based on userType
        zooApp.getData();
        // Hide the form, show animal container div and reload button
        zooApp.formEl.style.display = 'none';
        zooApp.reloadBtn.style.display = 'inline-block';
        zooApp.animalEl.style.display = 'flex';
    });
}

zooApp.getData = function() {
    fetch(zooApp.apiUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
        })
        .then(function(jsonResponse) {
            // From the returned array of animals, filter for objects that match the desired animal_type property, then store the first one in a new variable
            zooApp.animalArray = jsonResponse.filter(function(animal) {
                return animal.animal_type == zooApp.userType;
            })
            zooApp.animalObject = zooApp.animalArray[0];
            // Display an error message if animalObject == undefined - which happens if there are no returned objects with the desired animal_type property
            if (typeof zooApp.animalObject === 'undefined') {
                zooApp.nameEl.textContent = 'Sorry! That animal seems to be asleep right now. Why don\'t you try visiting another one?'
                zooApp.nameEl.style.textTransform = 'none';
            } else {
                zooApp.displayData(zooApp.animalObject);
            }
        })
        .catch(function() {
            zooApp.nameEl.textContent = 'Sorry! The zoo seems to be closed for maintenance. Please come back later.';
            zooApp.nameEl.style.textTransform = 'none';
        });
    }
    
zooApp.displayData = function(apiData) {
    // Select elements that will hold animal info
    const imgEl = document.querySelector('.img-container');
    const infoEl = document.querySelector('#info-list'); 

    // Display animal name
    zooApp.nameEl.textContent = apiData.name;

    // Display animal img
    const animalImg = document.createElement('img');
    animalImg.src = apiData.image_link; 
    animalImg.alt = `A picture of a ${apiData.name}`;
    imgEl.appendChild(animalImg); 

    // Create new elements with animal details
    // Latin Name
    const latinNameEl = document.createElement('li');
    latinNameEl.innerHTML = `<span>Latin Name:  </span>${apiData.latin_name}`;

    // Animal Type
    const typeEl = document.createElement('li');
    typeEl.innerHTML = `<span>Animal Type:  </span>${apiData.animal_type}`;

    // Active Time 
    const activeEl = document.createElement('li');
    activeEl.innerHTML = `<span>Active Time:  </span>${apiData.active_time}`;

    // Length
    const lengthEl = document.createElement('li');
    lengthEl.innerHTML = `<span>Length:  </span>${apiData.length_min} - ${apiData.length_max} ft.`;

    // Weight 
    const weightEl = document.createElement('li');
    weightEl.innerHTML = `<span>Weight:  </span>${apiData.weight_min} - ${apiData.weight_max} lbs.`;

    // Lifespan
    const lifespanEl = document.createElement('li');
    lifespanEl.innerHTML = `<span>Lifespan:  </span>${apiData.lifespan} years`;

    // Diet
    const dietEl = document.createElement('li');
    dietEl.innerHTML = `<span>Diet:  </span>${apiData.diet}`;

    // Habitat
    const habitatEl = document.createElement('li');
    habitatEl.innerHTML = `<span>Habitat:  </span>${apiData.habitat}`;

    // Geographical Range 
    const geoRangeEl = document.createElement('li');
    geoRangeEl.innerHTML = `<span>Geographical Range:  </span>${apiData.geo_range}`;

    // Append newly generated elements to info element
    infoEl.append(latinNameEl, typeEl, activeEl, lengthEl, weightEl, lifespanEl, dietEl, habitatEl, geoRangeEl); 
}

zooApp.init();