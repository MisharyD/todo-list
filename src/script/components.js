//has name, date, priority, subtasks, and desctiption a task. can get and change all of them
class Task {
    static currentId = 0;
    static allIds = new Array();

    _subtasks = {}

    constructor(name, description, date, priority, completed, parentTaskId, id)
    {
        this._name = name;
        this._description = description;
        this._date = date;
        this._priority = priority;
        this._completed = completed;
        this._parentTaskId = parentTaskId 

        //used when creating a task normally
        if(id == null){
            this._id = Task.currentId++;
        }
        //used when loading data
        else{
            this._id = parseInt(id)

            //used to know what is the max id after loading all tasks
            Task.allIds.push(parseInt(id))
        }
    }

    get name() {
        return this._name;
    }

    set name(val) {
        this._name = val;
    }

    get description() {
        return this._description;
    }

    set description(val) {
        this._description = val;
    }

    get date() {
        return this._date;
    }

    set date(val) {
        this._date = val;
    }

    get priority() {
        return this._priority;
    }

    set priority(val) {
        this._priority = val;
    }

    set subtasks(tasks){
        this._subtasks = tasks;
    }

    get subtasks() {
        return this._subtasks;
    }

    get parentTaskId(){
        return this._parentTaskId;
    }

    set parentTaskId(id){
        this._parentTaskId = id;
    }

    get completed(){
        return this._completed
    }

    set completed(boolean){
        this._completed = boolean
    }

    get id(){
        return this._id;
    }

    addSubtask = (task) => {
        this._subtasks[task.id] = task;
    }

    removeSubtask = (task) => {
        delete this._subtasks[task.id]
    }

    static updateCurrentId(){
        Task.currentId = Math.max(...Task.allIds) + 1;
    }
}

//has name, tasks, notes. can get and change all of them
class List {
    static currentId = 0;
    static allIds = new Array();

    constructor(name, id) {
        this._name = name;
        this._notes = {};
        this._tasks = {};

        //used when creating a list normally
        if(id == null){
            this._id = List.currentId++;
        }
        //used when loading data
        else{
            this._id = parseInt(id);

            List.allIds.push(parseInt(id));
        }
    }

    get name() {
        return this._name;
    }

    set name(val) {
        this._name = val;
    }

    set tasks(tsks){
        this._tasks = tsks;
    }

    get tasks() {
        return this._tasks;
    }

    set notes(nts){
        this._notes = nts;
    }

    get notes() {
        return this._notes;
    }

    get id() {
        return this._id;
    }

    addTask(task) {
        this._tasks[task.id] = task;
    }

    deleteTask(task) {
        delete this._tasks[task.id];
    }

    addNote(note) {
        this._notes[note.id] = note;
    }

    deleteNote(note) {
        delete this._notes[note.id];
    }

    static updateCurrentId(){
        List.currentId = Math.max(...List.allIds) + 1;
    }
}

//has title, description, can get and change all of them
class Note {
    static currentId = 0;
    static allIds = new Array();

    constructor(name, description, id){
        this._name = name;
        this._description = description;

        //used when creating a note normally
        if(id == null){
            this._id = Note.currentId++;
            console.log("note"+Note.currentId)
        }
        else{
            this._id = parseInt(id);

            Note.allIds.push(parseInt(id));
        }
    }

    get name() {
        return this._name;
    }

    set name(val){
        this._name = val;
    }

    get description() {
        return this._description;
    }

    set description(val) {
        this._description = val
    }

    get id() {
        return this._id;
    }

    static updateCurrentId(){
        console.log(Note.currentId)
        Note.currentId = Math.max(...Note.allIds) + 1;
    }
}

export { Task, List, Note }