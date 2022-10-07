/* DonorPortal_GetOtherProjects.js */

return function(selectedProjectRowKey){

    let otherProjects = $getGrid('charityProjects').filter(row => row.rowKey != selectedProjectRowKey && row.inactiveProject != true)

    return otherProjects
}