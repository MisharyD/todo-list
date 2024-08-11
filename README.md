# Todo-list
![Todo List - Google Chrome 8_11_2024 9_58_24 PM](https://github.com/user-attachments/assets/e8b3215d-0332-4f18-842d-e409438bc75e)
![Todo List - Google Chrome 8_11_2024 9_57_28 PM](https://github.com/user-attachments/assets/8b62d8d4-6b1c-4ff0-afde-21f0dcf42303)
## Description:
This Todo list webapp allows you to add tasks, edit their date and priotiry and also add description to them, <br>
add subtasks withing tasks, create lists that contain tasks.<br>
The todolist also has a specific section for tasks that are in the same day, and also a section for tasks in the next 7 days.<br>

### Implementation details:
These are some details that are not specific to a specific line or lines.<br>
Components and Manager modules: 
- Subtasks do not get added to lists since they will be found within a task that is in a list.<br>
- main task Id is set within a task so that traversing can be easier to find parents tasks for deletion.<br>
when a task is deleted we can easily deleted from the subtask array of the main task by using the parent task id.<br>
- The code is written such that outside the manager you only get the ids of stuff. so always when using the manager functions you pass ids and not objects.<br>
DOM:<br>
- Anything named button is interactable but doesn't mean that anything else isn't.<br>
- Subtasks are 1 layer deep only.<br>
- Values with _ in the manager and component are public so that I can load them properly later.<br>
- all ids of elemennts in dom begin with i excpent subtasks container begin with s so that  when the display button is pressed the container is searched with main task id but different start letter.<br>
- To get the parent task of a subtask in the dom,  you can use the change task form id in the info section, or the subtask container in the list container section.<br>
### Some improvements that could be made:
- Completed Tasks should disappear in list other than completed after a while. or have a specific section for them in every list.<br>
- show and hide subtasks button sometimes glitch if pressed too fast or something, I dont know what is causing it.<br>
- Saving data should be done after every action.<br>
- I am not sure if this still happens or not, but sometimes notes loaded from local storage get wrong ids and everything goes wrong.<br>
- tasks displayed in the right should have a selected background color, but it was just too much of a pain to implement.

