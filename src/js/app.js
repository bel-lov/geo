import getCoords from './coords';
import { load } from './storage';
import { createMessage } from './textEntry';
import getTime from './time';

const form = document.querySelector('.form');
const modal = document.querySelector('.modal');
const inputMessage = document.querySelector('.input');
const inputModal = document.querySelector('.location');
const input = document.querySelector('.input');

load();

function getLocation() {
    modal.style.display = 'block';
    inputModal.focus();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = inputMessage;
    const time = getTime();
    let coords;
    if (navigator.geolocation) {
        const locationCoords = () => new Promise(((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                }, (error) => {
                    console.log(error);
                    reject(getLocation());
                },
            );
        }));

        locationCoords().then((position) => {
            coords = `[${position.coords.latitude}, -${position.coords.longitude}]`;
            createMessage(time, value, coords);
        });
    } else {
        getLocation(time, value);
    }
});

const locationForm = document.querySelector('.locationForm');
locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const time = getTime();
    const { value } = inputMessage;
    if (inputModal.value.includes(',')) {
        const inputed = getCoords(inputModal.value);
        if (inputed === false) {
            alert('Ошибка ввода');
        } else {
            modal.style.display = 'none';
            createMessage(time, value, inputed);
            inputModal.value = '';
        }
    } else {
        alert('Проверьте правильность ввода');
    }
});

const exit = document.querySelector('.exit');
exit.addEventListener('click', () => {
    modal.style.display = 'none';
    input.focus();
});