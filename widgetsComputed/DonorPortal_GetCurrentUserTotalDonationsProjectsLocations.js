const myDonationRows = $getGrid('capturedDonationData')
    .filter(row => row.user == fbUser.uid)

const uniqueLocations = []

for (let row of myDonationRows) {
    if (uniqueLocations.includes(row.$charityProject.locations)) continue

    uniqueLocations.push(row.$charityProject.locations)
}

return uniqueLocations.length