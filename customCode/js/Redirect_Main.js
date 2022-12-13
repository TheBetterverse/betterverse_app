;(async () => {
  console.log('running redirect_main')
  //const currentUser = $vm.DonorPortal_GetCurrentUser()
  
  const users = $getGrid('users')
  const currentUser = await _.find(users, { user: fbUser.uid })
  const currentUserRowKey = currentUser.rowKey
  const currentUserEmail = currentUser.eMail
  var isAnon = $vm.isUserAnonymous
  if (currentUser.profileComplete == true){
    isAnon = false
  }
  
  var currentProfileStage = $getUser('ProfileSetUpStage')

  /*--REDIRECT NEW ANON REGULAR USER TO SIGN/REGISTER --*/
  if (
    currentUser.role == '-MxdXEQ8xH5jcFGkUYP7' &&
    currentUser.charity == null &&
    currentUser.username == null &&
    currentUser.profileComplete != true &&
    isAnon
  ) {
    //Redirect to Sign in/Register Page
    console.log("New User: Login/Register!")
    $setCurrentSubTab('-N0ZsOs2dAbF9PTr_Hz0', '-Mx_5FLL2jlxjXYUMdIL')

  /*REDIRECT EXISTING REGULAR USER WHERE PROFILE IS NOT COMPLETE*/
  } else if (
    currentUser.role == '-MxdXEQ8xH5jcFGkUYP7' &&
    currentUser.charity == null &&
    currentUser.profileComplete != true &&
    !isAnon
  ) {

    console.log("Existing User: Profile is not complete!")
    if (currentProfileStage == 1){
      //Redirect to personal info
      $setCurrentSubTab('-MysZOod447ZdKXNCTey', '-Mx_5FLL2jlxjXYUMdIL')
    }  
    else if (currentProfileStage == 2){
      //Redirect to wallet setup
      $setCurrentSubTab('-N4UIKK5MmraPqo_BhCH', '-Mx_5FLL2jlxjXYUMdIL')
    }
    //CLOSED BETA INVITE
    else if (fbUser.email && currentProfileStage == null){
      await $setUser('ProfileSetUpStage', 1)
      $setCurrentSubTab('-MysZOod447ZdKXNCTey', '-Mx_5FLL2jlxjXYUMdIL')
    }
  }

  /*REDIRECT EXISTING REGULAR USER*/
  else if (
    currentUser.charity == null &&
    currentUser.profileComplete == true &&
    !isAnon
  ) {
    //Redirect to Dashboard
    console.log("Existing User")
    $setCurrentSubTab('-MyvUthgoLrT0z0HdIX9', '-Mx_5FLL2jlxjXYUMdIL')
  }
})()
