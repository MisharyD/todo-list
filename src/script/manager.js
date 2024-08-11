import { Task, List, Note } from  "./components"
import { isToday, isWithinInterval, addDays } from 'date-fns';

//acts as a save file and as task manager, contains functions for adding, deleting tasks and lists. 
//changing info about a task or a list. contains an array for all tasks, lists and notes. 
export default class Manager {

    constructor() {
            this._allTasks = {};
            this._allLists = {};
            this._allNotes = {};
    
            this._inbox = new List("Inbox");
            this._today = new List("Today");
            this._next7 = new List("Next 7 Days");
        
            this._allLists[this._inbox.id] = this._inbox;
            this._allLists[this._today.id] = this._today;
            this._allLists[this._next7.id] = this._next7;
    }

    
    //add new task, if no list is given add to inbox. returns task id if operation done successfully. otherwise false
    addTask({name = "", description = "", date = null, priority = null, completed = false, parentTaskId = null, id = null}, listId = null) 
    {
        //add task to allTasks
        const task = new Task(name, description, date, priority,completed, parentTaskId, id);
        this._allTasks[task.id] = task;

        //add task to list

        //default
        if(listId == 1 || listId == 2)//if the list is today or next7 then added it to inbox instead
            {
                this._inbox.addTask(task)
                this.#updateToTodayAndNext7(task);
                return true;
            }
        //other list
        else
        {
            const list = this._allLists[listId];
            if (list)
            {
                list.addTask(task);
                this.#updateToTodayAndNext7(task);
                return task.id;
            }
            else
                return false;
        }

        
    }

    //add task to day to today list or next 7 days list if the date match for said lists.
    #updateToTodayAndNext7(task)
    {
        const date = task.date;

        const today = new Date();
        const sevenDaysFromNow = addDays(today, 7);
        const isInNext7Days = isWithinInterval(date, { start: today, end: sevenDaysFromNow });

        if(isToday(date))
            {
                //if it not already in the list add it
                if(!(task.id in this._today._tasks))
                    this._today.addTask(task);
            }
        else
            this._today.deleteTask(task);
        if(isInNext7Days)
            {
                //if it not already in the list add it
                if(!(task.id in this._next7._tasks))
                    this._next7.addTask(task);

            }
        else
            this._next7.deleteTask(task);
    }

    //add subtask in another task. mainTask is the parent task. returns task id if operation done successfully. otherwise false
    addSubtask(mainTaskId, {name = "", description = "", date = null, priority = null,completed = false, parentTaskId = null, id = null})
    {
        const mainTask = this._allTasks[mainTaskId] 
        if(mainTask)
        {
            //add subtask to allTasks
            const subtask = new Task(name, description, date, priority,completed, parentTaskId, id);
            this._allTasks[subtask.id] = subtask;
    
            //add subtask to the subtask array in the maintask
            mainTask.addSubtask(subtask);
            this.#updateToTodayAndNext7(subtask);

            return subtask.id;
        }

        return false;
    }


    //change existing task info given all information about a task. returns true if operation done successfully. otherwise false
    //only name, description, date, priority because there are other functions for the other attributes(besides parent task)
    changeTaskInfo(taskId, name, description, date, priority) 
    {
        const task = this._allTasks[taskId];
        if (task) 
        {
            task.name = name;
            task.description = description;
            task.date = date;
            task.priority = priority;

            this.#updateToTodayAndNext7(task);
            
            return true;
        }
        else
            return false;
    }

    //change existing task info given all information about a task. returns true if operation done successfully. otherwise false
    changeNoteInfo(noteId, name, description) 
    {
        const note = this._allNotes[noteId];
        if (note) 
        {
            note.name = name;
            note.description = description;
            
            return true;
        }
        else
            return false;
    }

    
    //add new list, returns list id
    addList({name = "", id = null}) 
    {
        const list = new List(name, id);
        this._allLists[list.id] = list;
        return list.id;
    }

