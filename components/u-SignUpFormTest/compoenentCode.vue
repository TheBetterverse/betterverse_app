<template>
  <div>
    Hello world
  </div>
</template>

<script>
module.exports = {
  created() {
    console.log($computed("DonorPortal_SelectedDonation"))
  }
}
</script>