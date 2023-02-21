return function(){

    const currentSubTab = this.currentSubTab

    if(this.DonorPortal_GetCurrentUserProfileComplete() != true){
        this.DonorPortal_RedirectToSignIn()
    }
    else{
        //If the user is currently on the dashboard
        if (currentSubTab == '-MyvUthgoLrT0z0HdIX9'){
            this.DonorPortal_TriggerMobileNav()
        }
        else{
            $setCurrentSubTab('-MyvUthgoLrT0z0HdIX9', '-Mx_5FLL2jlxjXYUMdIL')
        }
    }

}