const zooApp = {}

zooApp.animalName = documnent.querySelector('.animal-name'); 
zooApp.animalImg = documnent.querySelector('.img-container'); 
zooApp.animalInfo = document.querySelector('.animal-info'); 

fetch('https://zoo-animal-api.herokuapp.com/animals/rand')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonResponse) {
        console.log(jsonResponse);
        // Put stuff from the jsonResponse into variables
    });

// Have an input (drop-down menu) that lets the user choose what type of animal they would like to see