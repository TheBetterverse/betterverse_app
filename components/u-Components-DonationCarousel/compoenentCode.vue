<template>

<div>
  <u-Components-InfiniteSlider :nfts=this.nfts />
  <u-Components-InfiniteSlider :nfts=this.nfts />
</div>
</template>

<script type="module">
module.exports = {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  components: {
    uComponentsInfiniteslider : $getCustomComponent('u-Components-InfiniteSlider')
  },

  methods: {
    sortDesc(a, b){
      return b.donationAmount - a.donationAmount;
    },

    getNFTs() {
    
      //Get current user
      const users = $getGrid('users')
      let currentUser = _.find(users, { user: fbUser.uid })

      //Get all users where profile picture exists
      allUsersWithProfilePicture = users.filter(
        row =>
          row.profileImage
      )

      //Get nfts filtered
      allNFTsWithUserPicture = $getGrid('nFTs').filter(
        row =>
          _.find(allUsersWithProfilePicture, { user: row.owner }) &&
          row.owner !== currentUser.user &&
          row.json !== "https://bafybeigjtusph7djrp7sxqyxj45zbc72eg5lxaiw3mehnbv455nbexaqwq.ipfs.nftstorage.link/2376a.json" &&
          row.json !== "https://assets.betterverse.app/ipfs/QmQN53p4CvaknM1v7fbViWLrVf6BuJ8CEBhBeCuwXB1XgS/1a.json"
      )

      console.log('filtered nfts')
      console.log(allNFTsWithUserPicture)

      //Get nft donation rows
      var nftDonationRows = []
      for(i = 0; i < allNFTsWithUserPicture.length; i++){
        let nftDonationRow = $dataGrid('capturedDonationData')[allNFTsWithUserPicture[i].initialDonationRow]
        nftDonationRows.push(nftDonationRow)
      }

      console.log('filtered donations')
      console.log(nftDonationRows)

      nftDonationRows.sort(this.sortDesc)

      console.log('sorted donations')
      console.log(nftDonationRows)

      //Organise by donations amount (descending)
      //Take top 36
      //Split array into 2

      this.nfts = allNFTsWithUserPicture
      return allNFTsWithUserPicture
    }
  },

  data() {
    return {
      imageResult: undefined,
      animationUrl: undefined,
      cardId: '',
      animationId: '',
      imageId: '',
      nfts: []
    }
  },

  async created() {
    this.getNFTs()
  },
}
</script>

<style>

</style>
