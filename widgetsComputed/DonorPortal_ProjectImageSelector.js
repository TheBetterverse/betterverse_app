return async function(imageURL){

    const gallery = await document.getElementById('bv__projectmodal__leftsideimagegallery');

    var previousImage = $getGlobalModel('selectedProjectImage')
    var selectedImage = $setGlobalModel('selectedProjectImage', imageURL)

    /*
    if (selectedImage){
        var previousImage = selectedImage
        $setGlobalModel('selectedProjectImage', previousImage) 
    }
    */
    
    //Remove border
    if(previousImage && gallery){
        for (const child of gallery.children) {
            if(child.src == previousImage){
                child.style.border = "0px solid #FFFFFF";
            }
        }
    }

    //Add border
    if(imageURL && gallery){
        $setGlobalModel('selectedProjectImage', imageURL) 
        for (const child of gallery.children) {
            if(child.src == imageURL){
                child.style.border = "1px solid #FFFFFF";
            }
        }
    }

    return null
}