//Loads dom module
const dom = require('./dom.js');
const todoList = require('./logic.js');

const dynamicListeners = (() => { 

    const init = function() {
        console.log('This is the dynamic listeners init');
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
                todoList.getUserInput();
                dom.removeNewTaskDiv();
                
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
                dom.removeProjOutlines();
                dom.outlineSelectedProj(targetId);
            }

            //This allows you to delete projects
            if (targetId === 'deleteProject') {
                //Check if default project button is outlined
                let defaultButton = document.getElementById('defaultButton');
                if (defaultButton.style['border-style'] === 'solid'){
                    //Nothing happens
                    console.log('"Default" project cannot be deleted.');
                } else {
                    //run the delete project function
                    dom.deleteProject();
                }
            }

            //This expands the selected item
            if (targetId.includes('listItem')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                //document.getElementById(targetId);
                console.log(targetIdNumber);
                //Expands selected list item
                dom.expandListItem(projectArray, targetIdNumber);
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

                //Remove expanded list item
                let expandedItem = document.getElementById('expandedItem');
                expandedItem.remove();
                /*
                let expandedItem = document.getElementById('expandedItem');
                expandedItem.remove();
                */
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