//Loads external modules
const dom = require('./dom.js');
const storage = require('./storage.js');


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

//localStorage.clear();
//console.log(localStorage.length);
//TEST localStorageData with this
/*
localStorage.setItem('title0', 'Get rich');
localStorage.setItem('description0', 'Acquire lotta money');
localStorage.setItem('dueDate0', '11.12.22');
localStorage.setItem('priority0', 'Urgent');
localStorage.setItem('projectName0', 'Poop');
*/

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
        this.importData();
        dom.createProjectList(projectArray);
    }

    const importData = function(){
        if (localStorage) {
            for (let i = 0; i <= ((localStorage.length / 5) - 1); i++ ){
                //this needs access to the object creator.
                //it needs to parse through and stick variables into
                //creator
    
                //take out loop. make it load data once and return title, desc, etc
                
                let savedData = storage.loadData(i);
                console.log(savedData[0]);
                //create a new object w/ createNewItem function
                todoList.createNewItem(savedData[0], savedData[1], savedData[2], savedData[3], savedData[4]);

                console.log(projectArray);

                //load task to dom
                //ALREADY DOES IT? Because it's in createNewItem function
                //keep it for now, idc
                //this loads projectName tabs/buttons
                if (savedData[4] !== 'Default' ) {
                    dom.loadProjectButtons(savedData[4]);
                } else {
                    //nothing happens
                }
                //Outline default task
                dom.outlineSelectedProj('defaultButton');
                //Clear created tasks since only "Default" is selected
                dom.clearTasks();
                //Load default projects
                dom.loadProjectTasks(projectArray, 'Default');


            }
        } else {
            //nothing happens
        }
    }

    const createNewItem = function(title, description, dueDate,
        priority, projectName) {
        let newItem = new todoItem(title, description, dueDate, priority,
            projectName);

        console.log(newItem);

        //Pushes object to array
        projectArray.push(newItem);


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
        let priority = document.getElementById('priorityScroll').value;
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
        //THIS MIGHT NEED A REWORK
        //Gets index from targeIdNumber
        //TIN is taken from dom. Will not always correspond to
        //array...
        //Scan entire array and look for match between array[i]['title'] and
        //whatever is in title dom element. Delete if there is a match
         projectArray.splice(index, 1);
        
    }

    const deleteProjectTasks = function(projectName) {
        console.log(projectArray);
        //go through each object in array. Delete all of the ones with
        //selected project name

        //Loop through array
        //If array['projectName'] === projectName
            //deleteArrayIndex(i)
        //display array after to check
        console.log(projectName);
        for (let i = projectArray.length; i >= 0; i--) {
            if (!projectArray[i]) {
                console.log('nothing is happening');
            } else if (projectArray[i]['projectName'] === projectName) {
                projectArray.splice(i, 1);
                //console.log('LOOPING');
                //console.log(i + ' ' + projectArray.length);
                //console.log(projectArray[i]);

            } else {
                //Nothing happens
            }
        }
        console.log('new array');
        console.log(projectArray);
    }
    /*
    const createDefaultProject = function() {
        projectArray.push(defaultProject);
    }
    */

    return {
        init,
        importData,
        createNewItem,
        getUserInput,
        giveArray,
        updateArray,
        deleteArrayIndex,
        deleteProjectTasks,
        //createDefaultProject,
        // createNewProject,
        // start here tomorrow
            //make each project an array to store to-do's in?

    }
})();

module.exports = todoList;
