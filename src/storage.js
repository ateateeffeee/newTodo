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
    }

    const loadData = function(projectArray){

    }





    return {
        init,
        saveData,
        loadData,
    }


})();

module.exports = storage;