let adMessage = document.querySelector('.todo_btn'),
    input = document.querySelector('.todo_in'),
    messagesBody = document.querySelector('.todo_body'),
    clearAllBtn = document.querySelector('.clear_todo');

let mainArray = [];

if (!localStorage.todo) {
    mainArray = [];
} else {
    mainArray = JSON.parse(localStorage.getItem('todo'));
    adTodoli();
}

const updateLocalStorage = () => {
    localStorage.setItem('todo', JSON.stringify(mainArray));
}

function eventObject() {
    let todoObject = {
        message: input.value,
        perform: false,
        hidden: false,
        important: false
    };
    mainArray.push(todoObject);
    updateLocalStorage();
    adTodoli();
}

adMessage.addEventListener('click', function () {
    if (!input.value || input.value.trim() === '') {
        input.value = '';
    } else {
        eventObject();
        input.value = '';
    }
});

function adTodoli() {
    let message = '';

    mainArray.forEach(function (item, i) {
        message +=
            `<li class="liItem ${item.important} ${item.perform} ${item.hidden}">
                    <span class="lolka ${item.perform ? 'performTaskOk' : 'performTaskNoOk'}">${item.perform ? 'Ok' : '---'}</span>
                    <span class="divMessage ${item.perform ? 'complete' : ''} ${item.hidden ? 'hidden' : ''} ${item.important ? 'important' : ''}">${item.message}</span>
                    <span class="btnWr">
                        <button type="button" class="btnHidden">H</button>
                        <button type="button" class="btnImportant">!</button>
                        <button type="button" class="delTask">X</button>
                    </span>
             </li>`;
        messagesBody.innerHTML = message;
        mainClick();
    })
}


function mainClick() {
    let allLi = messagesBody.querySelectorAll('.liItem');

    for (let i = 0; i < allLi.length; i++) {

        let liMessage = allLi[i].querySelector('.divMessage');
        let hiddenBtn = allLi[i].querySelector('.btnHidden');
        let btnImportant = allLi[i].querySelector('.btnImportant');
        let btnDelTask = messagesBody.querySelectorAll('.delTask');

        liMessage.addEventListener('click', function () {
            mainArray[i].perform = !mainArray[i].perform;
            updateLocalStorage();
            adTodoli();
        });

        hiddenBtn.addEventListener('click', function (e) {
            if (e.ctrlKey || e.metaKey) {
                mainArray[i].hidden = !mainArray[i].hidden;
                updateLocalStorage();
                adTodoli();
            }
        });

        btnImportant.addEventListener('click', function (e) {
            mainArray[i].important = !mainArray[i].important;
            updateLocalStorage();
            adTodoli();
        });

        // btnDelTask.addEventListener('click', function () {
        //     for (let d = 0; d < mainArray.length; d++) {
        //         mainArray.splice(1, 1);
        //         adTodoli();
        //         updateLocalStorage();
        //     }
        // });
    }
}

clearAllBtn.addEventListener('click', function () {
    mainArray = [];
    messagesBody.innerHTML = '';
    input.value = '';
    localStorage.clear();
    adTodoli();
});

// messagesBody.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// })




