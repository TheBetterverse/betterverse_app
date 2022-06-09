return function(filter){

    $setUser('activeCharityDashboardFilter', filter)

    var nowDate = new Date();

    if(filter == "alltime"){
        $setUser('activeCharityDashboardFilterValue', null);
    }

    if(filter == "today"){
        //Get current start of day
        nowDate.setHours(0,0,0,0);
        //Get date in milleseconds
        var filterValue = nowDate.getTime()

        $setUser('activeCharityDashboardFilterValue', filterValue);
    }

    if(filter == "thisweek"){
        var filterValue = getMonday(new Date())
        filterValue.setHours(0,0,0,0);

        $setUser('activeCharityDashboardFilterValue', filterValue.getTime());
    }

    if(filter == "thismonth"){
        var firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
        var lastDay = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
        lastDay.setHours(23,59,59,59)

        var filterValue = firstDay.getTime()
        var filterValue_EndDate = lastDay.getTime()

        $setUser('activeCharityDashboardFilterValue', filterValue);
        $setUser('activeCharityDashboardFilterValue_EndDate', filterValue_EndDate);
    }

    if(filter == "thisyear"){
        var firstDay = new Date(nowDate.getFullYear(), 0, 1);
        var lastDay = new Date(nowDate.getFullYear(), 11, 31);
        lastDay.setHours(23,59,59,59)

        var filterValue = firstDay.getTime()
        var filterValue_EndDate = lastDay.getTime()

        $setUser('activeCharityDashboardFilterValue', filterValue);
        $setUser('activeCharityDashboardFilterValue_EndDate', filterValue_EndDate);
    }


    return null
}



function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1);

    return new Date(d.setDate(diff));
}