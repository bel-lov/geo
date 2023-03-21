import getCoords from '../coords';

test.each([
    ['51.50851, -0.12572', true],
    ['51.50851,-0.12572', true],
    ['[51.50851, -0.12572]', true],
    ['[51, -0.12572]', false],
])(('проверка введенных координат'), (input, expected) => {
    const result = getCoords(input);
    expected(result).toEqual(expected);
});