const zooApp = {}

zooApp.nameEl = document.querySelector('.animal-name'); 
zooApp.imgEl = document.querySelector('.img-container'); 
zooApp.infoEl = document.querySelector('.animal-info'); 

fetch('https://zoo-animal-api.herokuapp.com/animals/rand')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonResponse) {
        console.log(jsonResponse);
        // Put stuff from the jsonResponse into variables and add to DOM
        zooApp.nameEl.textContent = jsonResponse.name;
        zooApp.animalImg = document.createElement('img');
        zooApp.animalImg.src = jsonResponse.image_link; 
        zooApp.imgEl.appendChild(zooApp.animalImg); 
        // Can use for-in loop to print items inside the object into the infoEl?
        for (const property in jsonResponse) {
            zooApp.listEl = document.createElement('li');
            zooApp.listEl.textContent = `${property}: ${jsonResponse[property]}`;
            zooApp.infoEl.appendChild(zooApp.listEl);  
        }
        // I don't want it to display absolutely everything, so I should specify which properties I want shown on the page
    });

// Have an input (drop-down menu) that lets the user choose what type of animal they would like to see