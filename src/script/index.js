import Manager from "./manager"
import "../style/reset.css"
import "../style/index.css"
import "../style/sidebar.css"
import "../style/main.css"
import "../style/info.css"



//currently for command line
const Todocommand = function ()
    {
        let todo = new Manager()
        todo.loadData();

        function displayMainOptions() {
            console.log("Options:");
            console.log("1- Enter inbox list");
            console.log("2- Enter today list");
            console.log("3- Enter next 7 days list");
            console.log("4- Show all lists");
            console.log("5- Add new list");
            console.log("6- Delete list");
            console.log("7- Save data");
            console.log("0- Exit");
        
            const choice = prompt("Enter your choice:");
            handleMainChoice(choice);
        }
        
        function handleMainChoice(choice) {
            switch (choice) {
                case '1':
                    enterList(todo.inbox);
                    break;
                case '2':
                    enterList(todo.today);
                    break;
                case '3':
                    enterList(todo.next7);
                    break;
                case '4':
                    showAllLists();
                    break;
                case '5':
                    addNewList();
                case '6':
                    deleteList();
                case '7':
                    saveData();
                    break;
                case '0':
                    console.log("Goodbye!");
                    break;
                default:
                    console.log("Invalid choice. Try again.");
                    displayMainOptions();
                    break;
            }
        }
        
        function enterList(listId) {
            console.log("List Options:");
            console.log("1- Add new task");
            console.log("2- Add new note");
            console.log("3- Show all tasks and notes");
            console.log("4- Return to all options");
            console.log("5- Delete task");
        
            const choice = prompt("Enter your choice:");
            handleListChoice(choice, listId);
        }
        
        function handleListChoice(choice, listId) {
            switch (choice) {
                case '1':
                    addNewTask(listId);
                    break;
                case '2':
                    addNewNote(listId);
                    break;
                case '3':
                    showAllTasksAndNotes(listId);
                    break;
                case '4':
                    displayMainOptions();
                    break;
                case '5':
                    deleteTask(listId)
                    break;
                default:
                    console.log("Invalid choice. Try again.");
                    enterList(listId);
                    break;
            }
        }
        
        function showAllLists() {
            const listIds = todo.getAllListIds();
            listIds.forEach(id => {
                const listInfo = todo.getListInfo(id);
                console.log(`List: ${listInfo.name} (ID: ${id})`);
            });
        
            const listId = prompt("Enter list ID to enter it, or '-1' to return to main menu:");
            if (listId === '-1') {
                displayMainOptions();
            } else {
                enterList(listId);
            }
        }
        
        function addNewList() {
            const listName = prompt("Enter new list name:");
            const newListId = todo.addList(listName);
            console.log(`New list created with ID: ${newListId}`);
            displayMainOptions();
        }
        
        function addNewTask(listId) {
            const name = prompt("Enter task name:");
            const description = prompt("Enter task description:");
            const date = prompt("Enter task date (YYYY-MM-DD):");
            const priority = prompt("Enter task priority:");
        
            const taskId = todo.addTask({name, description, date, priority}, listId);
            if (taskId !== false) {
                console.log(`Task added with ID: ${taskId}`);
            } else {
                console.log("Failed to add task.");
            }
            enterList(listId);
        }

        function deleteList() {
            const listIds = todo.getAllListIds();
            listIds.forEach(id => {
                const listInfo = todo.getListInfo(id);
                console.log(`List: ${listInfo.name} (ID: ${id})`);
            });
            const listId = prompt("Enter list ID to delete:");
            if (todo.deleteList(listId)) {
                console.log(`List with ID: ${listId} deleted.`);
            } else {
                console.log("Invalid list ID. Try again.");
            }
            displayMainOptions();
        }
        
        function addNewNote(listId) {
            const name = prompt("Enter note name:");
            const description = prompt("Enter note description:");
        
            const noteId = todo.addNote(name, description, listId);
            if (noteId !== false) {
                console.log(`Note added with ID: ${noteId}`);
            } else {
                console.log("Failed to add note.");
            }
            enterList(listId);
        }
        
        function showAllTasksAndNotes(listId) {
            const listInfo = todo.getListInfo(listId);
        
            console.log("Tasks:");
            listInfo.tasks.forEach(taskId => {
                const task = todo.getTaskInfo(taskId);
                if(task)
                    console.log(`Task: ${task.name} (ID: ${taskId})`);
                else
                    console.log("failed");
            });
        
            console.log("Notes:");
            listInfo.notes.forEach(noteId => {
                const note = todo.getNoteInfo(noteId);
                if(note)
                    console.log(`Note: ${note.name} (ID: ${noteId})`);
                else
                    console.log("failed")
            });
        
            const itemId = prompt("Enter task/note ID to view details, or '-1' to return to list menu:");
            if (itemId === '-1') {
                enterList(listId);
            } else {
                const task = todo.getTaskInfo(itemId);
                if (task) {
                    console.log(`Task: ${task.name}`);
                    console.log(`Description: ${task.description}`);
                    console.log(`Date: ${task.date}`);
                    console.log(`Priority: ${task.priority}`);
        
                    const complete = prompt("Mark task as complete? (yes/no):");
                    if (complete.toLowerCase() === 'yes') {
                        todo.completeTask(itemId);
                        console.log("Task marked as complete.");
                    }
                } else {
                    const note = todo.getNoteInfo(itemId);
                    if (note) {
                        console.log(`Note: ${note.name}`);
                        console.log(`Description: ${note.description}`);
                    } else {
                        console.log("Invalid ID. Try again.");
                    }
                }
                showAllTasksAndNotes(listId);
            }
        }

        function deleteTask(listId)
        {
            const listInfo = todo.getListInfo(listId);
        
            console.log("Tasks:");
            listInfo.tasks.forEach(taskId => {
                const task = todo.getTaskInfo(taskId);
                if(task)
                    console.log(`Task: ${task.name} (ID: ${taskId})`);
                else
                    console.log("failed");
            });
        
            let itemId = prompt("Enter task ID to delete or '-1' to return to list menu:")
            if (itemId === '-1') {
                enterList(listId);
            }
            else
            {
                const deleted = todo.deleteTask(itemId);
                if(deleted)
                    console.log("task deleted successfully")
                else
                    console.log("failed")
                enterList(listId);
            }



        }
        
        function saveData()
        {
           todo.saveData();
           todo.loadData();
           //displayMainOptions();
        }

        displayMainOptions();
        
    };


