//Loads dom module
const dom = require('./dom.js');

const staticListeners = (() => { 

    const init = function() {
        console.log('This is the staticListeners init');
        this.addTaskListener();
        this.addNewProject();
        this.defaultProjectButton();
    }

    const addTaskListener = function() {
        document.getElementById('addTask').addEventListener("click", function(){
            if (document.getElementById('newTaskDiv') || document.getElementById('expandedItem')) {

            } else {
                dom.createNewTaskDiv();
            }
        });
    }

    const addNewProject = function() {
        document.getElementById('addNewProject').addEventListener("click", dom.createNewProjectTab);
    }

    const defaultProjectButton = function() {
        document.getElementById('defaultButton').addEventListener("click", function(){
            dom.removeProjOutlines();
            dom.outlineSelectedProj('defaultButton');
        });
    }

    return {
        init,
        addTaskListener,
        addNewProject,
        defaultProjectButton,
    }

})();

module.exports = staticListeners;