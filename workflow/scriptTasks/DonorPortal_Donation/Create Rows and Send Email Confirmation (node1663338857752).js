const {userId} = context.webhookdata
const email = await getUserEmailByUID(userId)
context.data = email

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mainnet.g.alchemy.com/v2/wWp7N5zX6mucrbV-RnKoDNDdD5n7cBOc'));

//Tree contract ABI
const treeContractData = {
    TreeContractAddress: '0xA9cdB8fFdF37b8AE44c36519Cfc1Fe6d29CDF0F9',
    TreeContractABI: [
        {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
            },
            {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "token",
            "type": "uint256"
            },
            {
            "indexed": false,
            "internalType": "uint256",
            "name": "bags",
            "type": "uint256"
            }
        ],
        "name": "fertiliserAdded",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "token",
            "type": "uint256"
            },
            {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
            }
        ],
        "name": "minted",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            },
            {
            "indexed": false,
            "internalType": "uint8",
            "name": "rarityCat",
            "type": "uint8"
            }
        ],
        "name": "randomReturned",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
            },
            {
            "indexed": true,
            "internalType": "bool",
            "name": "role",
            "type": "bool"
            }
        ],
        "name": "roleChanged",
        "type": "event"
        },
        {
        "anonymous": false,
        "inputs": [
            {
            "indexed": true,
            "internalType": "uint256",
            "name": "token",
            "type": "uint256"
            },
            {
            "indexed": false,
            "internalType": "uint256",
            "name": "newValue",
            "type": "uint256"
            }
        ],
        "name": "valueAdded",
        "type": "event"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "name": "_batchCID",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "batchID",
            "type": "uint256"
            },
            {
            "internalType": "uint256[]",
            "name": "jsonId",
            "type": "uint256[]"
            }
        ],
        "name": "addTree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            },
            {
            "internalType": "uint16",
            "name": "_causeId",
            "type": "uint16"
            }
        ],
        "name": "addValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint8",
            "name": "count",
            "type": "uint8"
            },
            {
            "internalType": "address[]",
            "name": "user",
            "type": "address[]"
            },
            {
            "internalType": "uint16",
            "name": "cause",
            "type": "uint16"
            },
            {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
            },
            {
            "internalType": "uint8[]",
            "name": "rarity",
            "type": "uint8[]"
            }
        ],
        "name": "adminMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "to",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "owner",
            "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "name": "batchCat",
        "outputs": [
            {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            },
            {
            "internalType": "uint8",
            "name": "_reqGrowth",
            "type": "uint8"
            }
        ],
        "name": "burn",
        "outputs": [
            {
            "internalType": "bool",
            "name": "",
            "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "string",
            "name": "cid",
            "type": "string"
            },
            {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
            }
        ],
        "name": "changeDefaultTokenURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "bool",
            "name": "role",
            "type": "bool"
            },
            {
            "internalType": "address",
            "name": "account",
            "type": "address"
            }
        ],
        "name": "changeRoles",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "checkAdminTrees",
        "outputs": [
            {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
            },
            {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
            },
            {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
            },
            {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            }
        ],
        "name": "dataReturn",
        "outputs": [
            {
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
            },
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            },
            {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
            },
            {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            }
        ],
        "name": "fertilise",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "owner",
            "type": "address"
            },
            {
            "internalType": "address",
            "name": "operator",
            "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
            "internalType": "bool",
            "name": "",
            "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint8",
            "name": "_numberToMint",
            "type": "uint8"
            },
            {
            "internalType": "uint16",
            "name": "_cause",
            "type": "uint16"
            },
            {
            "internalType": "uint256",
            "name": "_treeValue",
            "type": "uint256"
            },
            {
            "internalType": "address",
            "name": "_user",
            "type": "address"
            }
        ],
        "name": "mint",
        "outputs": [
            {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "minter",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "pollinator",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "from",
            "type": "address"
            },
            {
            "internalType": "address",
            "name": "to",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "from",
            "type": "address"
            },
            {
            "internalType": "address",
            "name": "to",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            },
            {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "operator",
            "type": "address"
            },
            {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "string",
            "name": "_newBatchCID",
            "type": "string"
            },
            {
            "internalType": "uint8",
            "name": "rarityCat",
            "type": "uint8"
            }
        ],
        "name": "setBatchCID",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            },
            {
            "internalType": "uint8",
            "name": "rarity",
            "type": "uint8"
            },
            {
            "internalType": "uint256",
            "name": "random",
            "type": "uint256"
            }
        ],
        "name": "setTree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
            "internalType": "bool",
            "name": "",
            "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "name": "tokenInfo",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "treeID",
            "type": "uint256"
            },
            {
            "internalType": "uint16",
            "name": "causeID",
            "type": "uint16"
            },
            {
            "internalType": "uint256",
            "name": "treeValue",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "planted",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "fertiliser",
            "type": "uint256"
            },
            {
            "internalType": "bool",
            "name": "burned",
            "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "owner",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "from",
            "type": "address"
            },
            {
            "internalType": "address",
            "name": "to",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "treesInStorage",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "vrf",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        }
    ]
}

