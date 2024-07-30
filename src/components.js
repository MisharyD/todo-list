//has name, date, priority, subtasks, and desctiption a task. can get and change all of them
class Task {
    static currentId = 0;

    _subtasks = {}

    constructor(name, description, date, priority, parentTaskId)
    {
        this._name = name;
        this._description = description;
        this._date = date;
        this._priority = priority;
        this._completed = false;
        this._parentTaskId = parentTaskId 
        this.id = Task.currentId++;
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

    get subtasks() {
        return this._subtasks;
    }

    get parentTaskId(){
        return this._parentTask;
    }

    set parentTaskId(id){
        this._parentTask = id;
    }

    get completed(){
        return this.completed
    }

    set completed(boolean){
        this.completed = boolean
    }

    addSubtask = (task) => {
        this._subtasks[task.id] = task;
    }

    removeSubTask = (task) => {
        delete this._subtasks[task.id]
    }
}

//has name, tasks, notes. can get and change all of them
class List {
    static currentId = 0;

    constructor(name) {
        this._name = name;
        this._notes = {};
        this._tasks = {};
        this._id = List.currentId++;
    }

    get name() {
        return this._name;
    }

    set name(val) {
        this._name = val;
    }

    get tasks() {
        return this._tasks;
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

    removeTask(task) {
        delete this._tasks[task.id];
    }

    addNote(note) {
        this._notes[note.id] = note;
    }

    removeNote(note) {
        delete this._notes[note.id];
    }
}

//has title, description, can get and change all of them
class Note {
    static currentId = 0;

    constructor(name, description){
        this._name = name;
        this._description = description;
        this._id = Note.currentId++;
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
}

export { Task, List, Note }