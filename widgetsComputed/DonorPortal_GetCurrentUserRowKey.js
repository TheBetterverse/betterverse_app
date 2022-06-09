return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    let currentUserRowKey = currentUser.rowKey

    return currentUserRowKey
}