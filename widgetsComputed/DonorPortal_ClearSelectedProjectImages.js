return async function(){

    const gallery = await document.getElementById('bv__projectmodal__leftsideimagegallery');

    //Remove border(s)
    if(gallery){
        for (const child of gallery.children) {
            child.style.border = "0px solid #FFFFFF";
        }
    }

    return null
}