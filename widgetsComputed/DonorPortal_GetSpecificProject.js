/* DonorPortal_GetSpecificProject.js */

memoize = {}

return function () {
  try {
    let project = $getUser('Donation_SelectedProject')

    if (!(project in memoize)) {
      memoize[project] = $dataGrid('charityProjects')[project]
      //console.log(memoize[project])
    }

    return memoize[project]
  } catch (err) {
    console.error(err)
    console.log('ERROR IN DonorPortal_GetSpecificProject')
  }
}
