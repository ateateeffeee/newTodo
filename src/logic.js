//Loads external modules
const dom = require('./dom.js');

//dynamicListeners loads in index. Which means that when loading in
//dyanmicListeners, it won't have the index module because it hasn't
//run yet....

//Factory function to create To-do items
function todoItem(title, description, dueDate, priority, projectName) {
    const todoItem = {};

    todoItem.title = title;
    todoItem.description = description;
    todoItem.dueDate = dueDate;
    todoItem.priority = priority;
    todoItem.projectName = projectName;

    return todoItem;
}

//test item
const testItem = new todoItem('Samurai Black', 'Become black',
 'tomorrow', 'very important', 'Cool Things');
//console.log(testItem.dueDate);

//Global project array. (This holds all projects)
const projectArray = [];

//Main To-do list module
const todoList = (() => {
    const init = function() {
        //this.test();
        //this.createDefaultProject();
        //this.getUserInput();
        dom.createProjectList(projectArray);
    }

    const test = function() {
        console.log("this is a test function");
    }

    const createNewItem = function(title, description, dueDate,
        priority, projectName) {
        let newItem = new todoItem(title, description, dueDate, priority,
            projectName);

        console.log(newItem);

        //TEST PUSH TO PROJECT ARRAY
        projectArray.push(newItem);
        console.log(projectArray[0]['projectName']);

        //Creates object element
        dom.addNewTask(projectArray);

        
    }

    const getUserInput = function() {
        //make these equal a text box when dom is set up
        //let title = "Get a gf";
        //let description = "Talk to a girl";
        //let dueDate = "Tomorrow";
        //let priority = "Urgent";
        //let projectName = "MINDSET";

        //when these run, there isn't a value yet...?

        
        let title = document.getElementById('titleBox').value;
        let description = document.getElementById('descripBox').value;
        let dueDate = document.getElementById('dateBox').value;
        let priority = document.getElementById('priorityBox').value;
        let projectName = 'Default';

        //This finds the outlined project tab to determine projectName
        let projectCounter = document.getElementsByClassName('projectNames');
        //Search for outlined button
        //condition has to be high to account for low length/high id number
        for (let i = 0; i < projectCounter.length * 10; i++) {

            let projectButton = document.getElementById('projectButton' + i);
            if (!projectButton) {
                //Nothing happens
            } else {
                console.log('i is: ' + i);
                if (projectButton.style['border-style'] === 'solid') {
                    projectName = projectButton.innerHTML;
                    break;
    
                } else {
                    //Nothing happens
                }
            }
            

        }
        

        //Insert if statement that says: "If project name
            // does not exist, createNewProject();"
            //If name  == "default" or it's blank, put in
            //default

        //This creates a new todo item
        todoList.createNewItem(title, description, dueDate, 
            priority, projectName);
    }

    const giveArray = function() {
        //This function is only for getting the array to other modules
        return projectArray
    }

    const updateArray = function(title, description, dueDate, priority, index) {
        projectArray[index]['title'] = title;
        projectArray[index]['description'] = description;
        projectArray[index]['dueDate'] = dueDate;
        projectArray[index]['priority'] = priority;
    }

    const deleteArrayIndex = function(index) {
         projectArray.splice(index, 1);
        
    }
    /*
    const createDefaultProject = function() {
        projectArray.push(defaultProject);
    }
    */

    return {
        init,
        test,
        createNewItem,
        getUserInput,
        giveArray,
        updateArray,
        deleteArrayIndex,
        //createDefaultProject,
        // createNewProject,
        // start here tomorrow
            //make each project an array to store to-do's in?

    }
})();

module.exports = todoList;
