var apikey = "8918913c1d72044d7d6a318a"
var url = "https://v6.exchangerate-api.com/v6/"+apikey+"/codes"


fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('NOT OKAY !')
    }
    return response.json();
    })
    .then(data => {console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
      });



