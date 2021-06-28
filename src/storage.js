const storage = (() => {
    const init = function() {

    }

    const saveData = function(projectArray, index){

        let title = projectArray[index]['title'];
        let description = projectArray[index]['description'];
        let dueDate = projectArray[index]['dueDate'];
        let priority = projectArray[index]['priority'];
        let projectName = projectArray[index]['projectName'];

        localStorage.setItem('title' + index, title);
        localStorage.setItem('description' + index, description);
        localStorage.setItem('dueDate' + index, dueDate);
        localStorage.setItem('priority' + index, priority);
        localStorage.setItem('projectName' + index, projectName);
    }

    const loadData = function(index){
        //check if local storage is true
  
        /*
        for (let i = 0; i <= ((localStorage.length / 5) - 1); i++ ){
            //this needs access to the object creator.
            //it needs to parse through and stick variables into
            //creator

            //take out loop. make it load data once and return title, desc, etc

        }
        */
       let title = localStorage.getItem('title' + index);
       let description = localStorage.getItem('description' + index);
       let dueDate = localStorage.getItem('dueDate' + index);
       let priority = localStorage.getItem('priority' + index);
       let projectName = localStorage.getItem('projectName' + index);

        return [title, description, dueDate, priority, projectName]
        //reference "title" with "loadData[0]"

    }

    const deleteTask = function(index){
        localStorage.removeItem('title' + index);
        localStorage.removeItem('description' + index);
        localStorage.removeItem('dueDate' + index);
        localStorage.removeItem('priority' + index);
        localStorage.removeItem('projectName' + index);
    }

    const deleteByProjectName = function(projectArray, projectName){
        for (let i = projectArray.length; i >= 0; i--) {
            //How do I connect this to local storage?
            let savedProjectName = localStorage.getItem('projectName' + i);
            if (savedProjectName === projectName) {
                localStorage.removeItem('title' + i);
                localStorage.removeItem('description' + i);
                localStorage.removeItem('dueDate' + i);
                localStorage.removeItem('priority' + i);
                localStorage.removeItem('projectName' + i);
            } else {
                //nothing happens
            }
            }
                
    }





    return {
        init,
        saveData,
        loadData,
        deleteTask,
        deleteByProjectName,
    }


})();

module.exports = storage;