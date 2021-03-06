export const mintNFT = `
import SCHNFT from 0x3135525943078f46

transaction(ipfsHash: String, name: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&SCHNFT.Collection>(from: /storage/SCHNFTCollection)
                        ?? panic("This collection does not exist here")

    let nft <- SCHNFT.createToken(ipfsHash: ipfsHash, metadata: {"name": name})

    collection.deposit(token: <- nft)
  }

  execute {
    log("A user minted an NFT into their account")
  }
}
`