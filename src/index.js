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
    - outline the active project outline or color, w/e
    
    - save tasks to dom after clicking save. Put an if statement in the
    event listener for the save button. ex: if element has a border,
    it goes to the projectName that is in that button

    - delete projects
        - make another button (delete project) pop up whenever
        a project that IS NOT id = defaultButton is selected/
        outlined/colored

    - add edit button to expanded items div DONE
        - add edit functionality DONE
        - make value of input boxes the same as current value DONE
        - make this also change the real array
            - create an "updateArray" function in logic.js


    */