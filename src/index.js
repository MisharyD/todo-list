//has name, date, priority, subtasks, and desctiption a task. can get and change all of them
class Task {
    static currentId = 0;

    subtasks = []

    constructor(name, description, date, priority)
    {
        this.name = name;
        this.description = description
        this.date = date;
        this.priority = priority;
        this.id = Task.currentId++;
        this.completed = false;
    }

    get name () {
        return this.name;
    }

    set name(val) {
        this.name = val;
    }

    get description() {
        return this.description
    }

    set description(val) {
        this.description = val;
    }

    get date() {
        return this.date;
    }

    set date(val) {
        this.date =val;
    }

    get priority() {
        return this.priority
    }

    set priority(val) {
        this.priority = val
    }

    get subtasks() {
        return this.subtasks;
    }

    get completed(){
        return this.completed
    }

    set completed(boolean){
        this.completed = boolean
    }

    addSubtask = (task) => {
        this.subtasks.append(task);
    }

    removeSubTask = (task) => {
        this.subtasks.remove(task)
    }
}

//has name, tasks, notes, sections. can get and change all of them
class List {
    static currentId = 0;

    notes = new Array();
    tasks = new Array();
    completedTasks = new Array();

    constructor(name){
        this.name = name;
        this.id = List.currentId++;
    }

    get name() {
        return this.name;
    }

    set name(val) {
        this.sections[val] = this.sections[this.name];
        this.name = val;
    }

    get tasks() {
        return this.tasks;
    }

    get notes(){
        return this.notes;
    }

    get sections() {
        return this.sections;
    }

    get id(){
        return this.id;
    }

    addTask = (task) => {
        this.tasks.append(task)
    }

    removeTask = (task) => {
        this.tasks.remove(task);
    }

    completeTask = (task) => {
        this.tasks.remove(task);
        this.completedTasks.append(task);
    }

    addNote = (note) => {
        this.notes.append(note);
    } 

    removeNote = (note) => {
        this.notes.remove(note)
    }
}

//has title, description, can get and change all of them
class Note {
    static currentId = 0;

    constructor(name, description){
        this.name = name;
        this.description = description;
        this.id = Note.currentId++;
    }

    get name() {
        return this.name;
    }

    set name(val){
        this.name = val;
    }

    get description() {
        return this.description;
    }

    set description(val) {
        this.description = val
    }

    get id() {
        return this.id;
    }
}

//has name, type, lists, notes. can get and change all of them
class Goal {}

//acts as a save file and as task manager, contains functions for adding, deleting tasks and lists. 
//changing info about a task or a list. contains an array for all tasks, lists and notes. 
class Manager {

    constructor() {
        this.taskList = [];
        this.listList = [];
        this.noteList = [];

        let today = new List("Today");
        let inbox = new List("Inbox");
        let next7 = new List("Next 7 Days");

        this.listList.push(today, inbox, next7);
    }

    //add new task, if no list is given add to inbox
    addTask(name = "", description = "", date = null, priority = null, listId = this.listList.find(list => list.name === "Inbox").id) 
    {
        //add task to tasklist
        const task = new Task(name, description, date, priority);
        this.taskList.push(task);

        //add task to list
        const list = this.listList.find(list => list.id === listId);
        if (list)
            list.addTask(task);
        else
            return false;

        return task.id;
    }

    //change existing task info given all
    changeTaskInfo(taskId, name, description, date, priority) 
    {
        const task = this.taskList.find(task => task.id === taskId);
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
        this.listList.push(list);
        return list.id;
    }

    //delete task
    removeTask(taskId) 
    {
        const taskIndex = this.taskList.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) 
        {
            //delete from taskList
            const task = this.taskList[taskIndex];
            this.taskList.splice(taskIndex, 1);

            //delete the task from any list that contains it
            this.listList.forEach(list => list.removeTask(task));

            return true;
        }

        else
            return false;
    }

    completeTask(taskId)
    {
        const taskIndex = this.taskList.findIndex(task => task.id === taskId);
        if(taskIndex !== -1)
            {
                const task = this.taskList[taskIndex];
                task.completeTask(true);

                return true;
            }
        return false;
    }

    uncompleteTask(taskId)
    {
        const taskIndex = this.taskList.findIndex(task => task.id === taskId);
        if(taskIndex !== -1)
        {
            const task = this.taskList[taskIndex];
            task.completeTask(false);

            return true;
        }

        return false;
    }


    moveTaskFromList(taskId, fromListId, toListId) 
    {
        //get the 2 lists
        const fromList = this.listList.find(list => list.id === fromListId);
        const toList = this.listList.find(list => list.id === toListId);
        
        if (fromList && toList) 
        {
            //get task
            const task = fromList.tasks.find(task => task.id === taskId);
            if (task) 
            {
                fromList.removeTask(task);
                toList.addTask(task);
                return true;
            }
            else
                return false;
        }
        return false;
    }

    //create new note and add to list, if no list is provided then add to inbox
    addNote(name = "", description = "", listId = this.listList.find(list => list.name === "Inbox").id) 
    {
        //add note to note list
        const note = new Note(name, description);
        this.noteList.push(note);

        //add note to note list
        const list = this.listList.find(list => list.id === listId);
        if (list) {
            list.addNote(note);
        }
        else
            return false;

        return note.id;
    }

    //delete note 
    removeNote(noteId, listId) 
    {
        const noteIndex = this.noteList.findIndex(note => note.id === noteId);

        //if note found
        if (noteIndex !== -1) 
        {
            //remove note from notelist
            const note = this.noteList[noteIndex];
            this.noteList.splice(noteIndex, 1);

            //delete note from list
            const list = this.listList.find(list => list.id === listId);
            if (list)
                list.removeNote(note);
        }
    }


    getAllListIds() {
        return this.listList.map(list => list.id);
    }

    //get list information including all it's tasks and notes give list id
    getListInfo(listId) 
    {
        const list = this.listList.find(list => list.id === listId);

        //if list exists, return it's info
        if (list) {
            return {
                name: list.name,
                tasks: list.tasks.map(task => task.id),
                notes: list.notes.map(note => note.id)
            };
        }
        return null;
    }

    //get task information including all it's subtasks ids given the task id
    getTaskInfo(taskId) 
    {
        const task = this.taskList.find(task => task.id === taskId);

        //if task exists
        if (task) {
            return {
                name: task.name,
                description: task.description,
                date: task.date,
                priority: task.priority,
                subtasks: task.subtasks.map(subtask => subtask.id)
            };
        }
        return false;
    }

    //get tasks ids for a list given it's id
    getTasksOfList(listId) 
    {
        const list = this.listList.find(list => list.id === listId);

        //if list exists return an array of all it's tasks ids
        if (list) {
            return list.tasks.map(task => task.id);
        }
        return [];
    }

    //get notes ids of list given it's id
    getNotesOfList(listId) 
    {
        const list = this.listList.find(list => list.id === listId);

        //if list exist return an array of all it's notes ids
        if (list) {
            return list.notes.map(note => note.id);
        }
        return [];
    }

    //get information of note given it's id
    getNoteInfo(noteId) 
    {
        const note = this.noteList.find(note => note.id === noteId);

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
}

//currently for command line
const Todo = (function ()
    {
        // let todo = new Manager();
        // console.log("Choose which list to add or view tasks or notes for:\n")
        // console.log("Lists:")
        // let lists = todo.getAllLists() 
        // for(let i = 0; i<lists.length; i++)
        //     {
        //         console.log("List" + (i +1) + ": " + todo.getListInfo(lists[i])["name"] )
        //     }
        
    })