const gatewayURL = "https://assets.betterverse.app"
const tokenID = await context.webhookdata.payload.tokenID
const wallet = await context.webhookdata.payload.wallet
const user = await JSON.parse(context.webhookdata.payload.user)
const charity = await context.webhookdata.payload.charity
const cause = await JSON.parse(context.webhookdata.payload.cause)
const carbonSequestration = await context.webhookdata.payload.carbonSequestration
const numberOfTrees = await context.webhookdata.payload.numberOfTrees
const paymentMethod = await context.webhookdata.payload.paymentMethod
const currency = await context.webhookdata.payload.currency
const location = await context.webhookdata.payload.location
const donationAmount = await context.webhookdata.payload.donationAmount
const donationAmountGBP = await context.webhookdata.payload.donationAmountGBP
const donationAmountEUR = await context.webhookdata.payload.donationAmountEUR
//const gas = await context.webhookdata.payload.gas
const date = await context.webhookdata.payload.date
const nftCount = await context.webhookdata.payload.nftCount
const json = await context.webhookdata.payload.json
const nftType = await context.webhookdata.payload.nftType
const charityName = await context.webhookdata.payload.charityName
var nftRows = []
var newDonationRows = []

var emailTemplate =
`
<div>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #EFEDE7; height: 500px;">
    <tr height="100px;">
      <td align="center">
        <img src="https://uploads-ssl.webflow.com/62554ccc10f0e2be91a8c9fc/633c46678133f7deb08265bc_betterverse-logo.png" style="height: 50px;" />
    </tr>
    <tr height="300px;">
      <td align="center">
        <div style="font-family: 'Courier New', monospace; height: 100%; font-size: 14px; position: relative; background-color: #ECEAE3; line-height: 21px; border-bottom: 1px solid #E3E1DB; border-top: 1px solid #E3E1DB; vertical-align:middle; ">
          <div style="margin: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50%; margin-top: 100px; margin-bottom: 100px;">
            <h3 style="color: black;">Your donation to <u>${charityName}</u> has planted <u>${numberOfTrees} trees</u>.</h3>
                <p>
                <div style="color: black;"> Your virtual tree is being generated. </div>
                </p>
                <button style="border-radius: 20px; padding: 0px 15px; gap: 10px; width: 110px; height: 28px; background: #000000;">
                  <a href="https://give.betterverse.app" target="_blank" style="color: #ECEAE3; text-decoration: none;">
                    <b style="font-family: 'Courier New', monospace; ">Dashboard</b>
                  </a>
                </button>
          </div>
        </div>
    </tr>
    <tr height="100px;">
      <div style="text-align: center;  font-size: 10px; font-family: 'Courier New', monospace;">
        <div style="font-size: 10px;">
          <p>
          <div style="color: black;"> Brought to you with ❤️ from the Betterverse team. <br> © 2022 Betterverse Ltd, all rights reserved. </div>
          <br>
          <div>
            <b style="color: black;">
              <a href="https://www.betteverse.app/team/#contact" target="_blank" style="color: black;">Contact Us</a> • <a href="https://www.betterverse.app/legal" target="_blank" style="color: black;">Terms of Use</a> • <a href="https://www.betterverse.app/legal" target="_blank" style="color: black;">Privacy Policy</a>
            </b>
          </div>
          </p>
        </div>
      </div>
    </tr>
  </table>
</div>
`

