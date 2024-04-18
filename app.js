require("dotenv").config()

const APIKEY = process.env.APIKEY

function get_codes() {

    var codesurl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/codes"

    fetch(codesurl)
    .then(response =>{
        if(!response.ok){
            throw Error('Error could not fetch codes from API')
        }
        return response.json();
    })
    .then(data => {
        let codes = data.supported_codes;
        console.log(codes)
        return codes;
    })
    .catch(error => {
        console.error('Error:', error);
      });

    }

get_codes()
