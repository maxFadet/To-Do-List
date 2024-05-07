{

    const tasks = [
        {
            content: "zadanie nie wykonane",
            done: false,
        },
        {
            content: "zadanie już wykonane",
            done: true,
        },
    ];


    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.value = "";
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const moveTaskToTop = (taskIndex) => {
        if (taskIndex >= 0 && taskIndex < tasks.length) {
            const taskToMove = tasks.splice(taskIndex, 1)[0];
            tasks.unshift(taskToMove);

            render();
        };
    };

    const bunchOfEvents = () => {


        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const moveTaskButtons = document.querySelectorAll(".js-moveTask");
        moveTaskButtons.forEach((moveTaskButton, index) => {
            moveTaskButton.addEventListener("click", () => {
                moveTaskToTop(index);
            });
        });


    };



    const focusOnForm = () => {
        const inputField = document.querySelector(".js-newTask");
        inputField.focus();
    };


    const render = () => {

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
              <button class="blank__buttonList blank__buttonList--stick js-moveTask">
                <img class="blank__buttonImage" src="image/stick.png" alt="stick-your-task">
              </button>
              <button class="blank__buttonList blank__buttonList--delete js-remove">
                ✗
              </button>
            </li>
          `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bunchOfEvents();

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