    //deletes list if it exists and all it's tasks and everywhere they appear in. return true if success, otherwise return false
    deleteList(listId)
    {
        const list = this._allLists[listId];
        if(list)
        {
            //delete the list's tasks

            const tasks = list.tasks;
            for(const taskId in tasks)
            {
                //delete it in other lists
                for(const listId in this._allLists)
                    {
                        if(listId != list.id)
                        this._allLists[listId].deleteTask(this._allTasks[taskId])
                    }
                //delete it in all tasks object
                delete this._allTasks[taskId]
            }

            //delete notes (notes only appear in one list)
            const notes = list.notes;
            for(const noteId in notes)
                delete this._allNotes[noteId]
    
            //delete the list 
            delete this._allLists[listId];

            return true;
        }
        return false;
    }
    
    //delete task given task id. returns true if operation done successfully. otherwise false
    deleteTask(taskId) 
    {
        const task = this._allTasks[taskId]

        //if task exists
        if (task) 
        {
            //delete from subtask array or a list

            //check if is it a subtask or not. subtasks belong only to parent tasks and not lists. not subtasks belong only to lists.
            const parentTaskId = task.parentTaskId;
            //is subtask
            if(parentTaskId != null)
            {
                const parentTask = this._allTasks[parentTaskId]
                parentTask.removeSubtask(task);
                for(const listId in this._allLists)
                    {
                        this._allLists[listId].deleteTask(task)
                    }
            }
            //not subtask, delete the task from the list that contains
            else
            {
                //currently it can only be at 2 lists at the same, inbox and today for example
                for(const listId in this._allLists)
                {
                    this._allLists[listId].deleteTask(task)
                }
            }
                
            //delete from allTasks
            delete this._allTasks[taskId]

            return true;
        }
        else
            return false;
    }
   
    //change complete boolean of task to true given task id. returns true if done successfully. otherwise false
    completeTask(taskId)
    {
        const task = this._allTasks[taskId]
        if(task)
            {
                task.completed = true;
                return true;
            }
        return false;
    }

    //change complete boolean of task to false given task id. returns true if done successfully. otherwise false
    uncompleteTask(taskId)
    {
        const task = this._allTasks[taskId]
        if(task)
            {
                task.completed = false;
                return true;
            }
        return false;
    }

    //move task from list to another list. returns true if done successfully. otherwise false
    moveTaskFromList(taskId, fromListId, toListId) 
    {
        //get the 2 lists
        const fromList = this._allLists[fromListId];
        const toList = this._allLists[toListId];
        
        if (fromList && toList) 
        {
            //get task
            const task = this._allTasks[taskId];
            if (task) 
            {
                //transfer
                fromList.removeTask(task);
                toList.addTask(task);
                return true;
            }
            else
                return false;
        }
        return false;
    }

    //create new note and add to list, if no list is provided then add to inbox. returns note id if done successfully. otherwise false
    addNote({name = "", description = "", id = null}, listId = null) 
    {
        const note = new Note(name, description, id);

        //default list 
        if(listId == null)
            this._inbox.addNote(note)
        //other list
        else
        {
            const list = this._allLists[listId];
            if (list)
            {
                //add note to the provided list
                list.addNote(note);

                //add note to note list
                this._allNotes[note.id] = note
                return note.id;
            }
            else
                return false;
        }
    }

