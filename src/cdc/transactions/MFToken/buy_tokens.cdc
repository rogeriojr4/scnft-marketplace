import FlowToken from 0x7e60df042a9c0868
import MetaFoodToken from 0x3135525943078f46

transaction(amount: UFix64) {

  prepare(acct: AuthAccount) {

    let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: amount) as! @FlowToken.Vault

    // Need to create a purchase method in the MetaFoodToken
  }

  execute {
    log("A user purchased an NFT")
  }
}