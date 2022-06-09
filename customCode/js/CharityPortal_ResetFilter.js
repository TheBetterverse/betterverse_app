(async () => {

    let currentFilter = $getUser('activeCharityDashboardFilter')

    if(currentFilter != 'alltime'){
        $setUser('activeCharityDashboardFilter', 'alltime')
        $setUser('activeCharityDashboardFilterValue', null)
    }

})();    