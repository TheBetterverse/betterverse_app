return async function(imageURL){

    const gallery = await document.getElementById('bv__projectmodal__leftsideimagegallery');

    var selectedImage = await $getUser('SelectedProject_Image')

    if (selectedImage){
        var previousImage = await selectedImage
        $setUser('PreviousSelectedProject_Image', previousImage)
    }

    //Remove border
    if(previousImage){
        for (const child of gallery.children) {
            if(child.src == previousImage){
                child.style.border = "0px solid #FFFFFF";
            }
        }
    }

    //Add border
    if(imageURL){
        await $setUser('SelectedProject_Image' , imageURL)
        for (const child of gallery.children) {
            if(child.src == imageURL){
                child.style.border = "1px solid #FFFFFF";
            }
        }
    }

    return null
}