export const purchaseTx = `
import SCHNFT from 0x234f923cf4d3d3e7
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetaFoodToken from 0x234f923cf4d3d3e7
import MetaFoodMarketplace from 0x234f923cf4d3d3e7

transaction(account: Address, id: UInt64) {

  prepare(acct: AuthAccount) {
    let saleCollection = getAccount(account).getCapability(/public/MetaFoodSaleCollection)
                        .borrow<&MetaFoodMarketplace.SaleCollection{MetaFoodMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

    let recipientCollection = getAccount(acct.address).getCapability(/public/SCHNFTCollection) 
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

    let price = saleCollection.getPrice(id: id)

    let payment <- acct.borrow<&MetaFoodToken.Vault>(from: /storage/MFVault)!.withdraw(amount: price) as! @MetaFoodToken.Vault

    saleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment)
  }

  execute {
    log("A user purchased an NFT")
  }
}

`;
