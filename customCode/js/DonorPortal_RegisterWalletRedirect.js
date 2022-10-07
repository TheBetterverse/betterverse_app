(async () => {
    let currentUserRow = await $vm.DonorPortal_GetCurrentUser()

    if(currentUserRow.walletAddress != null && currentUserRow.walletAddress.length != 0){
        //$setCurrentSubTab("-N6OJKPA76EZPTjdgEMp", "-Mx_5FLL2jlxjXYUMdIL")
    }

    else{
        return null
    }

})(); 