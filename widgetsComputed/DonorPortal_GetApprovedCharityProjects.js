return function  (charityRowKey) {

    let rows = []

    rows = $getGrid('charityProjects').filter(row => row.charity == charityRowKey) 
    //console.log(charityRowKey)

    //console.log(rows)
    return rows
}