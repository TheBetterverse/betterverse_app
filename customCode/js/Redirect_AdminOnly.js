(async () => {
    //console.log('running redirect_adminonly')
    
    //NOT ADMIN
    if ($vm.Global_GetUserRoles && !$vm.Global_GetUserRoles.includes('Admin')){
        $setCurrentTab("-Mx_5FLL2jlxjXYUMdIL")
    }
})();