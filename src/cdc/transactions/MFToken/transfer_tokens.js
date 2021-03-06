export const transferMFTx = `
// Transfer Tokens

import MetaFoodToken from 0x3135525943078f46

// This transaction is a template for a transaction that
// could be used by anyone to send tokens to another account
// that owns a Vault
transaction(amount: UFix64, recipientAcc: Address) {

  // Temporary Vault object that holds the balance that is being transferred
  var temporaryVault: @MetaFoodToken.Vault

  prepare(acct: AuthAccount) {
    // withdraw tokens from your vault by borrowing a reference to it
    // and calling the withdraw function with that reference
    let vaultRef = acct.borrow<&MetaFoodToken.Vault>(from: /storage/MFVault)
        ?? panic("Could not borrow a reference to the owner's vault")
      
    self.temporaryVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    // get the recipient's public account object
    let recipient = getAccount(recipientAcc)

    // get the recipient's Receiver reference to their Vault
    // by borrowing the reference from the public capability
    let receiverRef = recipient.getCapability(/public/MFReceiver)
                      .borrow<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>()
                      ?? panic("Could not borrow a reference to the receiver")

    // deposit your tokens to their Vault
    receiverRef.deposit(from: <-self.temporaryVault)

    log("Transfer succeeded!")
  }
}
 
`