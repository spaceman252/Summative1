const APIKEY = "154de4bb83aec54d16a03320"  //API key for connection could benefit from being in a .env file for privacy
codesurl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/codes"  //Url to query currecny codes

//define hardcoded conversions 
const hardcodedRates = {
    GBP: { EUR: 1.17, USD: 1.25 },
    EUR: { GBP: 0.85, USD: 1.07 },
    USD: { GBP: 0.80, EUR: 0.93 }
};




function use_hardcoded(){
    /**
 * Populates 'from' and 'to' currency dropdowns with options based on hardcoded currency rates.
 * This function retrieves the html cuurency dropdowns and fills them with hardcoded currency codes as options. 
 * It ensures that any pre-existing options are removed before filling to avoid duplication.
 */
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    
    if (!fromCurrencySelect || !toCurrencySelect) {
        console.error('Currency select elements not found!');
        return; // Exit the function if elements are not found
    }
    // Clear existing options first if any
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';

    // Iterate over hardcoded rates to populate the dropdowns
    for (const [code, rates] of Object.entries(hardcodedRates)) {
        // Create and append option for 'from' currency
        const fromOption = document.createElement('option');
        fromOption.value = code;
        fromOption.text = code;
        fromCurrencySelect.appendChild(fromOption);

        // Create and append option for 'to' currency
        const toOption = document.createElement('option');
        toOption.value = code;
        toOption.text = code;
        toCurrencySelect.appendChild(toOption);
    
    }
}


async function get_codes() {

    //** Retrieves Currecny codes from Exchnage rate API and populates the toCurrency and fromCurrency options */

    try {
        //query the Exchnage rate API for currency codes
        response = await fetch(codesurl);

        //if query fails throws an error
        if(!response.ok){


            throw new Error('Failed to fetch data from API.')
            
        }
    const data = await response.json();
    const codes = data.supported_codes;
     

    //retrive 'to' and 'from' options to fill
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

        //if API fails call use_hardcoded to populate options with hardcoded vals
        use_hardcoded();

        
    }
}

//call get codes each time page loads
get_codes();



function swapCurrency() {
    /** Swaps to and from currecny in HTML */ 

    //locate 'to' and 'from' elements in html
    console.log("Swap function called");
    const toCurrency = document.getElementById('toCurrency');
    const fromCurrency = document.getElementById('fromCurrency');


    //define and swap values 
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value

    fromCurrency.value = toCurrencyValue;
    toCurrency.value = fromCurrencyValue;

    //Trigger event change 
    fromCurrency.dispatchEvent(new Event('change'));
    toCurrency.dispatchEvent(new Event('change'));

}



async function convertCurrency() {
    /** Calls Exchnage rate API to get currecny live conversion data
     * extracts toCurrency data and calls conversion function to 
     * convert fromCurrency into result.
     */
    //// set user options as varibles and get result box as variable
    const toCurrency = document.getElementById('toCurrency').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const amount = document.querySelector('.input_currency').value;
    const resultDiv = document.getElementById('result');

    //if amount entered is invalid throw error in box
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
    }

    //Api to query conversion rates for selected currency 
    const apiUrl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/latest/"+fromCurrency; 

    try {

        //if api query fails throw annd catch error.
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch the exchange rate');
            
        }

        //get response as json and pull out requested currecny rate
        const data = await response.json();
        const rates = data.conversion_rates;
        const rate = rates[toCurrency]; 
        const result = conversion(amount, rate); //call conversion function to return result

       //display result to user
        resultDiv.textContent = `Converted ${fromCurrency} to Amount: ${result}`;


    } catch (error) {
        console.error('Error:', error);
        // Use hardcoded rates if available 
        if (hardcodedRates[fromCurrency] && hardcodedRates[fromCurrency][toCurrency]) {
            const rate = hardcodedRates[fromCurrency][toCurrency];
            const result = conversion(amount, rate);
            resultDiv.textContent = `Converted using hardcoded rate: ${fromCurrency} to ${toCurrency} Amount: ${result}`;
        } else {

            //if hard coded rates not selected and api fails call use hardcoded so user can select hardcoded options.

            resultDiv.textContent = 'Error converting currency: ' + error.message;
            use_hardcoded();
        }
        
    }
}

function conversion(amount , rate){

    return((amount * rate)).toFixed(2)

}

module.exports = { conversion,convertCurrency }
