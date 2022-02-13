fetch('https://zoo-animal-api.herokuapp.com/animals/rand')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonResponse) {
        console.log(jsonResponse);
    });
