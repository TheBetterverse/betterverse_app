(async () => {
    console.log('running redirect_invaliduser')
    var isAnon = $vm.isUserAnonymous
    var currentSubTab = $vm.currentSubTab
    const users = $getGrid('users')
    const currentUser = _.find(users, { user: fbUser.uid })


    if (currentUser.profileComplete == true){
        isAnon = false

    }

    //ANONYMOUS USER
    if(isAnon == true){
        return $setCurrentTab("-Mx_5FLL2jlxjXYUMdIL")
    }
    //INCOMPLETE PROFILE
    else if(currentUser.profileComplete != true && isAnon != true){
        return $setCurrentTab("-Mx_5FLL2jlxjXYUMdIL")
    }
    else{
        return null
    }
})();