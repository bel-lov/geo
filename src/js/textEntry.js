import save from './storage';

export default class Message {
    constructor(time, text, coords) {
        this.time = time;
        this.text = text;
        this.coords = coords;
    }

    addMessage() {
        const timeline = document.querySelector('.timeline');

        const message = document.createElement('div');
        message.classList.add('message');

        const time = document.createElement('div');
        time.classList.add('time');
        time.textContent = this.time;

        const text = document.createElement('div');
        text.classList.add('text');
        text.textContent = this.text;

        const coords = document.createElement('div');
        coords.classList.add('coords');
        coords.textContent = this.coords;

        message.appendChild(time);
        message.appendChild(text);
        message.appendChild(coords);
        timeline.appendChild(message);
    }
}

export function createMessage(time, text, coords) {
    const input = document.querySelector('.input');
    const message = new Message(time, text, coords);
    message.addMessage(message);
    input.value = '';
    save(message);
    input.focus();
}