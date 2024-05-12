{

    let tasks = [];


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
        <li class="blank__listItem ${task.done && hideDoneTasks ? "blank__listItem--Hidden" : ""}">
          <button class= "blank__buttonList blank__buttonList--greenMark js-done"}"
          >
          ${task.done ? "✓" : ""}
          </button>
          <span
            ${task.done ? "class=blank__textList" : ""}
          >
            ${task.content}
          </span>
          <button class="blank__buttonList blank__buttonList--delete js-remove">
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
    <li class="blank__listControlButtons">
      <button class= "blank__controlButtons js-toggleDoneTasks">
      ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
      </button>
    </li>
    <li class="blank__listControlButtons">
      <button class="blank__controlButtons js-completeAllTasks" 
      ${tasks.every(task => task.done) ? "disabled" : ""}>
          Ukończ wszystkie
      </button>
    </li>
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
