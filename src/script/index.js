import Manager from "./manager"
import "../style/reset.css"
import "../style/index.css"
import "../style/sidebar.css"
import "../style/main.css"
import "../style/info.css"
import { se } from "date-fns/locale"
import { isToday, isWithinInterval, addDays, differenceInCalendarDays } from 'date-fns';

const todo = (function (){

    const todo = new Manager();
    todo.loadData();

    //main containers
    const allListsContainer = document.querySelector(".all-lists-container");
    const listContainer = document.querySelector(".list-container");
    const listTaskNoteContainer = document.querySelector(".notes-tasks-container")
    const infoTaskContainer = document.querySelector(".info-task");
    const infoNoteContainer = document.querySelector(".info-note");
    
    //listeners

    //listeners for saving and deleteing data

    const saveDataButton = document.querySelector(".save-data-button");
    const deleteDataButton = document.querySelector(".delete-data-button");

    //listeners related to displaying things

    //the toggle for priority input and date is set for queryAll because of the change task form and add task form.
    const dateToggleButton = document.querySelectorAll(".date-toggle");
    const priorityToggleButton = document.querySelectorAll('.priority-flag-button');
    const showAddListFormButton = document.querySelector(".add-list-button");
    const cancelListFormButton = document.querySelector(".cancel-list-form");
    const showCompletedButton = document.querySelector(".completed");
    const toggleTaskForm = document.querySelector(".toggle-add-task");
    const toggleNoteForm = document.querySelector(".toggle-add-note");
    const addSubtaskButton = document.querySelector(".add-subtask-button");

    //listeners for the main lists

    const inboxButton = document.querySelector(".inbox");
    const todayButton = document.querySelector(".today");
    const next7Button = document.querySelector(".next7");

    //listerner related to forms
    const addTaskForm = document.querySelector(".add-task-form");
    const addNoteForm = document.querySelector(".add-note-form");
    const changeTaskForm = document.querySelector(".change-task-form");
    const changeNoteForm = document.querySelector(".change-note-form");
    const addSubtaskForm = document.querySelector(".add-subtask-form");

    //listeneres related to forms input

    //the 'infosectionbutton' is specified specifically because the other check buttons are added dynamicly. 
    const infoSectionUncheckedButton = document.querySelector(".change-task-form .complete-unchecked-button");
    const infoSectionCheckedButton = document.querySelector(".change-task-form .complete-checked-button");
    const submitTaskChangeButton = document.querySelector(".submit-change-task-button");
    const submitNoteChangeButton = document.querySelector(".submit-change-note-button");
    

    //listerner related to adding lists
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
        addSubtaskButton.addEventListener("click", displayAddsubtaskForm)
        changeTaskForm.addEventListener("input", displayChangeTaskButton);
        changeNoteForm.addEventListener("input", displayChangeNoteButton);
        showAddListFormButton.addEventListener("click", displayAddListForm);
        cancelListFormButton.addEventListener("click", closeAddListForm);
        
        //listeners for saving and deleteing data
        saveDataButton.addEventListener("click", saveData)
        deleteDataButton.addEventListener("click", deleteData)
        
        //listeners for the main lists
        inboxButton.addEventListener("click", handleListSelect);
        todayButton.addEventListener("click", handleListSelect);
        next7Button.addEventListener("click", handleListSelect);
        
        //listerner related to forms
        addTaskForm.addEventListener("submit", handleAddtask);
        addNoteForm.addEventListener("submit", handleAddNote);
        changeTaskForm.addEventListener("submit", handleChangeTaskInfo);
        changeNoteForm.addEventListener("submit", handleChangeNoteInfo);
        addSubtaskForm.addEventListener("submit", handleAddSubtask)
        
        //listerner related to forms input
        infoSectionUncheckedButton.addEventListener("click", handleCompleteTask);
        infoSectionCheckedButton.addEventListener("click", handleUncompleteTask);
        submitListFormButton.addEventListener("click", handleAddList)

        //load inbox and all lists in the side bar
        loadList(0);
        loadAllLists();
    }

    //functions for saving and deleteing data
    function saveData()
    {
        todo.saveData();
        const dataSavedContainer = document.querySelector(".data-saved")
        dataSavedContainer.classList.remove("hidden");
        setTimeout(removeSavedData, 3000);

        function removeSavedData()
        {
            dataSavedContainer.classList.add("hidden");
        }
    }

    function deleteData()
    {
        localStorage.removeItem("data");
        const dataDeletedContainer = document.querySelector(".data-deleted");
        dataDeletedContainer.classList.remove("hidden");
        setTimeout(removeDeletedData, 3000);

        function removeDeletedData()
        {
            dataDeletedContainer.classList.add("hidden");
            location.reload();
        }
    }

    //functions for displaying and closing things

    function displayAddListForm()
    {
        addListForm.showModal();
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

    function displaySubtasks(e)
    {
        //stop card event
        e.stopPropagation();

        const showSubtasksButton = e.target;
        const taskCard = showSubtasksButton.closest(".task-card");

        //show subtasks
        const subtasksContainer = document.querySelector("#s" + taskCard.getAttribute("id").slice(1));
        subtasksContainer.classList.remove("hidden");

        //remove show subtask button and unhide close sub task button
        taskCard.querySelector(".close-subtasks-button").classList.remove("hidden");
        showSubtasksButton.classList.add("hidden");
    }

    function closeSubtasks(e)
    {
        //stop card event
        e.stopPropagation();

        const closeSubtasksButton = e.target;
        const taskCard = closeSubtasksButton.closest(".task-card");

        //close subtasks
        const subtasksContainer = document.querySelector("#s" + taskCard.getAttribute("id").slice(1));
        subtasksContainer.classList.add("hidden");

        //remove close subtask button and add show sub task button
        taskCard.querySelector(".show-subtasks-button").classList.remove("hidden");
        closeSubtasksButton.classList.add("hidden");
    }

    function displayAddsubtaskForm() 
    {
        addSubtaskForm.classList.remove("hidden");
        addSubtaskButton.classList.add("hidden");
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

    function handleAddSubtask(e)
    {
        e.preventDefault();
        //get parent task from the change task form in the info section
        const mainTaskId = infoTaskContainer.querySelector(".change-task-form").getAttribute("id").slice(1);
        
        //get information of subtask
        const subtaskName = addSubtaskForm.elements['name'].value;
        const subtaskDate = addSubtaskForm.elements['date'].value;
        const subtaskPriority = addSubtaskForm.elements['priority'].value;

        //add subtask to main task
        todo.addSubtask(mainTaskId,{name:subtaskName, date:subtaskDate, priority:subtaskPriority, parentTaskId:mainTaskId});

        //update visuals
        addSubtaskForm.reset();
        addSubtaskForm.classList.add("hidden");
        addSubtaskButton.classList.remove("hidden");

        loadList(listContainer.getAttribute("id").slice(1));
        loadTaskInfo(mainTaskId);
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
                const listId = listContainer.getAttribute("id").slice(1);
        
                //get task info
                const taskId = e.target.closest(".task-card").getAttribute("id").slice(1);
                const taskInfo = todo.getTaskInfo(taskId);//save it before deleting task 

                //delete task
                todo.deleteTask(taskId);

                //close info section if it is opened for the deleted task
                if("i"+taskId == infoTaskContainer.querySelector(".change-task-form").getAttribute("id"))//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                    infoTaskContainer.classList.add("hidden");

                //if requetst is from a subtask in the info section, then load info section again
                if(changeTaskForm.getAttribute("id") == "i" + taskInfo.parentTaskId)
                {
                    loadTaskInfo(changeTaskForm.getAttribute("id").slice(1));
                }
        
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
        const taskCard = e.target.closest(".task-card")
        const taskId = taskCard.getAttribute("id").slice(1);

        loadTaskInfo(taskId);
    }

    //returns a subtask card loaded with the subtask info and necceary event listeners, a
    function getSubtaskCard(subtaskId)
    {
        const subtaskCard = document.querySelector(".task-card.subtask.structure").cloneNode(true);
        subtaskCard.classList.remove("structure", "hidden");

        //assign task information and eventlisteners to elemenets
        const subtaskInfo = todo.getTaskInfo(subtaskId);

        //card
        subtaskCard.setAttribute("id", "i" + subtaskId);
        subtaskCard.addEventListener("click", handleTaskSelect)

        //complete button listener and title
        subtaskCard.querySelector(".complete-unchecked-button").addEventListener("click", handleCompleteTask);
        subtaskCard.querySelector(".complete-checked-button").addEventListener("click", handleUncompleteTask);
        subtaskCard.querySelector(".title").textContent = subtaskInfo.name;

         //task date
         if(subtaskInfo.date != "")
        {
            const taskDate = subtaskInfo.date;

            const today = new Date();
            const sevenDaysFromNow = addDays(today, 7);
            const isInNext7Days = isWithinInterval(taskDate, { start: today, end: sevenDaysFromNow })

            const taskDateContainer = subtaskCard.querySelector(".task-date")
            taskDateContainer.classList.remove("hidden");
            if(isToday(taskDate))
            {
                taskDateContainer.textContent = "Today"
            }
            else if(isInNext7Days)
            {
                const remaining = differenceInCalendarDays(taskDate, today);
                taskDateContainer.textContent = "After " + remaining + " days"; 
            }
            else
                taskDateContainer.textContent = taskDate;

        }
    
        //task priotiry
        const taskPriority = subtaskInfo.priority
        if(taskPriority != "No priority")
            {
                const taskPriorityContainer = subtaskCard.querySelector(".task-priority");
                const uncheckedButton = subtaskCard.querySelector(".complete-unchecked-button")
                switch(taskPriority)
                {
                    case "Low":
                    {
                        uncheckedButton.classList.add("low-priority");
                        break;
                    }
                    case"Medium":
                    {
                        uncheckedButton.classList.add("medium-priority");
                        break;
                    }
                    case"High":
                    {
                        uncheckedButton.classList.add("high-priority");
                        break;
                    }
                }
            }

        //task completed status
        subtaskCard.querySelector(".delete-button").addEventListener("click", handleDeleteTask);
        if(subtaskInfo.completed)
        {
            //change visuals
            subtaskCard.classList.add("completed-task");
            subtaskCard.querySelector(".complete-unchecked-button").classList.add("hidden");
            subtaskCard.querySelector(".complete-checked-button").classList.remove("hidden");
            subtaskCard.querySelector(".delete-button").classList.add("hidden");
        }

        return subtaskCard;
    }

    //returns a task card loaded with the task info and necceary event listeners
    function getTaskCard(taskId)
    {
        const taskCard = document.querySelector(".task-card.structure").cloneNode(true);
        taskCard.classList.remove("structure", "hidden");

        //assign task information and eventlisteners to elemenets
        const taskInfo = todo.getTaskInfo(taskId);

        //card
        taskCard.setAttribute("id", "i" + taskId);
        taskCard.addEventListener("click", handleTaskSelect)

        //complete button listener and title
        taskCard.querySelector(".complete-unchecked-button").addEventListener("click", handleCompleteTask);
        taskCard.querySelector(".complete-checked-button").addEventListener("click", handleUncompleteTask);
        taskCard.querySelector(".title").textContent = taskInfo.name;

        //task date
        if(taskInfo.date != "")
            {
                const taskDate = taskInfo.date;

                const today = new Date();
                const sevenDaysFromNow = addDays(today, 7);
                const isInNext7Days = isWithinInterval(taskDate, { start: today, end: sevenDaysFromNow })

                const taskDateContainer = taskCard.querySelector(".task-date")
                taskDateContainer.classList.remove("hidden");
                if(isToday(taskDate))
                {
                    taskDateContainer.textContent = "Today"
                }
                else if(isInNext7Days)
                {
                    const remaining = differenceInCalendarDays(taskDate, today);
                    taskDateContainer.textContent = "After " + remaining + " days"; 
                }
                else
                    taskDateContainer.textContent = taskDate;

            }
        
        //task priotiry
        const taskPriority = taskInfo.priority
        if(taskPriority != "No priority")
            {
                const taskPriorityContainer = taskCard.querySelector(".task-priority");
                const uncheckedButton = taskCard.querySelector(".complete-unchecked-button")
                switch(taskPriority)
                {
                    case "Low":
                    {
                        uncheckedButton.classList.add("low-priority");
                        break;
                    }
                    case"Medium":
                    {
                        uncheckedButton.classList.add("medium-priority");
                        break;
                    }
                    case"High":
                    {
                        uncheckedButton.classList.add("high-priority");
                        break;
                    }
                }
            }

        //task completed status
        taskCard.querySelector(".delete-button").addEventListener("click", handleDeleteTask);
        if(taskInfo.completed)
        {
            //change visuals
            taskCard.classList.add("completed-task");
            taskCard.classList.remove("task-card-hover");
            taskCard.querySelector(".complete-unchecked-button").classList.add("hidden");
            taskCard.querySelector(".complete-checked-button").classList.remove("hidden");
            taskCard.querySelector(".delete-button").classList.add("hidden");
        }

        return taskCard;
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

        if(!taskInfo.description == "")
            infoTaskContainer.querySelector("textarea").value = taskInfo.description; 

        //task date

        //reset
        const taskDateContainer = changeTaskForm.querySelector(".task-date");
        taskDateContainer.textContent = ""

        //assign info to form
        const taskDate = taskInfo.date;
        infoTaskContainer.querySelector(".task-date-input").value = taskDate;

        if(taskInfo.date != "")
            {
                //display info
                const today = new Date();
                const sevenDaysFromNow = addDays(today, 7);
                const isInNext7Days = isWithinInterval(taskDate, { start: today, end: sevenDaysFromNow })

                taskDateContainer.classList.remove("hidden");
                if(isToday(taskDate))
                {
                    taskDateContainer.textContent = "Today"
                }
                else if(isInNext7Days)
                {
                    const remaining = differenceInCalendarDays(taskDate, today);
                    taskDateContainer.textContent = "After " + remaining + " days"; 
                }
                else
                    taskDateContainer.textContent = taskDate;

            }
        
        //task priotiry
        const taskPriority = taskInfo.priority

        //reset
        const uncheckedButton = changeTaskForm.querySelector(".complete-unchecked-button")
        uncheckedButton.classList.remove("low-priority", "medium-priority", "high-priority");

        //assign info to form
        const taskPriorityValue = taskInfo.priority;
        const selector = `.task-priority-input[value="${taskPriorityValue}"]`;
        infoTaskContainer.querySelector(selector).checked = true;

        if(taskPriority != "No priority")
            {
                //display info
                switch(taskPriority)
                {
                    case "Low":
                    {
                        uncheckedButton.classList.add("low-priority");
                        break;
                    }
                    case"Medium":
                    {
                        uncheckedButton.classList.add("medium-priority");
                        break;
                    }
                    case"High":
                    {
                        uncheckedButton.classList.add("high-priority");
                        break;
                    }
                }
            }    

        //get subtask container and reset it
        const subtasksContainer = infoTaskContainer.querySelector(".subtasks-container");
        subtasksContainer.textContent = "";

        //hide form in case it add subtask button was pressed before and there was no submission for the form to hide again, then show add button.
        //also hide submit changes button in case it there were not changes not submitted before.
        addSubtaskForm.classList.add("hidden");
        addSubtaskButton.classList.remove("hidden");
        submitTaskChangeButton.classList.add("hidden");

        //loadsubtasks if it is a maintask
        if(taskInfo.parentTaskId == null)
        {   
            //get subtask ids
            const subtasksIds = taskInfo.subtasks;
            
            //load subtasks
            const completedSubtasks = [];
            for(let i=0;i<subtasksIds.length; i++)
                {
                    //load a task card
                    const subtaskCard = getSubtaskCard(subtasksIds[i]);

                    //if it is completed then add it to completed array to add the cards last
                    if(subtaskCard.classList.contains("completed-task"))
                        {
                            completedSubtasks.push(subtaskCard);
                        }
                    else
                        subtasksContainer.append(subtaskCard);

                }

            //add completed tasks
            for(let i=0;i<completedSubtasks.length; i++)
            {
                subtasksContainer.append(completedSubtasks[i]);
            }
        }
        else
            addSubtaskButton.classList.add("hidden");   
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

        if(!noteInfo.description == "")
            infoNoteContainer.querySelector("textarea").value = noteInfo.description; 
    }
    
    function handleCompleteTask(e){
        //prevent card event
        e.stopPropagation()
        
        //get list id
        const listId = listContainer.getAttribute("id").slice(1);

        //get task card
        const taskCard = e.target.closest(".task-card");

        //complete task

        let taskId
        //check if the request came from the info section. if it is, get the id from it, since it does have a closest task-card
        if(e.target == infoSectionUncheckedButton)
        {
            taskId = changeTaskForm.getAttribute("id").slice(1);
            todo.completeTask(taskId);

            //load the info section again to update the box
            loadTaskInfo(taskId);
        }
        //check if the request came from a subtask in the info section // this was added in a rush it could be better
        else if(taskCard)
        {
            if(changeTaskForm.getAttribute("id") == "i" + todo.getTaskInfo(taskCard.getAttribute("id").slice(1)).parentTaskId)
            {
                taskId = taskCard.getAttribute("id").slice(1);
                todo.completeTask(taskId)
                loadTaskInfo(taskId);
            }
            else
            {
                taskId = taskCard.getAttribute("id").slice(1);
                todo.completeTask(taskId);
    
                //check if the info section for the same task that is requesting is complete. if it is, load the section again to update the checkbox in it. 
                if("i" + taskId == changeTaskForm.getAttribute("id"))//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                    loadTaskInfo(taskId);
            }
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

        //get task card
        const taskCard = e.target.closest(".task-card");

        //complete task

        let taskId
        //check if the request came from the info section. if it is, get the id from it, since it does have a closest task-card
        if(e.target == infoSectionCheckedButton)
        {
            taskId = changeTaskForm.getAttribute("id").slice(1);
            todo.uncompleteTask(taskId);

            //load the info section again to update the box
            loadTaskInfo(taskId);
        }
        else if(taskCard)
        {
            //check if the request came from a subtask in the info section // this was added without much thinking it could be better
            if(changeTaskForm.getAttribute("id") == "i" + todo.getTaskInfo(taskCard.getAttribute("id").slice(1)).parentTaskId)
            {
                taskId = taskCard.getAttribute("id").slice(1);
                todo.uncompleteTask(taskId)
                loadTaskInfo(taskId);
            }
            else
            {
                taskId = taskCard.getAttribute("id").slice(1);
                todo.uncompleteTask(taskId);
    
                //check if the info section for the same task that is requesting is complete. if it is, load the section again to update the checkbox in it. 
                if("i" + taskId == changeTaskForm.getAttribute("id"))//i is added to task id so that even without slicing the id it works, if it sliced without the attribute having a value it generates an error
                    loadTaskInfo(taskId);
            }
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
        
        todo.addList({name:name});

        closeAddListForm();
        loadAllLists();

    }

    /*
    visuals for completing task is handles at loadlist because the base taskcard do not have completed visuals 
    and if it is handled at complete task function it will only handle one card. 
    */
    //loads list's tasks and notes and assign event listeners to cards
    function loadList(listId)
    {
        //clear previous tasks and notes
        listTaskNoteContainer.textContent = "";

        //necessary if coming from complete list
        /* 
        temporary solution so that both forms do not appear at the same time if adding a note. 
        because adding remove hidden from one the forms ruins for the other when adding a note or a taskm, 
        it will be akward if you came from completed because you will need to press add tasks or notes for the form to appear.
        */
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
                const taskCard = getTaskCard(taskIds[i]);
                
                if(taskCard.classList.contains("completed-task"))
                {     
                    completedTasks.push(taskCard)
                }
                else
                {
                    listTaskNoteContainer.append(taskCard);
                }

                //add it's subtasks if any

                const subtasksIds = todo.getTaskInfo(taskIds[i]).subtasks;
                const completedSubtasks = [];
                if(subtasksIds.length > 0)
                {
                    //assign button to display subtasks
                    const showSubtasksButton = taskCard.querySelector(".show-subtasks-button");
                    showSubtasksButton.classList.remove("hidden");
                    showSubtasksButton.addEventListener("click", displaySubtasks);

                    //assign button to close subtasks
                    const closeSubtasksButton = taskCard.querySelector(".close-subtasks-button");
                    closeSubtasksButton.addEventListener("click", closeSubtasks);

                    //get a subtask container and assign the main subtask id to it but start with s instead of i
                    const subtasksContainer = listContainer.querySelector(".subtasks-container").cloneNode(true);
                    subtasksContainer.classList.remove("structure");
                    subtasksContainer.setAttribute("id", "s" + taskIds[i]);

                    //add subtasks to subtaskscontainer
                    for(let j =0; j<subtasksIds.length; j++)
                    {
                        const subtaskCard = getSubtaskCard(subtasksIds[j]);
                        if(subtaskCard.classList.contains("completed-task"))
                        {                            
                            completedSubtasks.push(subtaskCard)
                        }
                        else
                            subtasksContainer.append(subtaskCard);
                    }
                    subtasksContainer.append(...completedSubtasks);
                    listTaskNoteContainer.append(subtasksContainer);
                }

            }
            listTaskNoteContainer.append(...completedTasks);
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
                listCard.classList.add("list-hover");
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
        const prevList = document.querySelector("#" + listContainer.getAttribute("id"));
        prevList.classList.remove("current-list");
        prevList.classList.add("list-hover")

        //add background to new list
        const currList = document.querySelector("#i" + listId)
        currList.classList.add("current-list");
        currList.classList.remove("list-hover");

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
        showCompletedButton.classList.remove("list-hover")
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
