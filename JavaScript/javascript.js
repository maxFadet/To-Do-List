{

    let tasks = [];

    let hideDoneTask = false;

    const toggleButtonHideDoneTask = {
        [hideDoneTask]: true,
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.value = "";
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

    // const moveTaskToTop = (taskIndex) => {
    //     if (taskIndex >= 0 && taskIndex < tasks.length) {
    //         const taskToMove = tasks.splice(taskIndex, 1)[0];
    //         tasks.unshift(taskToMove);

    //         render();
    //     };
    // };

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
    // const moveTaskButtons = document.querySelectorAll(".js-moveTask");
    // moveTaskButtons.forEach((moveTaskButton, index) => {
    //     moveTaskButton.addEventListener("click", () => {
    //         moveTaskToTop(index);
    //     });
    // });





    const focusOnForm = () => {
        const inputField = document.querySelector(".js-newTask");
        inputField.focus();
    };


    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="blank__listItem">
          <button class= "blank__buttonList js-done
            ${task.done ? "" : "blank__buttonList blank__buttonList--greenMark"}"
          >
            ✓
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

    const renderButtons = (tasks) => {

        const findNonEmptyTask = tasks.find(({ content }) => content !== "");

        let htmlString = "";

        if (findNonEmptyTask) {
            htmlString += `
    <li class="blank__listControlButtons">
      <button class= "blank__controlButtons js-toggleDoneTasks">
        Ukryj ukończone
      </button>
    </li>
    <li class="blank__listControlButtons">
      <button class="blank__controlButtons">
        Ukończ wszystkie
      </button>
    </li>
  `;
        };


        document.querySelector(".js-listControlButtons").innerHTML = htmlString;
    };

    const switchHidenTask = (tasks) => {

    };



    const bindButtonsEvents = () => {

        const toggleHiddenTasks = document.querySelector(".js-toggleDoneTasks");
        toggleHiddenTasks.addEventListener("click", () => {
            switchHidenTask()
        })
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

// const seasones = ["jesień", "zima", "lato", "wiosna"]


// const exceptFirst = seasones.slice(1, 4)

// console.log(exceptFirst);
