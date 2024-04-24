

const APIKEY = "154de4bb83aec54d16a03320"



codesurl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/codes"


const hardcodedRates = {
    GBP: { EUR: 1.17, USD: 1.25 },
    EUR: { GBP: 0.85, USD: 1.07 },
    USD: { GBP: 0.80, EUR: 0.93 }
};

function use_hardcoded() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

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

    try {
        response = await fetch(codesurl);
        if(!response.ok){

            throw new Error('Failed to fetch data from API.')
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
        use_hardcoded()
    }
}
get_codes();

function swapCurrency() {

    console.log("Swap function called");
    const toCurrency = document.getElementById('toCurrency');
    const fromCurrency = document.getElementById('fromCurrency');

    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value

    fromCurrency.value = toCurrencyValue;
    toCurrency.value = fromCurrencyValue;

    fromCurrency.dispatchEvent(new Event('change'));
    toCurrency.dispatchEvent(new Event('change'));

}



async function convertCurrency() {
    const toCurrency = document.getElementById('toCurrency').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const amount = document.querySelector('.input_currency').value;
    const resultDiv = document.getElementById('result');

    
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
    }

    
    const apiUrl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/latest/"+fromCurrency; // Adjust 'to' as needed or make dynamic

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch the exchange rate');
            
        }
        const data = await response.json();
        const rates = data.conversion_rates;
        const rate = rates[toCurrency]; 
        const result = conversion(amount, rate);

       
        resultDiv.textContent = `Converted ${fromCurrency} to Amount: ${result}`;


    } catch (error) {
        console.error('Error:', error);
        // Use hardcoded rates if available
        if (hardcodedRates[fromCurrency] && hardcodedRates[fromCurrency][toCurrency]) {
            const rate = hardcodedRates[fromCurrency][toCurrency];
            const result = conversion(amount, rate);
            resultDiv.textContent = `Converted using hardcoded rate: ${fromCurrency} to ${toCurrency} Amount: ${result}`;
        } else {
            resultDiv.textContent = 'Error converting currency: ' + error.message;
            use_hardcoded();
      
        
    }
}

function conversion(amount , rate){

    return((amount * rate)).toFixed(2)

}

module.exports = { conversion,convertCurrency }
