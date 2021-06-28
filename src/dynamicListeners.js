//Loads dom module
const dom = require('./dom.js');
const todoList = require('./logic.js');
const storage = require('./storage.js');

const dynamicListeners = (() => { 

    const init = function() {
        this.eventDelegation();
    }

    const eventDelegation = function() {
        document.getElementById('content').addEventListener("click", function(e){
            let targetId = e.target.id;
            let targetIdNumber = targetId.replace(/\D/g,'');
            console.log('You clicked: ' + targetId);

            if (targetId === 'saveButton') {
                //run function IN INDEX that takes all info from
                //form and creates object, puts it into array
                let projectArray = todoList.giveArray();

                todoList.getUserInput();
                dom.removeNewTaskDiv();
                
                //Save to localStorage
                let index = projectArray.length - 1;
                storage.saveData(projectArray, index);
                
            }

            if (targetId === 'saveProjectButton') {
                //create dom element and make it go before 
                //"add new project". remember to remove input
                //and save button
                dom.createNewProject();
                dom.removeProjOutlines();
                dom.outlineNewProj();
                //find way to make it automatically outline new proj
                /*
                this is brazy
                can't pass targetid because the target is "saveButton"
                make an "outlineNewProj" function
                How does it know which one is the new proj?
                */
            }

            //This selects a new project
            if (targetId.includes('projectButton')) {
                let projectButton = document.getElementById('projectButton' + targetIdNumber);
                let projectArray = todoList.giveArray();
                console.log(projectButton.innerHTML);
                dom.removeProjOutlines();
                dom.outlineSelectedProj(targetId);
                dom.clearTasks();
                dom.loadProjectTasks(projectArray, projectButton.innerHTML)
            }

            //This allows you to delete projects
            if (targetId === 'deleteProject') {
                let projectArray = todoList.giveArray();
                //let projectButton = document.getElementById('projectButton' + targetIdNumber);
                //Check if default project button is outlined
                let defaultButton = document.getElementById('defaultButton');
                if (defaultButton.style['border-style'] === 'solid'){
                    //Nothing happens
                    console.log('"Default" project cannot be deleted.');
                } else {

                    for (let i = 0; i < projectArray.length; i++) {

                        let projectButton = document.getElementById('projectButton' + i);
                        if (!projectButton) {
                            //Nothing happens
                        } else {
                            console.log('i is: ' + i);
                            if (projectButton.style['border-style'] === 'solid') {
                                //delete tasks from projectArray
                                todoList.deleteProjectTasks(projectButton.innerHTML);
                                //delete tasks from localStorage
                                storage.deleteByProjectName(projectArray, projectButton.innerHTML);
                                //console.log(localStorage.getItem('title2'));
                                break;
                
                            } else {
                                //Nothing happens
                            }
                        }
                        
            
                    }

                    //run the delete project function
                    dom.deleteProject();
                    //delete tasks from dom
                    dom.clearTasks();

                    //outline default project
                    dom.outlineSelectedProj('defaultButton');

                    //load tasks in "default" project
                    dom.loadProjectTasks(projectArray, 'Default');
                }
            }

            //This expands the selected item
            if (targetId.includes('expandTask')) {

                //Get array from logic.js
                let projectArray = todoList.giveArray();
                //document.getElementById(targetId);
                console.log(targetIdNumber);
                //Expands selected list item
                dom.expandListItem(projectArray, targetIdNumber);
                //Delete standard display task
                dom.deleteTask(targetIdNumber);
                
                //if (document.getElementById('expandedItem')) {
                    //nothing happens
                //} else {
                    /*
                    //Get array from logic.js
                    let projectArray = todoList.giveArray();
                    //document.getElementById(targetId);
                    console.log(targetIdNumber);
                    //Expands selected list item
                    dom.expandListItem(projectArray, targetIdNumber);
                    //Delete standard display task
                    dom.deleteTask(targetIdNumber);
                    */
                //}
                
                
                
                
            }

            if (targetId.includes('miniButton')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                let projectName = projectArray[targetIdNumber]['projectName'];

                //Remove expanded item
                let expandedItem = document.getElementById('expandedItem');
                expandedItem.remove();

                //Clear tasks
                dom.clearTasks();
                //Load tasks
                dom.loadProjectTasks(projectArray, projectName);
            }

            //This deletes the selected task
            if (targetId.includes('deleteTask')) {
                //Get array from logic.js
                //let projectArray = todoList.giveArray();

                //Delete task from array
                todoList.deleteArrayIndex(targetIdNumber);

                //Delete task from dom
                dom.deleteTask(targetIdNumber);

                //Delete task form localStorage
                storage.deleteTask(targetIdNumber);

                //Display new array just to be sure
                let projectArray = todoList.giveArray();
                console.log(projectArray);

                //Deletes expanded task divs if any exist
                let expandedItem = document.getElementById('expandedItem');
                if (expandedItem) {
                    expandedItem.remove();
                } else {
                    //Nothing happens
                }
                
            }

            //This allows you to edit an expanded item
            if (targetId.includes('editButton')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                //Call dom function
                dom.editExpandedItem(projectArray,targetIdNumber);
            }

            //This saves changes of edited item
            if (targetId.includes('saveChanges')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                
                //Call update array funciton
                //get the value from the blanks you dumb dumb
                let title = document.getElementById('editedTitle').value;
                let description = document.getElementById('editedDesc').value;
                let dueDate = document.getElementById('editedDate').value;
                let priority = document.getElementById('editedPriority').value;

                //send title, description, date, priority, and index
                todoList.updateArray(title, description, dueDate, priority, targetIdNumber);
                
                //call function that updates dom list element
                dom.updateTask(projectArray, targetIdNumber);

                //update localStorage
                storage.saveData(projectArray, targetIdNumber);

                //Remove expanded list item
                let expandedItem = document.getElementById('expandedItem');
                expandedItem.remove();
            }

            if (targetId === 'closeExpandedItem') {
                let expandedItem = document.getElementById('expandedItem');
                expandedItem.remove();
            }
        })
    }

    return {
        init,
        eventDelegation,
    }

})();



module.exports = dynamicListeners;