return function(){

    var validUser = this.DonorPortal_GetCurrentUserProfileComplete()

    if(validUser == true){
        $setCurrentSubTab("-N0_SDmYe-3EuTeLRMpy", "-Mx_5FLL2jlxjXYUMdIL")
    }

    if(validUser == false){
        $setCurrentTab("-Mx_5FLL2jlxjXYUMdIL")
    }



    return null
}