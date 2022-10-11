return function (nft) {

  fetch(nft)
      .then( res => { return res.json(); } )
      .then( data => { 
        let resolvedURL = this.DonorPortal_ResolveNFTURL(data.animation_url)
        console.log(resolvedURL)
        fetch(resolvedURL).then(res => res.blob()).then(file => {
          let tempUrl = URL.createObjectURL(file);
          let aTag = document.createElement("a");
          aTag.href = tempUrl;
          aTag.download = data.name;
          document.body.appendChild(aTag);
          aTag.click();
          aTag.remove();
        })
      
      } )
      .catch( err => { 
        console.error(err) 
        alert('Error downloading NFT, please try again or contact support.')
      } )

}
