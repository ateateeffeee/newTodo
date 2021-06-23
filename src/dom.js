//Loads eventListeners module
//const eventListeners = require('./eventListeners.js');
//Can't load in event listeners here. Using "require", runs
    //the code before the dom and thinks it doesn't exist.

const dom = (() => {

    const init = function() {
        this.createContentDiv();
        this.createHeader();
        //this.createProjectList();
        //this.createNewTaskDiv();
        this.createAddTaskDiv();
        this.createProjectsContainer();
        //eventListeners.init();

    }

    const createContentDiv = function() {
        let content = document.createElement("div");
        content.id = 'content';
        document.body.appendChild(content);
    }

    const createHeader = function() {
        let header = document.createElement("div");
        header.id = 'header';

        document.getElementById('content').appendChild(header);
    }

    const createNewTaskDiv = function() {
        let div = document.createElement("div");
        div.id = 'newTaskDiv';

        let titleInput = document.createElement("input");
        titleInput.className = 'textBox';
        titleInput.id = 'titleBox';
        titleInput.placeholder = 'Title';
        
        let descripInput = document.createElement("input");
        descripInput.className = 'textBox';
        descripInput.id = 'descripBox';
        descripInput.placeholder = 'Description';

        let dateInput = document.createElement("input");
        dateInput.className = 'textBox';
        dateInput.id = 'dateBox';
        dateInput.placeholder = 'Due Date';
        //This should make a calendar pop up or at least
        //force date format

        let priorityInput = document.createElement("input");
        priorityInput.className = 'textBox';
        priorityInput.id = 'priorityBox';
        priorityInput.placeholder = 'Priority';

        let saveButton = document.createElement("button");
        saveButton.className = 'buttons';
        saveButton.id = 'saveButton';
        saveButton.innerHTML = 'Save';
        

        //Append div and text boxes
        div.appendChild(titleInput);
        div.appendChild(descripInput);
        div.appendChild(dateInput);
        div.appendChild(priorityInput);
        div.appendChild(saveButton);

        document.getElementById('content').appendChild(div);


    }

    const removeNewTaskDiv = function() {
        let div = document.getElementById('newTaskDiv');

        div.remove();
    }

    const createProjectList = function(projectArray) {
        //console.log(projectArray[0]['title']);

        //Work on this more when working with saved data
        //THIS IS GOOD

    }

    const outlineSelectedProj = function(id) {
        let projectButton = document.getElementById(id);

        projectButton.style['border-style'] = 'solid';
        projectButton.style['border-color'] = 'black';
        projectButton.style['border-width'] = '5px';
    }

    const outlineNewProj = function() {
        //let newProj = document.querySelector('#projectsList a:nth-child(-1)');

        let buttonCount = document.getElementById('projectsList').childNodes.length;
        let newProj = document.getElementById('projectsList').childNodes[buttonCount - 3];

        //console.log(newProj.id);
        //console.log(newProj.item(1));
        dom.outlineSelectedProj(newProj.id);

        //LEFT OFF HERE
        //FIGURE OUT WAY TO GET THIRD TO LAST ELEMENT IN PROJECTSLIST
        //THAT WILL ALWAYS BE THE LAST ADDED PROJECT
    }

    const removeProjOutlines = function() {
        console.log('removing outlines');
        //default project
        let defaultProj = document.getElementById('defaultButton');
        defaultProj.style['border-style'] = '';
        defaultProj.style['border-color'] = '';
        defaultProj.style['border-width'] = '';

        let projectCounter = document.getElementsByClassName('projectNames');
        console.log('still removing');
        //FIX THIS
        //THIS IS WHERE IT'S BREAKING
        /*
        -if projCount.length does not account for skipped numbers
        - last button(s) are being left out because i++ doesn't go that high
        need a different way to iterate/scan all projects
        */
        //START HERE TOMORROW
        for (let i = 1; i < projectCounter.length + 1; i++) {

            let projectButton = document.getElementById('projectButton' + i);

            if (!projectButton) {
                //nothing happens
            } else {
                projectButton.style['border-style'] = '';
                projectButton.style['border-color'] = '';
                projectButton.style['border-width'] = '';
            }

            


        }
        
       console.log(projectCounter.length);
       console.log('removed em');
    }

    const deleteProject = function() {
        //while variable.style.outline is FALSE, go through everything
        //check for default first and break iteration there if it is true
        //let i = 0;
        let projectCounter = document.getElementsByClassName('projectNames');
        console.log('inside delete project func');
        console.log(projectCounter.length);
        //Search for outlined button
        //condition has to be high to account for low length/high id number
        for (let i = 0; i < projectCounter.length * 10; i++) {

            let projectButton = document.getElementById('projectButton' + i);
            if (!projectButton) {
                //Nothing happens
            } else {
                console.log('i is: ' + i);
                if (projectButton.style['border-style'] === 'solid') {
                    projectButton.remove();
                    break;
    
                } else {
                    //Nothing happens
                }
            }
            

        }
        //let project = document.getElementById('defaultButton');
        //project needs 
            //project equals default and it has outline, break loop
            //make default project value be the default project button

    }

    const createAddTaskDiv = function() {
        let div = document.createElement("div");
        div.id = 'addTaskDiv';

        let button = document.createElement("button");
        button.innerHTML = 'Add Task';
        button.className = 'buttons';
        button.id = 'addTask';
        

        //Append elements
        div.appendChild(button);

        document.getElementById('content').appendChild(div);

        //Add event listener
        //eventListeners.addTaskListener();
        //console.log("added listener");
    }

    const removeAddTask = function() {
        let addTask = document.getElementById('addTask');
        console.log('removing addtask');
        addTask.remove();

        //Display new task div
        dom.createNewTaskDiv();

    }

    const addNewTask = function(projectArray) {
        //Gets project array from logic.js
        let project = projectArray;

        //Locates container
        let container = document.getElementById('content');

        //Counts the number of todo items
        //LOOK HERE. DO THIS SAME THING FOR THE LOOPING OF THE
        //BUTTON OUTLINES. WE'RE REMOVING BUTTON OUTLINES RN
        let itemCounter = document.getElementsByClassName('listItems');

        console.log(itemCounter.length);
        //Get info from blanks
        let title = project[itemCounter.length]['title'];
        //let description = document.getElementById('descripBox').value;
        let dueDate = project[itemCounter.length]['dueDate'];
        //let priority = document.getElementById('priorityBox');
        //let projectName = 'Default';
        
        //After getting this working, make default projectName depend on
        //which proj button is clicked. User can still make it
        //something else
        //Create element
        let newTaskDiv = document.createElement("div");
        newTaskDiv.id = 'listItem' + itemCounter.length;
        newTaskDiv.className = 'listItems';

        let titleElem = document.createTextNode(title);
        //Text nodes don't have id's or classnames...
        titleElem.className = 'itemTitles';

        let dateElem = document.createTextNode(dueDate);
        dateElem.className = 'itemDates';

        let deleteTask = document.createElement('button');
        deleteTask.innerHTML = 'Delete';
        deleteTask.id = 'deleteTask' + itemCounter.length;
        deleteTask.className = 'buttons';

        //append everything else to task here
        newTaskDiv.appendChild(titleElem);
        newTaskDiv.appendChild(dateElem);
        newTaskDiv.appendChild(deleteTask);

        container.appendChild(newTaskDiv);
        console.log(itemCounter.length);

        //array identifier needs to be a variable
        //use classname counter 
    }

    const updateTask = function(projectArray, idNumber) {
        //LEFT OFF HERE
        //Update the dom task
        //Move over values and remove current item
        //Give it the same id number IMPORTANT

        //Get list item
        let item = document.getElementById('listItem' + idNumber);
        item.innerHTML = '';

        //Get updated values
        let title = projectArray[idNumber]['title'];
        let description = projectArray[idNumber]['description'];
        let dueDate = projectArray[idNumber]['dueDate'];
        let priority = projectArray[idNumber]['priority'];

        //Create elements
        let titleElem = document.createTextNode(title);
        let descElem = document.createTextNode(description);
        let dateElem = document.createTextNode(dueDate);
        let priElem = document.createTextNode(priority);


        //Append new values
        item.appendChild(titleElem);
        item.appendChild(descElem);
        item.appendChild(dateElem);
        item.appendChild(priElem);

        //Create
    }

    const deleteTask = function(taskId) {
        let task = document.getElementById('listItem' + taskId);
        task.remove();
    }

    const createProjectsContainer = function() {
        let container = document.createElement("div");
        container.id = 'projectsList';

        let projectsLabel = document.createElement("h3");
        projectsLabel.id = 'projectsLabel';
        projectsLabel.innerHTML = 'Projects';

        let defaultButton = document.createElement("button");
        defaultButton.innerHTML = 'Default';
        defaultButton.id = 'defaultButton';
        defaultButton.className = 'projectNames';

        let addNewProject = document.createElement("button");
        addNewProject.innerHTML = 'Add new project';
        addNewProject.id = 'addNewProject';

        let deleteProject = document.createElement("button");
        deleteProject.innerHTML = 'Delete project';
        deleteProject.id = 'deleteProject';

        //Add logic that gives last clicked button a black outline
        //Or changes the color w/e

        
        //Run thing that loops and displays all saved projects
            //once saved data is up

        

        //Append elements
        container.appendChild(projectsLabel);
        container.appendChild(defaultButton);
        container.appendChild(addNewProject);
        container.appendChild(deleteProject);
        document.getElementById('content').appendChild(container);

        //Outline default project button
        dom.outlineSelectedProj(defaultButton.id);
    }

    const createNewProjectTab = function() {

        //Prevent multiple "new project" boxes from being made
        if (document.getElementById('newProjectBox')) {
            console.log('You already have a box, chief');
        } else {

        let addNewProjectButton = document.getElementById('addNewProject');

        let newProjectBox = document.createElement("input");
        newProjectBox.placeholder = 'Project name';
        newProjectBox.id = 'newProjectBox';

        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.id = "saveProjectButton";

        //Append elements before "add project" button
        addNewProjectButton.before(newProjectBox);
        addNewProjectButton.before(saveButton);
        console.log('type the name of your new project');

        }


    }

    const createNewProject = function() {
        //This counts the projects using the class name
        let projCounter = document.getElementsByClassName('projectNames');
        //console.log(projCounter.length);

        let addNewProjectButton = document.getElementById('addNewProject');
        
        let newProject = document.createElement("button");
        newProject.innerHTML = document.getElementById('newProjectBox').value;
        //newProject.id = 'projectButton' + projCounter.length;
        newProject.className = 'projectNames';

        for (let i = 1; i < projCounter.length + 1; i++) {
            let currentButton = document.getElementById('projectButton' + i);
            console.log('Current button: ' + currentButton + "i: " + i);

            if (!currentButton) {
                console.log('current button doesnt exist');
                newProject.id = 'projectButton' + i;
                break;
            } else {
                newProject.id = 'projectButton' + projCounter.length;
            }
        }

        //Refer to library project when accessing dynamic elements


        dom.clearNewProjectElements();
 
        addNewProjectButton.before(newProject);
        console.log('button added');
        console.log(projCounter.length);
    }

    const clearNewProjectElements = function() {
        let saveButton = document.getElementById('saveProjectButton');
        let newProjectBox = document.getElementById('newProjectBox');

        saveButton.remove();
        newProjectBox.remove();

    }

    const expandListItem = function(projectArray, targetIdNumber) {
        let container = document.getElementById('content');

        let expandedItem = document.createElement('div');
        expandedItem.id = 'expandedItem';
        //expandedItem.className = 'expandedItem';

        //Also add an edit button

        //Make it so only one can be expanded at a time
        console.log('These are the projects: ' + projectArray[targetIdNumber]['description']);

        //Get information from array
        let title = projectArray[targetIdNumber]['title'];
        let description = projectArray[targetIdNumber]['description'];
        let dueDate = projectArray[targetIdNumber]['dueDate'];
        let priority = projectArray[targetIdNumber]['priority'];

        //Create text nodes
        let titleElem = document.createTextNode(title);
        titleElem.id = 'expandedTitle';
        let descElem = document.createTextNode(description);
        descElem.id = 'expandedDescription';
        let dateElem = document.createTextNode(dueDate);
        dateElem.id = 'expandedDate';
        let priElem = document.createTextNode(priority);
        priElem.id = 'expandedPriority';

        //Create Edit Button
        let editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        //Only including targetIdNumber to make editing easier
        editButton.id = 'editButton' + targetIdNumber;
        editButton.className = 'buttons';

        //Also close it when clicking away from it?

        //Append elements
        expandedItem.appendChild(titleElem);
        expandedItem.appendChild(descElem);
        expandedItem.appendChild(dateElem);
        expandedItem.appendChild(priElem);
        expandedItem.appendChild(editButton);

        container.appendChild(expandedItem);
        
    }

    const editExpandedItem = function(projectArray, targetIdNumber) {
        //Get div of expanded item
        let expandedItem = document.getElementById('expandedItem');
        //Get current info and move it over to new input elements
        //Current elements
        /*
        let title = document.getElementById('expandedTitle');
        let description = document.getElementById('expandedDescription');
        let dueDate = document.getElementById('expandedDate');
        let priority = document.getElementById('expandedPriority');
        */

        //Input elements
        let inputTitle = document.createElement('input');
        inputTitle.value = projectArray[targetIdNumber]['title'];
        inputTitle.id = 'editedTitle';
        let inputDesc = document.createElement('input');
        inputDesc.value = projectArray[targetIdNumber]['description'];
        inputDesc.id = 'editedDesc';
        let inputDueDate = document.createElement('input');
        inputDueDate.value = projectArray[targetIdNumber]['dueDate'];
        inputDueDate.id = 'editedDate';
        let inputPriority = document.createElement('input');
        inputPriority.value = projectArray[targetIdNumber]['priority'];
        inputPriority.id = 'editedPriority';
        
        //Save button
        let saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save changes';
        saveButton.id = 'saveChanges' + targetIdNumber;
        saveButton.className = 'buttons';

        //Close button
        let closeButton = document.createElement('button');
        closeButton.innerHTML = 'Close';
        closeButton.id = 'closeExpandedItem';
        closeButton.className = 'buttons';

        console.log('THIS IS THE VALUE: ' + projectArray[targetIdNumber]['title']);
        //Wipe current elements with blank innerHTML
        expandedItem.innerHTML = '';

        //Append new elements and save button
        expandedItem.appendChild(inputTitle);
        expandedItem.appendChild(inputDesc);
        expandedItem.appendChild(inputDueDate);
        expandedItem.appendChild(inputPriority);
        expandedItem.appendChild(saveButton);
        expandedItem.appendChild(closeButton);

    }

    return {
        init,
        createHeader,
        createContentDiv,
        createAddTaskDiv,
        removeAddTask,
        addNewTask,
        updateTask,
        deleteTask,
        createProjectList,
        outlineSelectedProj,
        outlineNewProj,
        removeProjOutlines,
        deleteProject,
        createNewTaskDiv,
        removeNewTaskDiv,
        createProjectsContainer,
        createNewProjectTab,
        createNewProject,
        clearNewProjectElements,
        expandListItem,
        editExpandedItem,
    }

})();

module.exports = dom;

//left off here. Google how to export self whatevering funciton
//export this and then figure out how logic has to work as far as
//project names go and all dat

//5.26.21
//Build form and figure out how to get data flowing
//Set up event listeners in separate module?
//Don't have form always showing. This is just for testing right now
    //Only show it after clicking "add task" or whatever
/*
6.15.21
- How to give dynamic elements unique id's?
- Scan the page. How?
    -num = 0
    - Scan the page with a loop if id "project" + num + "button"
    is false, use that number. If true, add +1 to num and cycle again.
    - if that doesn't work, can put all project names into another array
    and refer to the length of it for the number. Scan will work.
    - Solved. Instead of things listed above, count the elements using the classname
    with element.length FIXED

- How to get access to project array in "expandListItem" function
    - Dynamic listener triggers dom. Can't
*/