(async () => {

    var projectParam = await $vm.$route.query.project

    let sharedPagesGrid = $getGrid('sharedPages')

    let sharedPage = _.find(sharedPagesGrid, { urlExtension: projectParam } )

    await $setUser('Donation_SelectedProject', sharedPage.project)

})();   