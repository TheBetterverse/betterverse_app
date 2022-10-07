return function(image){

    var project = this.DonorPortal_GetSpecificProject()
    var imageMax = 6


    var additionalImages = []

    if(project.projectImage){
        additionalImages.push(project.projectImage.url)
    }
    if(project.additionalProjectImage1){
        additionalImages.push(project.additionalProjectImage1.url)
    }
    if(project.additionalProjectImage2){
        additionalImages.push(project.additionalProjectImage2.url)
    }
    if(project.additionalProjectImage3){
        additionalImages.push(project.additionalProjectImage3.url)
    }
    if(project.additionalProjectImage4){
        additionalImages.push(project.additionalProjectImage4.url)
    }
    if(project.additionalProjectImage5){
        additionalImages.push(project.additionalProjectImage5.url)
    }
    if(project.additionalProjectImage6){
        additionalImages.push(project.additionalProjectImage6.url)
    }
    if(project.additionalProjectImage7){
        additionalImages.push(project.additionalProjectImage7.url)
    }
    if(project.additionalProjectImage8){
        additionalImages.push(project.additionalProjectImage8.url)
    }
    if(project.additionalProjectImage9){
        additionalImages.push(project.additionalProjectImage9.url)
    }
    
    if(additionalImages.length == 1){
        return null
    }
    else{
        return additionalImages
    }



}