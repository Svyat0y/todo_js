let adMessage = document.querySelector('.todo_btn'),
    input = document.querySelector('.todo_in'),
    messagesBody = document.querySelector('.todo_body');

let mainArray = [];

const updateLocalStorage = () => {
    localStorage.setItem('todo', JSON.stringify(mainArray));
}

if (!localStorage.todo) {
    mainArray = [];
} else {
    mainArray = JSON.parse(localStorage.getItem('todo'));
    adTodoli();
}

function eventObject() {
    let todoObject = {
        message: input.value,
        perform: true,
        hidden: false,
        important: false
    };
    mainArray.push(todoObject);
    updateLocalStorage();
    adTodoli();
    input.value = '';
}

adMessage.addEventListener('click', function () {
    eventObject();
    console.log(mainArray);
});


function adTodoli() {
    let message = '';

    mainArray.forEach(function (item, i) {
        message +=
            `<li class="liItem ${item.important} ${item.perform} ${item.hidden}">
                    <span class="${item.perform ? 'performTaskGreen' : 'performTaskRed'}">${item.perform ? 'Ok' : ''}</span>
                    <span class="divMessage"><p>${item.message}</p></span>
                    <span class="btnWr">
                        <button type="button" class="btnHidden">H</button>
                        <button type="button" class="btnImportant">!</button>
                        <button type="button" class="delTask">X</button>
                    </span>
             </li>`;
        messagesBody.innerHTML = message;
    })
}




