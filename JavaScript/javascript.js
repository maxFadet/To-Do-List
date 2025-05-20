ja{
    let tasks = [
        {
            content: "przkładowo zrobione zadanie",
            done: true,
        },
        {
            content: "przykładowo nie zrobione zadanie",
            done: false,
        },
    ];

    let hideDoneTasks = false;

    const switchAllTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
        clearNewTaskInput();
    };

    const clearNewTaskInput = () => {
        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.value = "";
    };

    const focusOnForm = () => {
        const inputField = document.querySelector(".js-newTask");
        inputField.focus();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex)
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return {
                    ...task,
                    done: !task.done
                };
            }
            return task;
        });

        render();
    };

    const bindRemoveEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
          <button class="tasks__button tasks__button--toggleDone js-done"}">
            ${task.done ? "✓" : ""}
          </button>
          <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
            ${task.content}
          </span>
          <button class="tasks__button tasks__button--delete js-remove">
            ✗
          </button>
        </li>
      `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {

        let htmlString = "";

        const findNonEmptyTask = tasks.find(({ content }) => content !== "");

        if (findNonEmptyTask) {
            htmlString += `
      <button class= "container__headerButton js-toggleDoneTasks">
          ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
      </button>

      <button class="container__headerButton js-completeAllTasks" 
      ${tasks.every(task => task.done) ? "disabled" : ""}>
          Ukończ wszystkie
      </button>
      `;
        };

        document.querySelector(".js-listControlButtons").innerHTML = htmlString;
    };


    const bindButtonsEvents = () => {

        const switchHiddenTasksButton = document.querySelector(".js-toggleDoneTasks");
        if (switchHiddenTasksButton) {
            switchHiddenTasksButton.addEventListener("click", switchAllTasks);
        };

        const completeAllTasksButton = document.querySelector(".js-completeAllTasks");
        if (completeAllTasksButton) {
            completeAllTasksButton.addEventListener("click", completeAllTasks);
        }
    };

    const render = () => {

        renderTask();
        renderButtons(tasks)

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        const sendTaskBtn = document.querySelector(".js-sendTaskBtn");

        form.addEventListener("submit", onFormSubmit);
        sendTaskBtn.addEventListener("click", focusOnForm);
    };

    init();

};
