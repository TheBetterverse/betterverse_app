return async function(){

    const gallery = await document.getElementById('bv__projectmodal__leftsideimagegallery');

    //Remove border(s)
    if(gallery){
        for (const child of gallery.children) {
            if(child.src == $getUser('SelectedProject_Image')){
                child.style.border = "0px solid #FFFFFF";
            }
            if(child.src == $getUser('PreviousSelectedProject_Image')){
                child.style.border = "0px solid #FFFFFF";
            }
        }
    }


    $setUser('PreviousSelectedProject_Image', null)
    $setUser('SelectedProject_Image', null)

    return null
}