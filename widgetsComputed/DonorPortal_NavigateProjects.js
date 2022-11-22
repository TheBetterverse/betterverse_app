// DonorPortal_NavigateProjects.js

return function(direction, selectedProject){

    let projects = this.DonorPortal_GetAllPublicCharityProjects()
    let currentProjectIndex

    for (i = 0; i < projects.length; i++){
        if(projects[i].rowKey == selectedProject){
            currentProjectIndex = i
        }        
    }

    if (direction == 'left'){
        //if on first project go to last in last
        if (currentProjectIndex == 0){
            currentProjectIndex = projects.length
        }
        let newSelectedProjectRowKey = projects[currentProjectIndex-1].rowKey
        $setUser('Donation_SelectedProject', newSelectedProjectRowKey)
        $setGlobalModel('selectedProjectImage', projects[currentProjectIndex-1].projectImage.url)

        const gallery = document.getElementById('bv__projectmodal__leftsideimagegallery');
        if(gallery){
          for (const child of gallery.children) {
              if(child.src == projects[currentProjectIndex-1].projectImage.url){
                  child.style.border = "1px solid #FFFFFF";
              }
          }
        }

    }

    else if(direction == 'right'){
        //if on last project go to first
        if (currentProjectIndex == projects.length - 1){
            currentProjectIndex = 0
            let newSelectedProjectRowKey = projects[currentProjectIndex].rowKey
            $setUser('Donation_SelectedProject', newSelectedProjectRowKey)
            $setGlobalModel('selectedProjectImage', projects[currentProjectIndex].projectImage.url)

            const gallery = document.getElementById('bv__projectmodal__leftsideimagegallery');
            if(gallery){
                for (const child of gallery.children) {
                    if(child.src == projects[currentProjectIndex].projectImage.url){
                        child.style.border = "1px solid #FFFFFF";
                    }
                }
            }
        }

        else if (currentProjectIndex >= 0){
            let newSelectedProjectRowKey = projects[currentProjectIndex+1].rowKey
            $setUser('Donation_SelectedProject', newSelectedProjectRowKey)
            $setGlobalModel('selectedProjectImage', projects[currentProjectIndex+1].projectImage.url)

            const gallery = document.getElementById('bv__projectmodal__leftsideimagegallery');
            if(gallery){
                for (const child of gallery.children) {
                    if(child.src == projects[currentProjectIndex+1].projectImage.url){
                        child.style.border = "1px solid #FFFFFF";
                    }
                }
            }

        }

    }

}