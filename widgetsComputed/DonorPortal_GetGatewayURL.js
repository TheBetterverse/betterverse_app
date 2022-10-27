return async function(sourceUrl){

    //const ipfsGatewayTools = new IPFSGatewayTools()
    /*const convertedGatewayUrl = await ipfsGatewayTools.convertToDesiredGateway(
        url,
        gatewayURL
    );*/
    
    const gatewayURL = "https://assets.betterverse.app"

    const splitUrl = sourceUrl.split(/\/|\?/);
    const cid = splitUrl[2]
    const file = splitUrl[3]

    if (sourceUrl.includes(`ipfs://${cid}`)) {
       var convertedURL = `${gatewayURL}/ipfs/${cid}/${file}`;
    }

    return convertedURL
}