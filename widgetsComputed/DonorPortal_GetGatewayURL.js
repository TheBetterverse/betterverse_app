return async function(){

    var url = 'ipfs://bafybeibccdeetnfvh4gcnzhxsyl2xrtbfgq7si52x4jggppl4xji4nyan4/8a.json'

    const ipfsGatewayTools = new IPFSGatewayTools()
    const gatewayURL = "https://assets.betterverse.app"

    const convertedGatewayUrl = await ipfsGatewayTools.convertToDesiredGateway(
        url,
        gatewayURL
    );

    console.log(convertedGatewayUrl)

    return convertedGatewayUrl
}