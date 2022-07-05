export const mintNFTsTx = `import SCHNFT from 0x3135525943078f46
transaction(series: String,numberOfNFTs: Int,ipfsHashA: String, nameA: String, authA: String, descriptionA: String, ipfsHashB: String, nameB: String, authB: String, descriptionB: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&SCHNFT.Collection>(from: /storage/SCHNFTCollection)
                        ?? panic("This collection does not exist here")

    var count = 0

    while count < numberOfNFTs {

      let edition = count + 1

      // This is the NFT that will be donated
      let nftB <- SCHNFT.createToken(ipfsHash: ipfsHashB, metadata: {"name": nameB, "auth": authB, "description": descriptionB, "series": series, "edition": edition.toString()})
  
      // This is the NFT that will be bought, it has the ID of the donated NFT
      let nftA <- SCHNFT.createToken(ipfsHash: ipfsHashA, metadata: {"name": nameA, "auth": authA, "description": descriptionA, "donateToId": nftB.id.toString(), "series": series, "edition": edition.toString()})
      
      collection.deposit(token: <- nftB)
      collection.deposit(token: <- nftA)
      count = count + 1 
    }


  }

  execute {
    log("A user minted an NFT into their account")
  }
}`;
