let adMessage = document.querySelector('.todo_btn'),
    inputMessage = document.querySelector('.todo_in'),
    messagesBody = document.querySelector('.todo_body');

let mainArray = [];

function eventObject() {
    let todoObject = {
        message: 'inputMessage',
        important: false,
        perform: false,
        hidden: false
    };
}

adMessage.addEventListener('click', function () {
    mainArray += todoObject;
});


