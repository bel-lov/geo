import { createMessage } from './textEntry';

const allMessages = [];

export default function save(message) {
    allMessages.push(message);
    localStorage.setItem('messages', JSON.stringify({ messages: allMessages }));
}

export function load() {
    let saveMessages;

    try {
        saveMessages = JSON.parse(localStorage.getItem('messages'));
        if (saveMessages.messages) {
            saveMessages.messages.forEach((item) => {
                createMessage(item.time, item.text, item.coords);
            });
        }
    } catch (e) {
        console.log('Ошибка', e);
    }
}