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
            }

            //This expands the selected item
            if (targetId.includes('listItem')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                //This removes letters from target id
                let targetIdNumber = targetId.replace(/\D/g,'');
                //document.getElementById(targetId);
                console.log(targetIdNumber);
                //Expands selected list item
                dom.expandListItem(projectArray, targetIdNumber);
            }

            //This allows you to edit an expanded item
            if (targetId.includes('editButton')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                //This removes letters from target id
                let targetIdNumber = targetId.replace(/\D/g,'');
                //Call dom function
                dom.editExpandedItem(projectArray,targetIdNumber);
            }

            //This saves changes of edited item
            //DO THIS NEXT
            if (targetId.includes('saveChanges')) {
                //Get array from logic.js
                let projectArray = todoList.giveArray();
                //This removes letters from target id
                let targetIdNumber = targetId.replace(/\D/g,'');

                /*
                    -add number to "saveChanges" id to make saving to array
                    easier

                    - eventually make "targetIdNumber" available for whole scope
                    
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