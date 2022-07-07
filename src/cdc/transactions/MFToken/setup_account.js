export const setupMFAccountTx = `
// Setup Account

import MetaFoodToken from 0xe82c94d7f35b66c0

// This transaction configures an account to store and receive tokens defined by
// the MetaFoodToken contract.
transaction {
	prepare(acct: AuthAccount) {
		// Create a new empty Vault object
		let vaultA <- MetaFoodToken.createEmptyVault()
			
		// Store the vault in the account storage
		acct.save<@MetaFoodToken.Vault>(<-vaultA, to: /storage/MFVault)

    log("Empty Vault stored")

    // Create a public Receiver capability to the Vault
		let ReceiverRef = acct.link<&MetaFoodToken.Vault{MetaFoodToken.Receiver, MetaFoodToken.Balance}>(/public/MFReceiver, target: /storage/MFVault)

    log("References created")
	}
}
 
`;
