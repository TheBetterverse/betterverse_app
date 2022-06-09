return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    let location = currentUser.location

    if(location != null){
        return location
    }

    if(location == null){
        location = null
        
        return location
    }
}