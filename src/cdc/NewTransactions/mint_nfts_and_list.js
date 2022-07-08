export const mintNFTsTx = `import SCHNFT from 0x234f923cf4d3d3e7
import MetaFoodMarketplace from 0x234f923cf4d3d3e7
transaction(series: String, price:UFix64, numberOfNFTs: Int,ipfsHashA: String, nameA: String, authA: String, descriptionA: String, ipfsHashB: String, nameB: String, authB: String, descriptionB: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&SCHNFT.Collection>(from: /storage/SCHNFTCollection)
                        ?? panic("This collection does not exist here")

    var count = 0
    var idsA: [UInt64] = []
    var idsB: [UInt64] = []

    while count < numberOfNFTs {

      let edition = count + 1

      // This is the NFT that will be donated
      let nftB <- SCHNFT.createToken(ipfsHash: ipfsHashB, metadata: {"name": nameB, "auth": authB, "description": descriptionB, "series": series, "edition": edition.toString(), "maximumNumber": numberOfNFTs.toString()})
  
      // This is the NFT that will be bought, it has the ID of the donated NFT
      let nftA <- SCHNFT.createToken(ipfsHash: ipfsHashA, metadata: {"name": nameA, "auth": authA, "description": descriptionA, "donateToId": nftB.id.toString(), "series": series, "edition": edition.toString(), "maximumNumber": numberOfNFTs.toString()})
      
      idsA.append(nftA.id)
      idsB.append(nftB.id)

      collection.deposit(token: <- nftB)
      collection.deposit(token: <- nftA)
      
      count = count + 1 
    }

    let saleCollection = acct.borrow<&MetaFoodMarketplace.SaleCollection>(from: /storage/MetaFoodSaleCollection)
                            ?? panic("This SaleCollection does not exist")

    for id in idsA {
      saleCollection.listForSale(id: id, price: price)
    }

    for id in idsB {
      saleCollection.listForSale(id: id, price: 0.0)
    }


  }

  execute {
    log("A user minted an NFT into their account")
  }
}`;
