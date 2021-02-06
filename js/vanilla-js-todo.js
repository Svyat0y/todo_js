const CustomTodo = function (e) {

    let mainTodoId = e.elem ? document.getElementById(e.elem) : e.elem;
    let adMessage = mainTodoId.querySelector('.todo_btn'),
        input = mainTodoId.querySelector('.todo_in'),
        messagesBody = mainTodoId.querySelector('.todo_body'),
        clearAllBtn = mainTodoId.querySelector('.clear_todo'),
        hiddenItem;

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

    input.addEventListener('keydown', function (e) {
        if (!input.value || input.value.trim() === '') {
            return input.value = '';
        } else if (e.keyCode === 13) {
            eventObject();
            input.value = '';
        }
    })

    function adTodoli() {

        if (mainArray.length === 0) {
            messagesBody.innerHTML = '';
        } else {
            hiddenFilterArray();
            performFilterArray();
            importantFilterArray();
        }

        let message = '';

        mainArray.forEach(function (item) {
            message +=
                `<li class="liItem ${item.important} ${item.perform} ${item.hidden}">
                    <span class="${item.perform ? 'performTaskOk' : 'performTaskNoOk'}">${item.perform ? 'Ok' : '---'}</span>
                    <span class="divMessage ${item.perform ? 'complete' : ''}${item.hidden ? 'hidden' : ''}${item.important ? 'important' : ''}">${item.hidden ? '****' : item.message}</span>
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

    function performFilterArray() {
        let performItem = mainArray.length && mainArray.filter(item => item.perform === true);
        let notPerformItem = mainArray.length && mainArray.filter(item => item.perform === false);
        mainArray = [...notPerformItem, ...performItem];
    }

    function importantFilterArray() {
        let importantItem = mainArray.length && mainArray.filter(item => item.important === true);
        let notImportantItem = mainArray.length && mainArray.filter(item => item.important === false);
        mainArray = [...importantItem, ...notImportantItem];
    }

    function hiddenFilterArray() {
        hiddenItem = mainArray.length && mainArray.filter(item => item.hidden === true);
    }

    function mainClick() {
        let allLi = messagesBody.querySelectorAll('.liItem');

        for (let i = 0; i < allLi.length; i++) {

            let liMessage = allLi[i].querySelector('.divMessage');
            let hiddenBtn = allLi[i].querySelector('.btnHidden');
            let btnImportant = allLi[i].querySelector('.btnImportant');
            let btnDelTask = allLi[i].querySelector('.delTask');

            liMessage.addEventListener('click', function () {
                if (!mainArray[i].hidden) {
                    mainArray[i].perform = !mainArray[i].perform;
                    mainArray[i].important = false;
                }
                updateLocalStorage();
                adTodoli();
            });

            hiddenBtn.addEventListener('dblclick', function () {
                if (!mainArray[i].perform) {
                    mainArray[i].hidden = !mainArray[i].hidden;
                    mainArray[i].important = false;
                }
                updateLocalStorage();
                adTodoli();
            });

            btnImportant.addEventListener('click', function () {
                if (mainArray[i].perform || mainArray[i].hidden) {
                    return;
                } else {
                    mainArray[i].important = !mainArray[i].important;
                }
                updateLocalStorage();
                adTodoli();
            });

            btnDelTask.addEventListener('click', function () {
                if (!mainArray[i].hidden) {
                    mainArray.splice(i, 1);
                }
                updateLocalStorage();
                adTodoli();
            });

        }
    }

    clearAllBtn.addEventListener('click', function () {
        if (!mainArray.length) {
            return;
        }
        localStorage.clear();
        input.value = '';
        messagesBody.innerHTML = '';
        mainArray = [...hiddenItem];
        updateLocalStorage();
        adTodoli();
    });
}