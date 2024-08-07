import Manager from "./manager"
import "../style/reset.css"
import "../style/index.css"
import "../style/sidebar.css"
import "../style/main.css"
import "../style/info.css"
import { se } from "date-fns/locale"

const todo = (function (){

    const todo = new Manager();

    //main containers
    const allListsContainer = document.querySelector(".all-lists-container");
    const listContainer = document.querySelector(".list-container");
    const listTaskNoteContainer = document.querySelector(".notes-tasks-container")
    const completedTasksContainer = document.querySelector(".list-container.completed")
    const infoTaskContainer = document.querySelector(".info-task");
    const infoNoteContainer = document.querySelector(".info-note");
    
    //listeners

    //listeners related to displaying things
    const dateToggleButton = document.querySelectorAll(".date-toggle");
    const priorityToggleButton = document.querySelectorAll('.priority-flag-button');
    const showAddListFormButton = document.querySelector(".add-list-button");
    const cancelListFormButton = document.querySelector(".cancel-list-form");
    const showCompletedButton = document.querySelector(".completed");
    const toggleTaskForm = document.querySelector(".toggle-add-task");
    const toggleNoteForm = document.querySelector(".toggle-add-note");

    //listeners for the main lists
    const inboxButton = document.querySelector(".inbox");
    const todayButton = document.querySelector(".today");
    const next7Button = document.querySelector(".next7");

    //listerner related for adding tasks and notes
    const addTaskForm = document.querySelector(".add-task-form");
    const addNoteForm = document.querySelector(".add-note-form");
    const changeTaskForm = document.querySelector(".change-task-form");
    const changeNoteForm = document.querySelector(".change-note-form");
    const infoSectionUncheckedButton = document.querySelector(".change-task-form .complete-unchecked-button");
    const infoSectionCheckedButton = document.querySelector(".change-task-form .complete-checked-button");
    const submitTaskChangeButton = document.querySelector(".submit-change-task-button");
    const submitNoteChangeButton = document.querySelector(".submit-change-note-button");
    

    //listerner related for adding lists
    const addListForm = document.querySelector(".add-list-form")
    const submitListFormButton = document.querySelector(".submit-list-form")
    
    function init()
    {
        //listeners related to displaying things
        dateToggleButton.forEach(btn => btn.addEventListener('click', toggleDateInput));
        priorityToggleButton.forEach(btn => btn.addEventListener("click", togglePriorityInput));
        showCompletedButton.addEventListener("click", loadCompleted);
        toggleTaskForm.addEventListener("click", displayAddTaskForm);
        toggleNoteForm.addEventListener("click", displayAddNoteForm);
        
        
        //listeners for the main lists
        inboxButton.addEventListener("click", handleListSelect);
        todayButton.addEventListener("click", handleListSelect);
        next7Button.addEventListener("click", handleListSelect);

        addTaskForm.addEventListener("submit", handleAddtask);
        addNoteForm.addEventListener("submit", handleAddNote);

        showAddListFormButton.addEventListener("click", displayAddListForm);
        cancelListFormButton.addEventListener("click", closeAddListForm);
        submitListFormButton.addEventListener("click", handleAddList)

        changeTaskForm.addEventListener("submit", handleChangeTaskInfo);
        changeNoteForm.addEventListener("submit", handleChangeNoteInfo);
        infoSectionUncheckedButton.addEventListener("click", handleCompleteTask);
        infoSectionCheckedButton.addEventListener("click", handleUncompleteTask);
        changeTaskForm.addEventListener("input", displayChangeTaskButton);
        changeNoteForm.addEventListener("input", displayChangeNoteButton);

        //load inbox
        loadList(0);
        loadAllLists();
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

    function toggleDateInput(e)
    {
        const taskForm = e.target.closest(".task-form");
        taskForm.querySelector(".task-date-input").classList.toggle('hidden')
    }

    function togglePriorityInput(e)
    {
        const taskForm = e.target.closest(".task-form");
        taskForm.querySelector(".priority-container").classList.toggle('hidden')   
    }

    function displayAddTaskForm()
    {
        toggleTaskForm.classList.add("active-add");
        toggleNoteForm.classList.remove("active-add");

        addTaskForm.classList.remove('hidden');
        addNoteForm.classList.add('hidden');
    }

    function displayAddNoteForm()
    {
        toggleTaskForm.classList.remove("active-add");
        toggleNoteForm.classList.add("active-add");

        addTaskForm.classList.add('hidden');
        addNoteForm.classList.remove('hidden');
    }

    function displayChangeTaskButton()
    {
        submitTaskChangeButton.classList.remove("hidden");
    }

    function displayChangeNoteButton()
    {  
        submitNoteChangeButton.classList.remove("hidden");
    }

    //task/note functions

    //handles submiting the add task form 
    function handleAddtask(e)
    {
        //prevent submit
        e.preventDefault();

        const listId = e.target.closest(".list-container").getAttribute("id").slice(1);

        const name = addTaskForm.elements["name"].value;
        const date = addTaskForm.elements["date"].value;
        const priority = addTaskForm.elements["priority"].value;  

        todo.addTask({name:name,date:date,priority:priority}, listId);

        addTaskForm.reset();
        loadList(listId);
    }

    function handleAddNote(e)
    {
        //prevent submit
        e.preventDefault();
        const listId = e.target.closest(".list-container").getAttribute("id").slice(1);

        const name = addNoteForm.elements["name"].value;  

        todo.addNote({name:name}, listId);

        addNoteForm.reset();
        loadList(listId);
    }

    function handleDeleteTask(e)
    {
        //prevent card event 
        e.stopPropagation()

        const choice = confirm("Are you sure ?");
        if(choice)
            {
                //get list id
                const listId = e.target.closest(".list-container").getAttribute("id").slice(1);
        
                //delete task
                const taskId = e.target.closest(".task-card").getAttribute("id").slice(1);
                todo.deleteTask(taskId);

                //close info section if it is opened for the deleted task
                if("i"+taskId == infoTaskContainer.querySelector(".change-task-form").getAttribute("id"));//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                    infoTaskContainer.classList.add("hidden");
        
                loadList(listId)
            }
    }

    function handleDeleteNote(e)
    {
        //prevent card event 
        e.stopPropagation()

        const choice = confirm("Are you sure ?");
        if(choice)
            {
                //get list id
                const listId = e.target.closest(".list-container").getAttribute("id").slice(1);
        
                //delete note
                const noteId = e.target.closest(".note-card").getAttribute("id").slice(1);
                todo.deleteNote(noteId, listId);

                //close info section if it is opened for the deleted task
                if("i"+noteId == infoNoteContainer.querySelector(".change-note-form").getAttribute("id"));//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                    infoNoteContainer.classList.add("hidden");
        
                loadList(listId)
            }
    }
    
    function handleTaskSelect(e)
    {
        infoNoteContainer.classList.add("hidden")
        infoTaskContainer.classList.remove("hidden");

        //get task information
        const taskId = e.target.closest(".task-card").getAttribute("id").slice(1);
        loadTaskInfo(taskId);
    }

    function loadTaskInfo(taskId)
    {
        const taskInfo = todo.getTaskInfo(taskId);
        
        //assign id to card in form
        infoTaskContainer.querySelector(".change-task-form").setAttribute("id", "i" + taskId);

        //assign task info to form values

        infoTaskContainer.querySelector("input[name='name']").value = taskInfo.name;
        
        if(taskInfo.completed)
        {
            infoSectionUncheckedButton.classList.add("hidden");
            infoSectionCheckedButton.classList.remove("hidden");
        }
        else
        {
            infoSectionUncheckedButton.classList.remove("hidden");
            infoSectionCheckedButton.classList.add("hidden");
        }

        if(taskInfo.description == "")
            infoTaskContainer.querySelector("textarea").value = "Description..."; 
        else
            infoTaskContainer.querySelector("textarea").value = taskInfo.description; 

        infoTaskContainer.querySelector(".task-date-input").value = taskInfo.date; 

        const taskPriorityValue = taskInfo.priority;
        const selector = `.task-priority-input[value="${taskPriorityValue}"]`;
        infoTaskContainer.querySelector(selector).checked = true;
    }
 
    function handleNoteSelect(e)
    {
        infoTaskContainer.classList.add("hidden");
        infoNoteContainer.classList.remove("hidden");
        
        //get note information
        const noteId = e.target.closest(".note-card").getAttribute("id").slice(1);
        loadNoteInfo(noteId);
    }

    function loadNoteInfo(noteId)
    {
        const noteInfo = todo.getNoteInfo(noteId);
        
        //assign id to card in form
        infoNoteContainer.querySelector(".change-note-form").setAttribute("id", "i" + noteId);

        //assign note info to form values
        infoNoteContainer.querySelector("input[name='name']").value = noteInfo.name; 

        if(noteInfo.description == "")
            infoNoteContainer.querySelector("textarea").value = "Description..."; 
        else
            infoNoteContainer.querySelector("textarea").value = noteInfo.description; 
    }
    
    function handleCompleteTask(e){
        //prevent card event
        e.stopPropagation()
        
        //get list id
        const listId = listContainer.getAttribute("id").slice(1);

        //complete task

        let taskId
        //check if the request came from the info section. if it is, get the id from it, since it does have a closest task-card
        if(e.target == infoSectionUncheckedButton)
        {
            taskId = changeTaskForm.getAttribute("id").slice(1);
            todo.completeTask(taskId);

            //load the info section again to update the box
            loadTaskInfo(listId);
        }
        else
        {
            const taskCard = e.target.closest(".task-card");
            taskId = taskCard.getAttribute("id").slice(1);
            todo.completeTask(taskId);

            //check if the info section for the same task that is requesting is complete. if it is, load the section again to update the checkbox in it. 
            if("i" + taskId == changeTaskForm.getAttribute("id"))//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                loadTaskInfo(taskId);
        }

        //load list again to update the checkbox
        loadList(listId)
    }

    function handleUncompleteTask(e)
    {
        //prevent card event
        e.stopPropagation()
        
        //get list id
        const listId = listContainer.getAttribute("id").slice(1);

        //complete task

        let taskId
        //check if the request came from the info section. if it is, get the id from it, since it does have a closest task-card
        if(e.target == infoSectionCheckedButton)
        {
            taskId = changeTaskForm.getAttribute("id").slice(1);
            todo.uncompleteTask(taskId);

            //load the info section again to update the box
            loadTaskInfo(listId);
        }
        else
        {
            const taskCard = e.target.closest(".task-card");
            taskId = taskCard.getAttribute("id").slice(1);
            todo.uncompleteTask(taskId);

            //check if the info section for the same task that is requesting is complete. if it is, load the section again to update the checkbox in it. 
            if("i" + taskId == changeTaskForm.getAttribute("id"))//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                loadTaskInfo(taskId);
        }
        
        //if the request came from the completed list, load the completed list again 
        if(listId == 9999)
            loadCompleted()
        else
            loadList(listId)
    }
    
    function handleChangeTaskInfo(e)
    {
        //prevent submit
        e.preventDefault();

        //necassery identification
        const listId = listContainer.getAttribute("id").slice(1);
        const changeForm = e.target
        const taskId = changeForm.getAttribute("id").slice(1);

        //get info
        const name = changeForm.querySelector("input[name='name']").value;
        const description = changeForm.querySelector("textarea[name='description']").value;
        const date = changeForm.querySelector("input[name='date']").value;
        const priority = changeForm.elements["priority"].value;//since it is a group, "input[name =''priority]" doesnt work.
        console.log(priority)

        //update info
        todo.changeTaskInfo(taskId, name, description, date, priority);
        loadTaskInfo(taskId);
        loadList(listId);

        //remove submit button
        submitTaskChangeButton.classList.add("hidden");
    }
    
    function handleChangeNoteInfo(e)
    {
        //prevent submit
        e.preventDefault();

        //necassery identification
        const listId = listContainer.getAttribute("id").slice(1);
        const changeForm = e.target
        const noteId = changeForm.getAttribute("id").slice(1);

        //get info
        const name = changeForm.querySelector("input[name='name']").value;
        const description = changeForm.querySelector("textarea[name='description']").value;

        //update info
        todo.changeNoteInfo(noteId, name, description);
        loadNoteInfo(noteId);
        loadList(listId);

        //remove submit button
        submitNoteChangeButton.classList.add("hidden");
    }
    
    //list functions
    function handleAddList(e)
    {
        const dialog  = e.target.closest(".add-list-form");
        const name = dialog.querySelector("input[name='name']").value;
        
        todo.addList(name);

        closeAddListForm();
        loadAllLists();

    }

    //loads list's tasks and notes and assign event listeners to cards
    function loadList(listId)
    {
        //clear previous tasks and notes
        listTaskNoteContainer.textContent = "";

        //necessary if coming from complete list
        listContainer.querySelector(".toggle-tasks-notes-container").classList.remove("hidden");
            
        //get list info;
        const listInfo = todo.getListInfo(listId);

        //assign id to listContainer
        listContainer.setAttribute("id", "i" + listId);

        //assign list title
        listContainer.querySelector(".list-title").textContent = listInfo.name;

        //change the placeholder of forms
        if(listId == 0 || listId == 1 || listId == 2)
        {
            addTaskForm.querySelector("input[name='name']").placeholder = "Add task to Inbox, Press Enter to save.";
            addNoteForm.querySelector("input[name='name']").placeholder = "Add note to Inbox, Press Enter to save.";
        }
        else 
        {
            addTaskForm.querySelector("input[name='name']").placeholder = "Add task to " + listInfo.name + ", Press Enter to save.";
            addNoteForm.querySelector("input[name='name']").placeholder = "Add note to Inbox, Press Enter to save."
        }

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
        const completedTasks = [];//store them to later append them to the container
        for(let i =0; i<taskIds.length; i++)
            {
                //get a task card
                const taskCard = document.querySelector(".task-card.structure").cloneNode(true);
                taskCard.classList.remove("structure", "hidden");

                //assign task information and eventlisteners to elemenets

                const taskInfo = todo.getTaskInfo(taskIds[i]);

                //card
                taskCard.setAttribute("id", "i" + taskIds[i]);
                taskCard.addEventListener("click", handleTaskSelect)

                //complete button listener and title
                taskCard.querySelector(".complete-unchecked-button").addEventListener("click", handleCompleteTask);
                taskCard.querySelector(".complete-checked-button").addEventListener("click", handleUncompleteTask);
                taskCard.querySelector(".title").textContent = taskInfo.name;

                //task date
                if(taskInfo.date != "")
                    {
                        const taskDateContainer = taskCard.querySelector(".task-date")
                        taskDateContainer.textContent = taskInfo.date
                        taskDateContainer.classList.remove("hidden");
                    }
                
                //task priotiry
                if(taskInfo.priority != "No priority")
                    {
                        const taskPriorityContainer = taskCard.querySelector(".task-priority");
                        taskPriorityContainer.textContent = taskInfo.priority;
                        taskPriorityContainer.classList.remove("hidden");
                    }

                taskCard.querySelector(".delete-button").addEventListener("click", handleDeleteTask);
                if(taskInfo.completed)
                {
                    //change visuals
                    taskCard.classList.add("completed-task");
                    taskCard.querySelector(".complete-unchecked-button").classList.add("hidden");
                    taskCard.querySelector(".complete-checked-button").classList.remove("hidden");
                    taskCard.querySelector(".delete-button").classList.add("hidden");
                    
                    completedTasks.push(taskCard)
                }
                else
                    listTaskNoteContainer.append(taskCard);
            }
            for(let i =0;i <completedTasks.length;i++)
                listTaskNoteContainer.append(completedTasks[i]);
    }

    function loadAllLists()
    {
        allListsContainer.textContent = "";

        const allListsIds = todo.getAllListIds();
        for(let i =3; i<allListsIds.length; i++)//hard coded the assumption that inbox, today, next7 should have the ids 0, 1, 2 respectively/
            {
                const listInfo = todo.getListInfo(allListsIds[i]);

                //get list card
                const listCard = document.querySelector(".list-card.structure").cloneNode(true);
                listCard.classList.remove("structure", "hidden");
                listCard.addEventListener("click", handleListSelect)

                //assign information
                listCard.setAttribute("id", "i" + allListsIds[i]);
                listCard.querySelector(".title").textContent = listInfo.name;
                listCard.querySelector(".delete-button").addEventListener("click", handleDeleteList);

                allListsContainer.append(listCard);
            } 
    }

    function handleListSelect(e)
    {
        const listId = e.target.closest(".list").getAttribute("id").slice(1);

        //remove previous list's background 
        const prevListId = listContainer.getAttribute("id");
        document.querySelector("#"+prevListId).classList.remove("current-list");

        //add background to new list
        document.querySelector("#i" + listId).classList.add("current-list");

        loadList(listId);
    }

    function handleDeleteList(e)
    {
        //prevent card event 
        e.stopPropagation()

        const choice = confirm("Are you sure ?");
        if(choice)
            {
                //get list id
                const listId = e.target.closest(".list-card").getAttribute("id").slice(1);
                
                //delete list
                todo.deleteList(listId);

                if(listId == listContainer.getAttribute("id").slice(1))
                    loadList(0);

                loadAllLists();
            }
    }

    function loadCompleted()
    {
        
        //remove previous cards
        listTaskNoteContainer.textContent = "";

        //remove elements not related to completed list
        listContainer.querySelector(".list-title").textContent = "Completed";
        listContainer.querySelector(".toggle-tasks-notes-container").classList.add("hidden");
        listContainer.querySelector(".add-task-form").classList.add("hidden");

        //remove previous list's background 
        const prevListId = listContainer.getAttribute("id");
        document.querySelector("#"+prevListId).classList.remove("current-list");

        //add background to new list
        document.querySelector("#i9999").classList.add("current-list");
        listContainer.setAttribute("id", "i9999")
        
        const allTasksIds = todo.allTasks;

        for(let i =0;i<allTasksIds.length; i++)
            {
                if(todo.getTaskInfo(allTasksIds[i]).completed)
                    {
                        //get a task card
                        const taskCard = document.querySelector(".task-card.structure").cloneNode(true);
                        taskCard.classList.remove("structure", "hidden");

                        //assign task information and eventlisteners to elemenets

                        const taskInfo = todo.getTaskInfo(allTasksIds[i]);
                        //card
                        taskCard.setAttribute("id", "i" + allTasksIds[i]);
                        taskCard.addEventListener("click", handleTaskSelect)

                        //complete button listener and title
                        taskCard.querySelector(".complete-unchecked-button").addEventListener("click", handleCompleteTask);
                        taskCard.querySelector(".complete-checked-button").addEventListener("click", handleUncompleteTask);
                        taskCard.querySelector(".title").textContent = taskInfo.name;

                        //task date
                        if(taskInfo.date != "")
                            {
                                const taskDateContainer = taskCard.querySelector(".task-date")
                                taskDateContainer.textContent = taskInfo.date
                                taskDateContainer.classList.remove("hidden");
                            }
                        
                        //task priotiry
                        if(taskInfo.priority != "No priority")
                            {
                                const taskPriorityContainer = taskCard.querySelector(".task-priority");
                                taskPriorityContainer.textContent = taskInfo.priority;
                                taskPriorityContainer.classList.remove("hidden");
                            }

                        taskCard.querySelector(".delete-button").addEventListener("click", handleDeleteTask);

                        //change visuals
                        taskCard.classList.add("completed-task");
                        taskCard.querySelector(".complete-unchecked-button").classList.add("hidden");
                        taskCard.querySelector(".complete-checked-button").classList.remove("hidden");
                        taskCard.querySelector(".delete-button").classList.add("hidden");

                        listTaskNoteContainer.append(taskCard);
                    }
            }
    }

    init();
})();

//toggle subtask form
let addSubtaskButton = document.querySelector(".add-subtask-button");
addSubtaskButton.addEventListener("click", () => 
    {
        document.querySelector(".add-subtask .add-task-form").classList.toggle("hidden");
    })
