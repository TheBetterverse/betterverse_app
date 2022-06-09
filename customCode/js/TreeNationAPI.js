(async () => {

    var activeProjectsArr = []
    var betterverseProjectsArr = []

    //Get TreeNation projects on Betterverse platform
    let projects = [] 
    projects = $getGrid('charityProjects').filter(row => row.$charity$display == "TreeNation") 
    
    //Get active projects from TreeNation API
    var requestURL = 'https://tree-nation.com/api/projects?status=active';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var response = request.response;
        $setGlobalModel('TreeNation Projects', response);
    }
    //Assign active projects from API to global var
    var APIactiveProjects = $getGlobalModel('TreeNation Projects');

    for(var i = 0; i < projects.length; i++){
        //Assign all projects on platform in array
        betterverseProjectsArr[i] = projects[i].projectName
        for(var x = 0; x < APIactiveProjects.length; x++){
            if (projects[i].projectName == APIactiveProjects[x].name && APIactiveProjects[x].status == "active"){
                //Assign all live projects in array
                activeProjectsArr[i] = projects[i].projectName
                //console.log(projects[i].projectName + " is active")
            }
        }
    }

    //Filter projects that are not active or listed on API
    var inactiveProjects = betterverseProjectsArr.filter(
                function(i) {
                    return this.indexOf(i) < 0;
                },
                activeProjectsArr
    );
    
    //Set inactive projects to private and inactive
    for(var a = 0; a < inactiveProjects.length; a++){
        for(var n = 0; n < projects.length; n++){
            if(projects[n].projectName == inactiveProjects[a]){
                console.log(projects[n])
                $setDataGridVal('charityProjects', projects[n].rowKey + '.inactiveProject', true)
                $setDataGridVal('charityProjects', projects[n].rowKey + '.projectAccess', 'private')
            }
        }
    }

})();