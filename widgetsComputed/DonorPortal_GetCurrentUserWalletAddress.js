return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    var walletAddress

    if(currentUser.walletAddress != null){
        walletAddress = currentUser.walletAddress
        return walletAddress
    }   

    if(currentUser.walletAddress == null){
        walletAddress = null
        return walletAddress
    }   

}