//Loads external modules
const dom = require('./dom.js');
const staticListeners = require('./staticListeners.js');
const dynamicListeners = require('./dynamicListeners.js');
const todoList = require('./logic.js');

//Everything in "logic" file was previously here


//Executes external modules
dom.init();
staticListeners.init();
todoList.init();
dynamicListeners.init();





//IDEAS: Have one array that holds all to-do items.
    //Loop through array to find only items that have same
    //project name.

    //How to handle the default page?
    //Have a global array that stores project arrays. Push
    //to-do's to project array. NOPE. Just default that property
    //to "default" and don't show it in to-do list. This solves
    //default page but how do you make new projects w/o making
    //new to-do items? Can't see it being anything other than an array.
    //store project names in array? Get property names from that?
        //In whatever funciton that deletes proj name, delete items
        //with that name also. THIS IS THE ANSWER

    /*How to trigger index module functions from dynamic event
    listeners:
    - index needs DL or it won't go off
    - DL needs index to have access to functions
    - index HAS to be last because everything loads into it,
    no way around that
    - SOLVED: put all logic into new "logic.js" module

    Features to add:
    
    -tasks
        - add scroll wheel for "urgent/not urgent"
        - maybe make urgent ones red? i dunno


    -Project buttons
    - when clicking project button, only display tasks in that
    project
    - when deleting project, automatically outline "default" after



    DONE LIST
    - add edit button to expanded items div DONE
        - add edit functionality DONE
        - make value of input boxes the same as current value DONE
        - make this also change the real array DONE
            - create an "updateArray" function in logic.js DONE
        - make it change the dom oops too late DONE
    - outline the active project outline or color, w/e DONE
    - delete projects
        - make another button (delete project) pop up whenever
        a project that IS NOT id = defaultButton is selected/
        outlined/colored
        - if you delete a project that has tasks, those tasks go
        to "default"
    - tasks
        - save tasks to dom after clicking save. Put an if statement in the
        event listener for the save button. ex: if element has a border,
        it goes to the projectName that is in that button
        - delete tasks
        - add project to list of things you can edit. 


    BUGS
    - deleting projects out of order can generate the same id for two
        -recreate by making two new projs, deleting first, then making
        another FIXED
        -FIX: create a "reorder projects" function that deletes all projects
            and saves them back in order
            - trigger this one "delete project" click

            - projectNames.length -1
            loop through with "projectbutton" + i
            if "projectButton" + 1 is blank, that is the id
            that gets assigned
            else is the existing code

            - check the "createNewProject" and the "outlineSel
            ectedProject" dynamic ones won't outline anymore
            it's "removeProjectOutlines" that's breaking it
            FIX TODAY
            -works but still duping ids. work with "createNewProj"
            -FIXED forgot to put "break" after if statement
            
    - Can outline multiple projects if you delete projname1 FIXED
        - FIX: loop that checks for outline has .length * 10 for condition now


    */