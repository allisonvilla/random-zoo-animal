const zooApp = {}

zooApp.init = function() {
    zooApp.getData();
}

zooApp.nameEl = document.querySelector('.animal-name'); 
zooApp.imgEl = document.querySelector('.img-container'); 
zooApp.infoEl = document.querySelector('.animal-info'); 

zooApp.getData = function() {
    fetch('https://zoo-animal-api.herokuapp.com/animals/rand')
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            zooApp.displayData(jsonResponse);
        });
    }
    
zooApp.displayData = function(apiData) {
    // Put stuff from the jsonResponse into variables and add to DOM
    zooApp.nameEl.textContent = apiData.name;
    zooApp.animalImg = document.createElement('img');
    zooApp.animalImg.src = apiData.image_link; 
    zooApp.imgEl.appendChild(zooApp.animalImg); 

    // Can use for-in loop to print items inside the object into the infoEl?
    for (const property in apiData) {
        zooApp.listEl = document.createElement('li');
        zooApp.listEl.textContent = `${property}: ${apiData[property]}`;
        zooApp.infoEl.appendChild(zooApp.listEl);  
    }

    // I don't want it to display absolutely everything, so I should specify which properties I want shown on the page
    
}

// Have an input (drop-down menu) that lets the user choose what type of animal they would like to see

zooApp.init();