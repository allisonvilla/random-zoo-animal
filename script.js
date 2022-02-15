const zooApp = {}

zooApp.init = function() {
    // Event listener for form submit
    zooApp.formEl.addEventListener('submit', function(event) {
        event.preventDefault();
        // Assign input value to userType variable
        zooApp.userType = zooApp.inputEl.value;
        // Fetch data from API based on userType
        zooApp.getData();
        // Hide the form, show reload button
        zooApp.formEl.style.display = 'none';
        zooApp.reloadBtn.style.display = 'inline-block'; 
    });
    // Event listener for reload button
    zooApp.reloadBtn.addEventListener('click', function() {
        window.location.reload();
    })
}

zooApp.apiUrl = 'https://zoo-animal-api.herokuapp.com/animals/rand/10';

zooApp.nameEl = document.querySelector('.animal-name'); 
zooApp.imgEl = document.querySelector('.img-container'); 
zooApp.infoEl = document.querySelector('.animal-info'); 
zooApp.formEl = document.querySelector('#animal-chooser');
zooApp.inputEl = document.querySelector('#type-select');
zooApp.reloadBtn = document.querySelector('#reload-btn');

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
            } else {
                zooApp.displayData(zooApp.animalObject);
            }
        })
        .catch(function() {
            zooApp.nameEl.textContent = 'Sorry! The zoo seems to be closed for maintenance. Please come back later.';
        });
    }
    
zooApp.displayData = function(apiData) {
    // Display animal name
    zooApp.nameEl.textContent = apiData.name;
    // Display animal img
    zooApp.animalImg = document.createElement('img');
    zooApp.animalImg.src = apiData.image_link; 
    zooApp.animalImg.alt = `A picture of a ${apiData.name}`;
    zooApp.imgEl.appendChild(zooApp.animalImg); 
    // Display animal info
    // Latin Name
    zooApp.latinNameEl = document.createElement('li');
    zooApp.latinNameEl.innerHTML = `<span><b>Latin Name: </b></span>${apiData.latin_name}`;
    zooApp.infoEl.appendChild(zooApp.latinNameEl); 
    // Animal Type
    zooApp.typeEl = document.createElement('li');
    zooApp.typeEl.innerHTML = `<span><b>Animal Type: </b></span>${apiData.animal_type}`;
    zooApp.infoEl.appendChild(zooApp.typeEl); 
    // Active Time 
    zooApp.activeEl = document.createElement('li');
    zooApp.activeEl.innerHTML = `<span><b>Active Time: </b></span>${apiData.active_time}`;
    zooApp.infoEl.appendChild(zooApp.activeEl); 
    // Length
    zooApp.lengthEl = document.createElement('li');
    zooApp.lengthEl.innerHTML = `<span><b>Length: </b></span>${apiData.length_min} - ${apiData.length_max} ft.`;
    zooApp.infoEl.appendChild(zooApp.lengthEl);
    // Weight 
    zooApp.weightEl = document.createElement('li');
    zooApp.weightEl.innerHTML = `<span><b>Weight: </b></span>${apiData.weight_min} - ${apiData.weight_max} lbs.`;
    zooApp.infoEl.appendChild(zooApp.weightEl);
    // Lifespan
    zooApp.lifespanEl = document.createElement('li');
    zooApp.lifespanEl.innerHTML = `<span><b>Lifespan: </b></span>${apiData.lifespan} years`;
    zooApp.infoEl.appendChild(zooApp.lifespanEl); 
    // Diet
    zooApp.dietEl = document.createElement('li');
    zooApp.dietEl.innerHTML = `<span><b>Diet: </b></span>${apiData.diet}`;
    zooApp.infoEl.appendChild(zooApp.dietEl); 
    // Habitat
    zooApp.habitatEl = document.createElement('li');
    zooApp.habitatEl.innerHTML = `<span><b>Habitat: </b></span>${apiData.habitat}`;
    zooApp.infoEl.appendChild(zooApp.habitatEl); 
    // Geographical Range 
    zooApp.geoRangeEl = document.createElement('li');
    zooApp.geoRangeEl.innerHTML = `<span><b>Geographical Range: </b></span>${apiData.geo_range}`;
    zooApp.infoEl.appendChild(zooApp.geoRangeEl); 
}

zooApp.init();