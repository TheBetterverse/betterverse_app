return function(imageURL){

    const splitImageURL = imageURL.split('ipfs://').pop();
    const newImageURL = 'https://ipfs.io/ipfs/' + splitImageURL
    
    return newImageURL
}