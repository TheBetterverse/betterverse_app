/* DonorPortal_UploadProfilePicture.js */

return async (data, userRowKey) => {
  if (!data) return

  const fileName = await new Promise(resolve => {
    this.$storageService.upload(this.currentDash, data, uploaded => {
      const value = Object.entries(uploaded)[0].join('_')

      resolve(value)
    })
  })

  const fileUrl = await new Promise(resolve => {
    this.$storageService.getFileUrl(this.currentDash, fileName, (err, url) => {
      if (err) throw err

      resolve(url)
    })
  })

  if (!userRowKey) userRowKey = this.DonorPortal_GetCurrentUserRowKey()

  $setDataGridVal('users', userRowKey + '.profileImage', {
    fileName,
    url: fileUrl
  })
}
