export const userFirstSetupTx = `
import SCHNFT from 0xe82c94d7f35b66c0
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetaFoodToken from 0xe82c94d7f35b66c0
import MetaFoodMarketplace from 0xe82c94d7f35b66c0

transaction {

  prepare(acct: AuthAccount) {

    // Create a new empty Vault object
		let vaultA <- MetaFoodToken.createEmptyVault()
			
		// Store the vault in the account storage
		acct.save<@MetaFoodToken.Vault>(<-vaultA, to: /storage/MFVault)

    log("Empty Vault stored")

    // Create a public Receiver capability to the Vault
		let ReceiverRef = acct.link<&MetaFoodToken.Vault{MetaFoodToken.Receiver, MetaFoodToken.Balance}>(/public/MFReceiver, target: /storage/MFVault)

    // Setup SCHNFT
    acct.save(<- SCHNFT.createEmptyCollection(), to: /storage/SCHNFTCollection)
    acct.link<&SCHNFT.Collection{SCHNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/SCHNFTCollection, target: /storage/SCHNFTCollection)
    acct.link<&SCHNFT.Collection>(/private/SCHNFTCollection, target: /storage/SCHNFTCollection)
    
    let SCHNFTCollection = acct.getCapability<&SCHNFT.Collection>(/private/SCHNFTCollection)
    let MetaFoodVault = acct.getCapability<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>(/public/MFReceiver)

    acct.save(<- MetaFoodMarketplace.createSaleCollection(SCHNFTCollection: SCHNFTCollection, MetaFoodVault: MetaFoodVault), to: /storage/MetaFoodSaleCollection)
    acct.link<&MetaFoodMarketplace.SaleCollection{MetaFoodMarketplace.SaleCollectionPublic}>(/public/MetaFoodSaleCollection, target: /storage/MetaFoodSaleCollection)
  }

  execute {
    log("A user created an MF vault and stored a Collection and a SaleCollection inside their account")
  }
}
`;