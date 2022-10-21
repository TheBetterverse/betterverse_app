return async function(url){

    const ipfsGatewayTools = new IPFSGatewayTools()
    const gatewayURL = "https://assets.betterverse.app"

    const convertedGatewayUrl = await ipfsGatewayTools.convertToDesiredGateway(
        url,
        gatewayURL
    );

    return convertedGatewayUrl
}