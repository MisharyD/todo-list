import Manager from "./manager"
import "../style/index.css"
import "../style/sidebar.css"


//currently for command line
const Todo = function ()
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

const datePickerToggle = document.querySelector('.date-toggle');
const datePicker = document.querySelector('.add-task-date');

datePickerToggle.addEventListener('click', () => {
    datePicker.classList.toggle('hidden');
});



