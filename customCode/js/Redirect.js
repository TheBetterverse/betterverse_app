(async () => {

    let currentUser = $vm.DonorPortal_GetCurrentUser()
    let currentUserRowKey = currentUser.rowKey
    let currentUserEmail = currentUser.eMail

    /*--REDIRECT CHARITY--*/
    if(currentUser.role == "-MxdXDOV7LI1yRN3t81I" && currentUser.charity != null){
        
        //Set charity profile values in user store
        if($getUser('charityProfile') == null){
            let charityRowKey = currentUser.charity
            $setUser('charityProfile', charityRowKey)
            $setUser('charityName', currentUser.$charity$display)
        }

        //Redirect to charity dashboard
        $setCurrentSubTab('-Mx_6HX9p6ioJWoofFIw', '-Mx_5BGnALCWCXiGI_Dm')
    }


    /*--REDIRECT NEW ANON REGULAR USER TO SIGN/REGISTER --*/
    else if(currentUser.role == "-MxdXEQ8xH5jcFGkUYP7" && currentUser.charity == null && currentUser.username == null && currentUser.profileComplete != true && !fbUser.email){
        
        //Redirect to Sign in/Register Page
        $setCurrentSubTab('-N0ZsOs2dAbF9PTr_Hz0', '-Mx_5FLL2jlxjXYUMdIL')
        $setUser('userRowKey', currentUserRowKey)

        console.log("New User: Login/Register!")

        //Prepopulate email field
        if(currentUser.eMail == null){
            $setDataGridVal("users", currentUserRowKey + ".eMail", currentUserEmail);
        }
    }

    /*REDIRECT EXISTING REGULAR USER WHERE PROFILE IS NOT COMPLETE*/
    else if(currentUser.role == "-MxdXEQ8xH5jcFGkUYP7" && currentUser.charity == null && currentUser.profileComplete != true && fbUser.email){
        
        //Redirect to Profile Setup
        $setCurrentSubTab('-MysZOod447ZdKXNCTey', '-Mx_5FLL2jlxjXYUMdIL')
        $setUser('profileSetUpStep', 1)

        console.log("Existing User: Profile is not complete!")

        //Prepopulate email field
        if(currentUser.eMail == null){
            $setDataGridVal("users", currentUserRowKey + ".eMail", currentUserEmail);
        }
    }   

    /*REDIRECT EXISTING REGULAR USER*/
    //currentUser.role == "-MxdXEQ8xH5jcFGkUYP7" && 
    else if(currentUser.charity == null && currentUser.profileComplete == true && fbUser.email){
        
        //Redirect to Dashboard
        $setCurrentSubTab('-MyvUthgoLrT0z0HdIX9', '-Mx_5FLL2jlxjXYUMdIL')

        console.log("Existing User")
    }    

})();