(async () => {

    //If current user that does not have admin permissions tries accessing pages where this function is running, redirect to Donor Portal.
    if ($vm.Global_GetUserRoles && !$vm.Global_GetUserRoles.includes('Admin')){
        $setCurrentTab("-Mx_5FLL2jlxjXYUMdIL")
    }

})();