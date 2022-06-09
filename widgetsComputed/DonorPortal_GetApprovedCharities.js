return function  () {

//.filter(row => row.charityAccess.$display == "Public")

    let rows = []

    rows = $getGrid('charities') 

    return rows
}