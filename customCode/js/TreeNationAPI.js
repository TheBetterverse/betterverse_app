(async () => {

    //Get TreeNation projects
    let projects = [] 
    projects = $getGrid('charityProjects').filter(row => row.$charity$display == "TreeNation") 
    
    //Get active projects from
    var requestURL = 'https://tree-nation.com/api/projects?status=active';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      var response = request.response;
        $setGlobalModel('TreeNation Projects', response);
    }

    var activeProjects = $getGlobalModel('TreeNation Projects');

    for(var i = 0; i < projects.length; i++){
        for(var x = 0; x < activeProjects.length; x++){
            if (projects[i].projectName == activeProjects[x].name){
                console.log(projects[i].projectName)
            }
            else if (projects[i].projectName != activeProjects[x].name){
                console.log(projects[i].projectName)
            }
        }
    }

})();