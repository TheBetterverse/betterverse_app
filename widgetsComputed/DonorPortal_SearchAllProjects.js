let rows = []
let searchValue = $getUser('searchValue')

// rows = alasql(`select * from ? as charityProjects where charityProjects.projectName like ‘%${searchValue}%’ or charityProjects.[$charity$display] like '%${searchValue}%'`, [$getGrid('charityProjects')])

//Get todays date in MS
//var nowDate = new Date();
//var today = nowDate.getTime()

//rows = $getGrid('charityProjects').filter(row => row.$projectAccess$display == "Public" && (row.endDate > today || row.noEndDate == true) && row.charity != null && row.currency != null && row.pricePerTree != null && row.yearlyCO2Sequestration != null) 

//Filter by location$display, charityName$display and projectName
//rows = alasql(`select * from ? as charityProjects where charityProjects.projectName like '%${searchValue}%'`, [$getGrid('charityProjects')])

try {
    //return alasql(`select * from ? as charityProjects where charityProjects.projectName like '%${searchValue || ''}%' OR charityProjects.\`$charity$display\` like '%${searchValue || ''}%'`, [$getGrid('charityProjects')])
    return alasql(`select * from ? as charityProjects where (charityProjects.projectName like '%${searchValue || ''}%' OR charityProjects.\`$charity$display\` like '%${searchValue || ''}%' OR charityProjects.\`$locations$display\` like '%${searchValue || ''}%') AND charityProjects.\`$projectAccess$display\` ==  "Public"` , [$getGrid('charityProjects')])
} catch (err) {
    console.error(err)
    
    return []
}
