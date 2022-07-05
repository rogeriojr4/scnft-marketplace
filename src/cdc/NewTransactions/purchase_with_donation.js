export const purchaseWithDonationTx = `
import SCHNFT from 0x3135525943078f46
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetaFoodToken from 0x3135525943078f46
import MetaFoodMarketplace from 0x3135525943078f46

transaction(account: Address, id: UInt64, donatedId: UInt64, donateAddress: Address) {

  prepare(acct: AuthAccount) {
    let saleCollection = getAccount(account).getCapability(/public/MetaFoodSaleCollection)
                        .borrow<&MetaFoodMarketplace.SaleCollection{MetaFoodMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

    let recipientCollection = getAccount(acct.address).getCapability(/public/SCHNFTCollection) 
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")
    
    
    let donatedCollection = getAccount(donateAddress).getCapability(/public/SCHNFTCollection) 
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the Donator's collection.")

    let price1 = saleCollection.getPrice(id: id)
    let price2 = saleCollection.getPrice(id: donatedId)

    let payment1 <- acct.borrow<&MetaFoodToken.Vault>(from: /storage/MFVault)!.withdraw(amount: price1) as! @MetaFoodToken.Vault
    let payment2 <- acct.borrow<&MetaFoodToken.Vault>(from: /storage/MFVault)!.withdraw(amount: price2) as! @MetaFoodToken.Vault

    saleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment1)
    saleCollection.purchase(id: donatedId, recipientCollection: donatedCollection, payment: <- payment2)
  }

  execute {
    log("A user purchased an NFT and donated another one")
  }
}

`;
