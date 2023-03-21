export default function getTime() {
    const newDate = new Date();
    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    let month = newDate.getMonth();
    if (month < 10) {
        month = `0${month}`;
    }
    const year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${date}.${month}.${year} ${hours}:${minutes}`;
}