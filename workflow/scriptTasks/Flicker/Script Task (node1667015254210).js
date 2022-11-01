$log('NFT ROWS ROWKEY:')
$log('NFT ROWS JSON:')

const nftRowKey = await $addRow('nFTs', {
    name: 'test ' + 1
})
await $addRow('capturedDonationData', { name: 'test 1' })

createLog(callDash, null, 33, 'nFTs', nftRowKey, 'tokenID')

context.data = { result: true }

