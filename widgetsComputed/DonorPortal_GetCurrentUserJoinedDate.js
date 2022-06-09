return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    let currentUserJoinedDate = currentUser.dateJoined

    const dateObject = new Date(currentUserJoinedDate)

    //Change date filter here!
    let joined = dateObject.toString("MMM dd");

    if (currentUserJoinedDate != null){
        return joined
    }
    
    else{
        return null
    }
}