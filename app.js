

const APIKEY = "154de4bb83aec54d16a03320"
codesurl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/codes"




async function get_codes() {

    try {
        response = await fetch(codesurl);
        if(!response.ok){
            throw new Error('Failed')
        }
    const data = await response.json();
    const codes = data.supported_codes;
     
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    codes.forEach(([code, name]) => {
        // Create a new option element for 'from' currency
        const fromOption = document.createElement('option');
        fromOption.value = code;
        fromOption.text = `${code} - ${name}`;
        fromCurrencySelect.appendChild(fromOption);

        // Create a new option element for 'to' currency
        const toOption = document.createElement('option');
        toOption.value = code;
        toOption.text = `${code} - ${name}`;
        toCurrencySelect.appendChild(toOption);
    });
}
    catch (error) {
        console.error('Error:', error);
    }
}
get_codes();

let fromcur = document.getElementById('fromCurrency');

// Then, add the event listener to the element
fromcur.addEventListener('change', function() {
    // This function can now do something meaningful when the user changes the selected option.
    console.log("Selection changed to:", fromcur);
});