$log('TokenID length: ' + tokenID.length)

if (tokenID.length == 1) {
    $log('Creating single nft and donation row')
    
    /*Pinata Conversion
    const splitUrl = json[0].split(/\/|\?/);
    const cid = splitUrl[2]
    const file = splitUrl[3]
    var convertedURL = `${gatewayURL}/ipfs/${cid}/${file}`
    */

    //Create donation row
    let newDonationRow = await $addRow('capturedDonationData', {
        tokenID: tokenID[0],
        walletAddress: wallet,
        user: user.user,
        charity: charity,
        charityProject: cause.rowKey,
        paymentMethod: paymentMethod,
        currency: currency,
        donationLocation: location,
        donationAmount: donationAmount,
        //gas: gas,
        donationDate: date,
        numberOfTreesPlanted: numberOfTrees,
        yearlyCarbonSequestration: carbonSequestration,
        donationAmountGBP: donationAmountGBP,
        donationAmountEUR: donationAmountEUR
    })

    //Create NFT row
    let newNFTRow = await $addRow('nFTs', {
        tokenID: tokenID[0],
        walletAddress: wallet,
        owner: user.user,
        initialDonationRow: newDonationRow,
        json: json[0],
        nftType: nftType
    })
    
    nftRows.push(newNFTRow)
    
} else if (tokenID.length >= 2 && tokenID.length <= 10) {

    for (let i = 0; i < tokenID.length; i++) {
        $log("Writing donation entry for " + tokenID[i])
        let newDonationRow = await $addRow('capturedDonationData', {
            tokenID: tokenID[i],
            walletAddress: wallet,
            user: user.user,
            charity: charity,
            charityProject: cause.rowKey,
            paymentMethod: paymentMethod,
            currency: currency,
            donationLocation: location,
            donationAmount: donationAmount,
            //gas: gas,
            donationDate: date,
            numberOfTreesPlanted: numberOfTrees,
            yearlyCarbonSequestration: carbonSequestration,
            donationAmountGBP: donationAmountGBP,
            donationAmountEUR: donationAmountEUR
        })
        $log("Writing NFT entry for " + tokenID[i])
        let newNFTRow = await $addRow('nFTs', {
            tokenID: tokenID[i],
            walletAddress: wallet,
            owner: user.user,
            initialDonationRow: newDonationRow,
            json: json[i],
            nftType: nftType
        })
        nftRows.push(newNFTRow)

    }
}

$log('NFT ROWS ROWKEY:')
$log(nftRows[0])
$log('NFT ROWS JSON:')
$log(json[0])


try{
    const TreeContract = new web3.eth.Contract(treeContractData.TreeContractABI, treeContractData.TreeContractAddress);

    for (let i = 0; i < nftRows.length; i++) {
        var calledJson = await TreeContract.methods.tokenURI(tokenID[i]).call()
        while (calledJson === json[i]) {
            calledJson = await TreeContract.methods.tokenURI(tokenID[i]).call()
            await new Promise(r => setTimeout(r, 3000))
            $log(`Old json: ${json[i]} current json is ${calledJson}`)
            $log('Continuing to pull')
        }

        //PINATA HERE
        const splitUrl = calledJson.split(/\/|\?/);
        const cid = splitUrl[2]
        const file = splitUrl[3]
        var convertedURL = `${gatewayURL}/ipfs/${cid}/${file}`
    
        await createLog(callDash, '', convertedURL, 'nFTs', nftRows[i], 'json')
    }
}
catch(err){
    $log(err)
}

var msg = {
    to: email,
    from: 'noreply@betterverse.app',
    subject: 'Betterverse | Donation Confirmation',
    //text: 'Hi,!',
    html: emailTemplate
}

//Send email
const result = await new Promise((resolve) => {
    sendEmail(msg).then(() => {
        resolve(true)
    }).catch(err => {
        console.log(err)
        resolve(false)
    })
})

context.data = {result, msg}

