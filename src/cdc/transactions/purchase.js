export const purchaseTx = `
import SCHNFT from 0xe82c94d7f35b66c0
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetaFoodToken from 0xe82c94d7f35b66c0
import MetaFoodMarketplace from 0xe82c94d7f35b66c0

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