const todo = (function (){

    const todo = new Manager();
    todo.addTask({name:'task1'},0)
    todo.addTask({name:'task2'},0)
    todo.addTask({name:'task3'},0)
    todo.addTask({name:'task4'},0)
    todo.addNote({name:"note1"},0)

    //main containers
    const allListContainer = document.querySelector(".all-lists");
    const listContainer = document.querySelector(".list-container");
    const listTaskNoteContainer = document.querySelector(".notes-tasks-container")
    const infoTaskContainer = document.querySelector(".info-task");
    const infoNoteontainer = document.querySelector(".info-note");
    
    //listeners

    //listeners related to displaying things
    const dateToggleButton = document.querySelector(".date-toggle");
    const priorityToggleButton = document.querySelector('.priority-flag-button');
    const showAddListFormButton = document.querySelector(".add-list-button")
    const cancelListFormButton = document.querySelector(".cancel-list-form")

    //listeners for the main lists
    const inboxButton = document.querySelector(".inbox");
    const todayButton = document.querySelector(".today");
    const next7Button = document.querySelector(".next7");

    //listerner related for adding tasks
    const addTaskForm = document.querySelector(".add-task-form");
    const datePicker = document.querySelector('.input-date');
    const taskDate = document.querySelector(".task-date")
    const priorityPicker = document.querySelector('.priority-container');
    const taskPriority = document.querySelector(".task-priority");


    //listerner related for adding lists
    const addListForm = document.querySelector(".add-list-form")
    const submitListFormButton = document.querySelector(".submit-list-form")

    //listerner related for changing task and notes information in the info section
    const changeTaskInfoButton = document.querySelector(".submit-change-task-button");
    const changeNoteInfoButton = document.querySelector(".submit-change-note-button");
    
    function init()
    {
        //listeners related to displaying things
        dateToggleButton.addEventListener('click', toggleDateInput);
        priorityToggleButton.addEventListener("click", togglePriorityInput)
        
        //listeners for the main lists
        inboxButton.addEventListener("click", handleListSelect);
        todayButton.addEventListener("click", handleListSelect);
        next7Button.addEventListener("click", handleListSelect);

        addTaskForm.addEventListener("submit", handleAddtask);
        datePicker.addEventListener("input", displaySelectedDate);
        priorityPicker.addEventListener("input", displaySelectedPriority);

        showAddListFormButton.addEventListener("click", displayAddListForm);
        cancelListFormButton.addEventListener("click", closeAddListForm);
        submitListFormButton.addEventListener("click", handleAddList)

        changeTaskInfoButton.addEventListener("submit", handleChangeTaskInfo)
        changeNoteInfoButton.addEventListener("submit", handleChangeNoteInfo)

        //load inbox
        loadList(0);
    }

    //functions for displaying and closing things

    function displayAddListForm()
    {
        addListForm.show();
    }
    
    function closeAddListForm()
    {
        addListForm.querySelector('input[name="name"]').value = "";
        addListForm.close();
    }

    function toggleDateInput()
    {
        datePicker.classList.toggle('hidden');
    }

    function togglePriorityInput()
    {
        priorityPicker.classList.toggle('hidden')
    }

    function displaySelectedPriority(e)
    {
        taskPriority.classList.remove("hidden");
        taskPriority.textContent = e.target.value;
    }

    function displaySelectedDate(e)
    {
        taskDate.classList.remove("hidden");
        taskDate.textContent = e.target.value;
    } 

    //task/note functions

    //to remove: should call loadList
    //handles submiting the add task form 
    function handleAddtask(e)
    {
        let name = addTaskForm.elements["name"];
        let date = addTaskForm.elements["date"]
        let priority = addTaskForm.elements["priority"];  

    }


    function handleDeleteTask(e)
    {
        e.stopPropagation()
        console.log("task deleted")
    }

    function handleDeleteNote(e)
    {
        e.stopPropagation()
        console.log("note deleted")
    }
     
    function loadTaskInfo(taskId){}
    
    function loadNoteInfo(noteId){}
    
    function handleTaskSelect(e)
    {
        console.log("task selected")
    }

    function handleNoteSelect(e)
    {
        console.log("note selected")
    }
    
    function handleCompleteTask(e){
        e.stopPropagation()
        console.log("completed")
    }
    
    function handleChangeTaskInfo(e){}
    
    function handleChangeNoteInfo(e){}
    
    //list functions

    function handleAddList(e)
    {
        console.log("test")
        closeAddListForm();
    }

    //loads list's tasks and notes and assign event listeners to cards
    function loadList(listId)
    {
        //get list info;
        const listInfo = todo.getListInfo(listId);

        //assign id to listContainer
        listContainer.setAttribute("id", "i" + listId);

        //assign list title
        listContainer.querySelector(".list-title").textContent = listInfo.name;

        //load tasks and notes

        const noteIds = listInfo.notes;
            for(let i =0; i<noteIds.length; i++)
                {
                    //get a note card
                    const noteCard = document.querySelector(".note-card.structure").cloneNode(true);
                    noteCard.classList.remove("structure", "hidden");

                    //assign note information and event listeners

                    const noteInfo = todo.getNoteInfo(noteIds[i]);
                    //card
                    noteCard.addEventListener("click", handleNoteSelect)
                    noteCard.setAttribute("id", "i" + noteIds[i]);

                    //title
                    noteCard.querySelector(".title").textContent = noteInfo.name;

                    //delete button
                    noteCard.querySelector(".delete-button").addEventListener("click", handleDeleteNote);

                    listTaskNoteContainer.append(noteCard);
                } 

        const taskIds = listInfo.tasks;
        for(let i =0; i<taskIds.length; i++)
            {
                //get a task card
                const taskCard = document.querySelector(".task-card.structure").cloneNode(true);
                taskCard.classList.remove("structure", "hidden");

                //assign task information and eventlisteners to elemenets

                let taskInfo = todo.getTaskInfo(taskIds[i]);
                //card
                taskCard.setAttribute("id", "i" + taskIds[i]);
                taskCard.addEventListener("click", handleTaskSelect)

                //complete button listener and title
                taskCard.querySelector(".complete-button").addEventListener("click", handleCompleteTask);
                taskCard.querySelector(".title").textContent = taskInfo.name;

                //task date
                if(taskInfo.date != "")
                    {
                        const taskDateContainer = taskCard.querySelector(".task-date")
                        taskDateContainer.textContent = taskInfo.date
                        taskDateContainer.classList.remove("hidden");
                    }
                
                //task priotiry
                if(taskInfo.priority != "")
                    {
                        const taskPriorityContainer = taskCard.querySelector(".task-priority");
                        taskPriorityContainer.textContent = taskInfo.priority;
                        taskPriorityContainer.classList.remove("hidden");
                    }

                taskCard.querySelector(".delete-button").addEventListener("click", handleDeleteTask);
                
                listTaskNoteContainer.append(taskCard);
            }
    }

    //to remove: should use allListContainer
    function loadAllLists(){}

    //get assigned to all lists
    function handleListSelect(e)
    {

    }

    function handleDeleteList(e){}


    init();
})();


//toggle add list form

//toggle task and note forms 
const toggleTaskForm = document.querySelector(".toggle-add-task");
const toggleNoteForm = document.querySelector(".toggle-add-note");

const addTaskForm = document.querySelector(".add-task-form");
const addNoteForm = document.querySelector(".add-note-form"); 

toggleTaskForm.addEventListener("click", () =>
    {
        toggleTaskForm.classList.toggle("active-add");
        toggleNoteForm.classList.toggle("active-add");

        addTaskForm.classList.toggle('hidden');
        addNoteForm.classList.toggle('hidden');
    })

toggleNoteForm.addEventListener("click", () =>
    {
        toggleNoteForm.classList.toggle("active-add");
        toggleTaskForm.classList.toggle("active-add");

        addTaskForm.classList.toggle('hidden');
        addNoteForm.classList.toggle('hidden');
    })

//toggle subtask form
let addSubtaskButton = document.querySelector(".add-subtask-button");
addSubtaskButton.addEventListener("click", () => 
    {
        document.querySelector(".add-subtask .add-task-form").classList.toggle("hidden");
    })