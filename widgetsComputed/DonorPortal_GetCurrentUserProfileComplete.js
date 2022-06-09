return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    let currentUserProfileComplete = currentUser.profileComplete

    if (currentUserProfileComplete == true){
        return true
    }
    else{
        return false
    }
}