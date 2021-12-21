const APP = {
    todoList: [],
    container: document.querySelector(".items-container"),
    key: "sfjaksdflasjsaletqwetoijknfnasgkhjgl",
    init: function () {
        // push some initial todo items;

        APP.initialSetup();
        APP.displayTodo();
        APP.remainingInterface();
        APP.addEvents();

    },

    addEvents() {
        document.addEventListener("click", (ev) => {
            let target = ev.target;
            if (target.closest("button")) {

                // let's add a ripple effect so that user know that he clicked
                APP.createRippleEffect(ev);
                APP.addNewItem();
            }

            if (target.closest("input[type=checkbox]")) {
                let task = target.parentElement.querySelector("p").textContent;
                APP.todoList = APP.todoList.filter((item) => {
                    if (item === task) return false;
                    return true;
                })
                APP.save();
                APP.displayTodo();
            }
        })


    },

    createRippleEffect(ev) {
        let target = ev.target;
        let span = document.createElement("span");
        console.log(ev.offsetX, ev.offsetY);
        let x = ev.offsetX;
        let y = ev.offsetY;

        // good approach would be add this all css in css file

        span.classList.add("ripple");
        span.style.cssText = `
        left: ${x};
        top: ${y};
        width: ${getComputedStyle(target)["width"]};
        height: ${getComputedStyle(target)["height"]};
        `
        target.appendChild(span);
        setTimeout(() => {
            span.remove();
        }, 300);
    },

    initialSetup: function () {
        let initialItems = [
            "Welcome to the To Do List!",
            "Hit the + button to add an item.",
            "click on checkbox to delete an item."
        ];

        let todo = JSON.parse(localStorage.getItem(APP.key));
        if (todo) {
            // localStorage contain the todolist
            APP.todoList = todo;
        } else {
            // add initial items for the first time and save to localStorage
            APP.todoList = APP.todoList.concat(initialItems);
            console.log(APP.todoList);
            APP.save();
        }
    },

    addDate() {
        let title = document.querySelector(".title");
        title.innerHTML = "";
        // now adding the current date as my title
        // with language-sensitive date
        // hindli language if not supported fallback english(US)
        let date = new Intl.DateTimeFormat(["hi-HI", "en-US"], { dateStyle: "full" }).format(new Date());
        console.log(date);
        let p = document.createElement("p");
        p.textContent = date;
        title.appendChild(p); 
    },

    displayTodo() {
        APP.addDate();
        APP.container.innerHTML = "";
        let df = new DocumentFragment();
        APP.todoList.forEach((item) => {

            let div = document.createElement("div");
            let p = document.createElement("p");
            let input = document.createElement("input");
            input.type = "checkbox";
            p.textContent = item;

            // add css classess here
            // i didn't added bcoz this can be styled without that

            div.appendChild(input);
            div.appendChild(p);
            df.appendChild(div);
        })
        APP.container.appendChild(df);
    },

    remainingInterface() {
        let wrapper = document.querySelector(".wrapper-bt-input");
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "New Item"
        let button = document.createElement('button');
        button.textContent = "+";
        let df = new DocumentFragment();

        // add css classess here; 


        df.appendChild(input);
        df.appendChild(button);
        wrapper.appendChild(df);
    },

    addNewItem() {
        let input =  document.querySelector("input[type=text]"); 
        let value =input.value.trim();
        if(APP.todoList.includes(value)) {
            // doesnot include the task if already there
            input.value = "";
            return
        };
        if (value.length !== 0) {
            APP.todoList.push(value);
            APP.save();
            // APP.container.appendChild(div);
            APP.displayTodo();
            input.value = "";
        }
    },


    save: function () {
        // save the todo to the localStorage
        localStorage.setItem(APP.key, JSON.stringify(APP.todoList));

    }
}

document.addEventListener("DOMContentLoaded", APP.init);
