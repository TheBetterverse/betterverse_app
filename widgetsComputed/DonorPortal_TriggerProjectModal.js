/* DonorPortal_TriggerProjectModal.js */

return function (trigger, image) {
  if (trigger == 'display') {
    var element = document.getElementById('bv__projectmodal')
    element.style.display = 'block'

    //Add border
    if(image){
        const gallery = document.getElementById('bv__projectmodal__leftsideimagegallery');
        if(gallery){
          for (const child of gallery.children) {
              if(child.src == image){
                  child.style.border = "1px solid #FFFFFF";
              }
          }
        }
    }

  } else if (trigger == 'hide') {
    var element = document.getElementById('bv__projectmodal')
    element.style.display = 'none'
    this.DonorPortal_ClearSelectedProjectImages()
  }
}
