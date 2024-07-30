(()=>{"use strict";class t{static currentId=0;_subtasks={};constructor(s,e,o,n,i){this._name=s,this._description=e,this._date=o,this._priority=n,this._completed=!1,this._parentTaskId=i,this.id=t.currentId++}get name(){return this._name}set name(t){this._name=t}get description(){return this._description}set description(t){this._description=t}get date(){return this._date}set date(t){this._date=t}get priority(){return this._priority}set priority(t){this._priority=t}get subtasks(){return this._subtasks}get parentTaskId(){return this._parentTask}set parentTaskId(t){this._parentTask=t}get completed(){return this.completed}set completed(t){this.completed=t}addSubtask=t=>{this._subtasks[t.id]=t};removeSubTask=t=>{delete this._subtasks[t.id]}}class s{static currentId=0;constructor(t){this._name=t,this._notes={},this._tasks={},this._id=s.currentId++}get name(){return this._name}set name(t){this._name=t}get tasks(){return this._tasks}get notes(){return this._notes}get id(){return this._id}addTask(t){this._tasks[t.id]=t}deleteTask(t){delete this._tasks[t.id]}addNote(t){this._notes[t.id]=t}deleteNote(t){delete this._notes[t.id]}}class e{static currentId=0;constructor(t,s){this._name=t,this._description=s,this._id=e.currentId++}get name(){return this._name}set name(t){this._name=t}get description(){return this._description}set description(t){this._description=t}get id(){return this._id}}class o{constructor(t=null,e=null,o=null){null!=o?(this._allTasks=t,this._allLists=e,this._allNotes=o,this._inbox=this._allLists[0],this._today=this._allLists[1],this._next7=this._allLists[1]):(this._allTasks={},this._allLists={},this._allNotes={},this._inbox=new s("Inbox"),this._today=new s("Today"),this._next7=new s("Next 7 Days"),this._allLists[this._inbox.id]=this._inbox,this._allLists[this._today.id]=this._today,this._allLists[this._next7.id]=this._next7)}addTask({name:s="",description:e="",date:o=null,priority:n=null},i=null){const l=new t(s,e,o,n,null);if(this._allTasks[l.id]=l,null!=i){const t=this._allLists[i];return!!t&&(t.addTask(l),l.id)}this._inbox.addTask(l)}addSubtask(s,{name:e="",description:o="",date:n=null,priority:i=null}){const l=this._allTasks[s];if(l){const a=new t(e,o,n,i,s);return this._allTasks[a.id]=a,l.addSubtask(a),a.id}return!1}changeTaskInfo(t,s,e,o,n){const i=this._allTasks[t];return!!i&&(i.name=s,i.description=e,i.date=o,i.priority=n,!0)}addList(t=""){const e=new s(t);return this._allLists[e.id]=e,e.id}deleteList(t){const s=this._allLists[t];if(s){const e=s.tasks;for(const t in e){for(const e in this._allLists)e!=s.id&&this._allLists[e].deleteTask(this._allTasks[t]);delete this._allTasks[t]}const o=s.notes;for(const t in o)delete this._allNotes[t];return delete this._allLists[t],!0}return!1}deleteTask(t){const s=this._allTasks[t];if(s){const e=s.parentTaskId;if(null!=e)this._allTasks[e].removeSubtask(s);else for(const t in this._allLists)this._allLists[t].deleteTask(s);return delete this._allTasks[t],!0}return!1}completeTask(t){const s=this._allTasks[t];return!!s&&(s.completed(!0),!0)}uncompleteTask(t){const s=this._allTasks[t];return!!s&&(s.completed(!1),!0)}moveTaskFromList(t,s,e){const o=this._allLists[s],n=this._allLists[e];if(o&&n){const s=this._allTasks[t];return!!s&&(o.removeTask(s),n.addTask(s),!0)}return!1}addNote(t="",s="",o=null){const n=new e(t,s);if(null!=o){const t=this._allLists[o];return!!t&&(t.addNote(n),this._allNotes[n.id]=n,n.id)}this._inbox.addNote(o)}deleteNote(t,s){const e=this._allNotes[t];if(e){delete this._allNotes[e.id];const t=this._allLists[s];return!!t&&(t.removeNote(e),!0)}return!1}getAllListIds(){return Object.keys(this._allLists)}getListInfo(t){const s=this._allLists[t];return s?{name:s.name,tasks:Object.keys(s.tasks),notes:Object.keys(s.notes)}:null}getTaskInfo(t){const s=this._allTasks[t];return!!s&&{name:s.name,description:s.description,date:s.date,priority:s.priority,subtasks:Object.keys(s.subtasks)}}getNoteInfo(t){const s=this._allNotes[t];return s?{name:s.name,description:s.description}:null}getTasksOfList(t){const s=this._allLists[t];return s?Object.keys(s.tasks):[]}getNotesOfList(t){const s=this._allLists[t];return s?Object.keys(s.notes):[]}get today(){return this._today.id}get inbox(){return this._inbox.id}get next7(){return this._next7.id}}!function(){let t=new o;function s(){console.log("Options:"),console.log("1- Enter inbox list"),console.log("2- Enter today list"),console.log("3- Enter next 7 days list"),console.log("4- Show all lists"),console.log("5- Add new list"),console.log("6- Delete list"),console.log("0- Exit"),function(){switch(prompt("Enter your choice:")){case"1":e(t.inbox);break;case"2":e(t.today);break;case"3":e(t.next7);break;case"4":!function(){t.getAllListIds().forEach((s=>{const e=t.getListInfo(s);console.log(`List: ${e.name} (ID: ${s})`)}));const o=prompt("Enter list ID to enter it, or '-1' to return to main menu:");"-1"===o?s():e(o)}();break;case"5":!function(){const e=prompt("Enter new list name:"),o=t.addList(e);console.log(`New list created with ID: ${o}`),s()}();case"6":!function(){t.getAllListIds().forEach((s=>{const e=t.getListInfo(s);console.log(`List: ${e.name} (ID: ${s})`)}));const e=prompt("Enter list ID to delete:");t.deleteList(e)?console.log(`List with ID: ${e} deleted.`):console.log("Invalid list ID. Try again."),s()}();break;case"0":console.log("Goodbye!");break;default:console.log("Invalid choice. Try again."),s()}}()}function e(o){console.log("List Options:"),console.log("1- Add new task"),console.log("2- Add new note"),console.log("3- Show all tasks and notes"),console.log("4- Return to all options"),console.log("5- Delete task"),function(o,i){switch(o){case"1":!function(s){const o=prompt("Enter task name:"),n=prompt("Enter task description:"),i=prompt("Enter task date (YYYY-MM-DD):"),l=prompt("Enter task priority:"),a=t.addTask({name:o,description:n,date:i,priority:l},s);!1!==a?console.log(`Task added with ID: ${a}`):console.log("Failed to add task."),e(s)}(i);break;case"2":!function(s){const o=prompt("Enter note name:"),n=prompt("Enter note description:"),i=t.addNote(o,n,s);!1!==i?console.log(`Note added with ID: ${i}`):console.log("Failed to add note."),e(s)}(i);break;case"3":n(i);break;case"4":s();break;case"5":!function(s){const o=t.getListInfo(s);console.log("Tasks:"),o.tasks.forEach((s=>{const e=t.getTaskInfo(s);e?console.log(`Task: ${e.name} (ID: ${s})`):console.log("failed")}));let n=prompt("Enter task ID to delete or '-1' to return to list menu:");"-1"===n||(t.deleteTask(n)?console.log("task deleted successfully"):console.log("failed")),e(s)}(i);break;default:console.log("Invalid choice. Try again."),e(i)}}(prompt("Enter your choice:"),o)}function n(s){const o=t.getListInfo(s);console.log("Tasks:"),o.tasks.forEach((s=>{const e=t.getTaskInfo(s);e?console.log(`Task: ${e.name} (ID: ${s})`):console.log("failed")})),console.log("Notes:"),o.notes.forEach((s=>{const e=t.getNoteInfo(s);e?console.log(`Note: ${e.name} (ID: ${s})`):console.log("failed")}));const i=prompt("Enter task/note ID to view details, or '-1' to return to list menu:");if("-1"===i)e(s);else{const e=t.getTaskInfo(i);if(e)console.log(`Task: ${e.name}`),console.log(`Description: ${e.description}`),console.log(`Date: ${e.date}`),console.log(`Priority: ${e.priority}`),"yes"===prompt("Mark task as complete? (yes/no):").toLowerCase()&&(t.completeTask(i),console.log("Task marked as complete."));else{const s=t.getNoteInfo(i);s?(console.log(`Note: ${s.name}`),console.log(`Description: ${s.description}`)):console.log("Invalid ID. Try again.")}n(s)}}s()}()})();
//# sourceMappingURL=bundle.js.map