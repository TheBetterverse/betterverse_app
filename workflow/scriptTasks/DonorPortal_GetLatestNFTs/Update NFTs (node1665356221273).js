const nftRowKeys = await context.webhookdata.payload.nftRowKeys
const nftJSONs = await context.webhookdata.payload.nftJSONs

$log(nftRowKeys)
$log(nftJSONs)

for(i = 0; i < nftRowKeys.length; i++){
    createLog(callDash, '', nftJSONs[i], 'nFTs', nftRowKeys[i], 'json')
}

var updated = true

return updated