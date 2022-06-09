return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    let currentUserProfileImage = currentUser.profileImage

    if (currentUserProfileImage != null){
        return currentUserProfileImage.url
    }
    else{
        return false
    }
}