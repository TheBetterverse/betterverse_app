/* DonorPortal_SelectedNFTName.js */

return async () => {
  const NFT = await this.DonorPortal_SelectedNFT()

  if (!NFT) return ''

  let full = NFT.name.split('#')

  return full.splice(0, full.length - 1).join()
}
