//has name, date, priority, subtasks, and desctiption a task. can get and change all of them
class Task {
    subtasks = []

    constructor(name ="", description ="", date = null, priority = null)
    {
        this.name = name;
        this.description = description
        this.date = date;
        this.priority = priority;
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
}

//has name, tasks, notes, sections. can get and change all of them
class List {}

//has title, description, can get and change all of them
class Note {}

//has name, type, lists, notes. can get and change all of them
class Goal {}

//acts as a save file and as task manager, contains functions for adding, deleting tasks and lists. 
//changing info about a task or a list. contains an array for all tasks, lists and notes. 
class container {}

//currently for command line
class Todo {}

