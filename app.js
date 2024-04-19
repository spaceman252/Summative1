

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

async function swapCurrency() {

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

    // Check if the amount is a valid number
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
    }

    // Construct the API URL
    const apiUrl = "https://v6.exchangerate-api.com/v6/"+APIKEY+"/latest/"+fromCurrency; // Adjust 'to' as needed or make dynamic

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch the exchange rate');
        }
        const data = await response.json();
        const rates = data.conversion_rates;
        const rate = rates[toCurrency]; // Assuming the API returns an object with a 'rate' property

        // Calculate the result
        const result = amount * rate;

        // Update the result div
        resultDiv.textContent = `Converted ${fromCurrency} to Amount: ${result.toFixed(2)}`;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'Error converting currency';
    }
}
