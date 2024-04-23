// Assuming the conversion function is exported from another file
const { conversion } =  require('./app.js')

test('Two integers get multiplied and return a string 2 d.p', () => {
    expect(conversion(3, 8)).toBe("24.00");
});

test('Two floats get multiplied and return a string 2 d.p', () => {
    expect(conversion(4.55, 9.1)).toBe("41.40");
});
