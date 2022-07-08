export const buyTokensTx = `import FlowToken from 0x7e60df042a9c0868
import MetaFoodToken from 0x234f923cf4d3d3e7

transaction(amount: UFix64) {

  prepare(acct: AuthAccount) {

    let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: amount) as! @FlowToken.Vault

    // Need to create a purchase method in the MetaFoodToken
    let result = MetaFoodToken.buyTokens(payment: <- payment, addr: acct.address)
    log(result)
  }

  execute {
    log("A user purchased an NFT")
  }
}`;
