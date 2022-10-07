/* DonorPortal_SelectedNFTName.js */

return async () => {
  const NFT = await this.DonorPortal_SelectedNFT()

  if (!NFT) return ''

  let full = (await this.DonorPortal_SelectedNFT()).name.split(' ')

  return full.splice(full.length - 1).join()
}
