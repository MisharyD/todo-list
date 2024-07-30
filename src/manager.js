import { Task, List, Note } from  "./components"

//acts as a save file and as task manager, contains functions for adding, deleting tasks and lists. 
//changing info about a task or a list. contains an array for all tasks, lists and notes. 
export default class Manager {

    constructor() {
        this._allTasks = {};
        this._allLists = {};
        this._allNotes = {};

        this._today = new List("Today");
        this._inbox = new List("Inbox");
        this._next7 = new List("Next 7 Days");
        

        this._allLists[this._today.id] = this._today;
        this._allLists[this._inbox.id] = this._inbox;
        this._allLists[this._next7.id] = this._next7;
    }

    
    //add new task, if no list is given add to inbox. returns true if operation done successfully. otherwise false
    addTask({name = "", description = "", date = null, priority = null}, listId = null) 
    {
        //add task to allTasks
        const task = new Task(name, description, date, priority, null);
        this._allTasks[task.id] = task;

        //add task to list

        //default
        if(listId == null)
            this._inbox.addTask(task)
        //other list
        else
        {
            const list = this._allLists[listId];
            if (list)
            {
                list.addTask(task);
                return true;
            }
            else
                return false;
        }

        return task.id;
    }


    //add subtask in another task. mainTask is the parent task.  returns true if operation done successfully. otherwise false
    addSubtask(mainTaskId, {name = "", description = "", date = null, priority = null})
    {
        const mainTask = this._allTasks[mainTaskId] 
        if(mainTask)
        {
            //add subtask to allTasks
            const subtask = new Task(name, description, date, priority, mainTaskId);
            this._allTasks[subtask.id] = subtask;
    
            //add subtask to the subtask array in the maintask
            mainTask.addSubtask(subtask);
        }
    }


    //change existing task info given all information about a task. returns true if operation done successfully. otherwise false
    changeTaskInfo(taskId, name, description, date, priority) 
    {
        const task = this._allTasks[taskId];
        if (task) 
        {
            task.name = name;
            task.description = description;
            task.date = date;
            task.priority = priority;
            
            return true;
        }
        else
            return false;
    }

    
    //add new list
    addList(name = "") 
    {
        const list = new List(name);
        this._allLists[list.id];
        return list.id;
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
            }
            //not subtask, delete the task from any list that contains it
            else
                this._allLists.forEach(list => list.removeTask(task));
            
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
                task.completeTask(true);
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
                task.completeTask(false);
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

    
    //create new note and add to list, if no list is provided then add to inbox. returns true if done successfully. otherwise false
    addNote(name = "", description = "", listId = null) 
    {
        const note = new Note(name, description);

        //default list 
        if(listId == null)
            this._inbox.addNote(listId)
        //other list
        else
        {
            const list = this._allLists[listId];
            if (list)
            {
                list.addNote(note);
                return true;
            }
            else
                return false;
        }

        //add note to note list
        this._allNotes[note.id] = note

        return note.id;
    }

    
    //delete note given noteId and the list id that contains it. returns true if done successfully. otherwise false
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
                list.removeNote(note);
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
                name: task.name,
                description: task.description,
                date: task.date,
                priority: task.priority,
                subtasks: Object.keys(task.subtasks)
            };
        }
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

    //special lists

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
}