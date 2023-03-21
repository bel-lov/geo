export default function getCoords(value) {
    const coords = value.split(',');
    const latitude = coords[0].trim();
    const longitude = coords[1].trim();

    if (/^\[?-?\d{1,2}\.\d{1,9}\]?$/.test(latitude)
        && /^\[?-?\d{1,2}\.\d{1,9}\]?$/.test(longitude)) {
        return coords;
    }

    return false;
}