(async () => {
    console.log('running redirect_signedinuser')

    const users = $getGrid('users')
    const currentUser = _.find(users, { user: fbUser.uid })
    const profileComplete = currentUser.profileComplete
    var currentProfileStage = $getUser('ProfileSetUpStage')
    var currentSubTab = $vm.currentSubTab

    var isAnon = $vm.isUserAnonymous
    //const currentUser = $vm.DonorPortal_GetCurrentUser()

    //VALID PROFILE
    if(!isAnon && profileComplete){
        $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
    }

    //LOGIN OR SIGN IN PAGE - USER HASN'T COMPLETED PROFILE
    if(currentSubTab == '-N0ZsOs2dAbF9PTr_Hz0' || currentSubTab == '-N4IRMyIAw-t4q0VNr0C'){
        if (currentProfileStage || currentProfileStage != 'complete'){
            if (currentProfileStage == 1){
                //Redirect to personal info
                $setCurrentSubTab('-MysZOod447ZdKXNCTey', '-Mx_5FLL2jlxjXYUMdIL')
            }  
            else if (currentProfileStage == 2){
                //Redirect to wallet setup
                $setCurrentSubTab('-N4UIKK5MmraPqo_BhCH', '-Mx_5FLL2jlxjXYUMdIL')
            }
        }   
    }

    //PROFILE SETUP PAGES - USER HASNT STARTED PROFILE SETUP
    if(currentSubTab == '-MysZOod447ZdKXNCTey' || currentSubTab == '-N4UIKK5MmraPqo_BhCH' ){
        if (currentProfileStage == null){
            console.log('here')
                $setCurrentSubTab('-N0ZsOs2dAbF9PTr_Hz0')
            } 
    }

    return null
})();