    //delete note given noteId and the list id that contains it. returns true if done successfully. otherwise false. 
    //list id is askes to save time because a note can only exist in 1 list.
    deleteNote(noteId, listId) 
    {
        const note = this._allNotes[noteId];

        //if note exists
        if (note) 
        {
            //remove note from allNotes_allNotes
            delete this._allNotes[note.id];

            //delete note from list
            const list = this._allLists[listId];
            if(list)
            {
                list.deleteNote(note);
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }

    
    //return all list ids an array
    getAllListIds() {
        return Object.keys(this._allLists);
    }

    //if list exists return list information including all it's tasks and notes ids, given list id, otherwise return null 
    getListInfo(listId) 
    {
        const list = this._allLists[listId];

        //if list exists, return it's info
        if (list) {
            return {
                name: list.name,
                tasks: Object.keys(list.tasks),
                notes: Object.keys(list.notes)
            };
        }
        return null;
    }

    
    //if task exists return task's information including all it's subtasks ids, given the task id
    getTaskInfo(taskId) 
    {
        const task = this._allTasks[taskId];

        //if task exists
        if (task) {
            return {
                id:task.id,
                name: task.name,
                description: task.description,
                date: task.date,
                priority: task.priority,
                completed:task.completed,
                parentTaskId:task.parentTaskId,
                subtasks: Object.keys(task.subtasks)
            };
        }
        else
            return false;
    }

    
    //if note exists returns it's information given it's id, otherwise return null;
    getNoteInfo(noteId) 
    {
        const note = this._allNotes[noteId]

        //if note exists return it's information
        if (note) 
        {
            return {
                name: note.name,
                description: note.description
            };
        }
        return null;
    }

    
    //if list exists return task ids of the list given it's id. otherwise return an empty array
    getTasksOfList(listId) 
    {
        const list = this._allLists[listId]

        //if list exists return an array of all it's tasks ids
        if (list) {
            return Object.keys(list.tasks)
        }
        return [];
    }

    
    //if list exists return note ids of the list given it's id. otherwise return an empty array
    getNotesOfList(listId) 
    {
        const list = this._allLists[listId]

        //if list exist return an array of all it's notes ids
        if (list) {
            return Object.keys(list.notes);
        }
        return [];
    }

    //returns today list's id 
    get today(){
        return this._today.id;
    }

     //returns inbox list's id 
     get inbox(){
        return this._inbox.id;
    }

     //returns next 7 days list's id 
     get next7(){
        return this._next7.id;
    }

    get allTasks(){
        return Object.keys(this._allTasks);
    }

    saveData()
    {
        const data = {
            allTasks: this._allTasks,
            allLists: this._allLists,
            allNotes: this._allNotes
        }

        const jsonData = JSON.stringify(data);
        localStorage.setItem("data", jsonData); 
    }

    loadData(){
        if(!localStorage.getItem("data"))
            return;
        
        const data = localStorage.getItem('data');
        const parsedData = JSON.parse(localStorage.getItem('data'));

        //rehydrate tasks
        const allTasksJson = parsedData.allTasks
        const allTasks = {};
    
        for (const id in allTasksJson) {
            const taskData = allTasksJson[id];
        
            //recursively reconstruct subtasks
            const reconstructTask = (taskData) => {
                const task = new Task(
                    taskData._name,
                    taskData._description,
                    taskData._date,
                    taskData._priority,
                    taskData._completed,
                    taskData._parentTaskId,
                    taskData._id
                );
        
                // Recursively reconstruct subtasks
                for (const subtaskId in taskData._subtasks) {
                    task.addSubtask(reconstructTask(taskData._subtasks[subtaskId]));
                }
        
                return task;
            };
        
            allTasks[id] = reconstructTask(taskData);
        }
        Task.updateCurrentId()

        //rehudrate notes
        const allNotesJson = parsedData.allNotes
        const allNotes = {};
        for(const noteId in allNotesJson)
            {
                const note = new Note(allNotesJson[noteId]._name, allNotesJson[noteId]._description, noteId);
                allNotes[noteId] = note;
            }
        Note.updateCurrentId();

        //rehydrate lists
        const allListsJson = parsedData.allLists
        const allLists = {}
        for(const listId in allListsJson)
            {
                const list = new List(allListsJson[listId]._name, listId);
                
                //add tasks
                for(const taskId in allListsJson[listId]._tasks)
                    list.addTask(allTasks[taskId])
                
                //add notes
                for(const noteId in allListsJson[listId]._notes)
                    list.addNote(allNotes[noteId])

                allLists[listId] = list;
            }
        List.updateCurrentId()

        //assign instance variables to the loaded data
        this._allTasks = allTasks;
        this._allLists = allLists;
        this._allNotes = allNotes;

        this._inbox = this._allLists[0];
        this._today = this._allLists[1];
        this._next7 = this._allLists[2];

    }
}