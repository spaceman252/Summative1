
const { describe } = require('yargs');
const { conversion,convertCurrency } = require('./app.js');


test('Two integers get multiplied and return a string 2 d.p', () => {
    expect(conversion(3, 8)).toBe("24.00");
});

test('Two floats get multiplied and return a string 2 d.p', () => {
    expect(conversion(4.55, 9.1)).toBe("41.40");
});




global.fetch = jest.fn(); 
beforeEach(() => {
 
  document.body.innerHTML = `
    <input id="toCurrency" value="EUR" />
    <input id="fromCurrency" value="USD" />
    <input class="input_currency" value="100" />
    <div id="result"></div>
  `;
  fetch.mockClear();
});

it('should display an error message for invalid input amounts', async () => {
  document.querySelector('.input_currency').value = 'abc'; 
  await convertCurrency();
  const resultDiv = document.getElementById('result');
  expect(resultDiv.textContent).toBe('Please enter a valid amount');
});

it('should handle fetch errors gracefully', async () => {
  document.querySelector('.input_currency').value = '100';
  fetch.mockImplementationOnce(() => Promise.reject('Network error')); 
  await convertCurrency();
  const resultDiv = document.getElementById('result');
  expect(resultDiv.textContent).toBe('Error converting currency');
});

it('should update the resultDiv correctly on successful conversion', async () => {
  document.querySelector('.input_currency').value = '100';
  fetch.mockImplementationOnce(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      conversion_rates: { EUR: 0.85 }
    }),
  }));

  await convertCurrency();
  const resultDiv = document.getElementById('result');
  expect(resultDiv.textContent).toBe('Converted USD to Amount: 85.00');
});
it('Should fail when given a negative number' , async () => {
    document.querySelector('.input_currency').value = '-100'
    await convertCurrency();
    const resultDiv = document.getElementById('result');
    expect(resultDiv.textContent).toBe('Please enter a valid amount');
}
)

