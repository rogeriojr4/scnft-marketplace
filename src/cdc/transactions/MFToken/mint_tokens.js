export const mintMFTx = `
import MetaFoodToken from 0x3135525943078f46

transaction(amount: UFix64, recipientAddr: Address) {

    let mintingRef: &MetaFoodToken.VaultMinter

    var receiver: Capability<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>

	prepare(acct: AuthAccount) {
        self.mintingRef = acct.borrow<&MetaFoodToken.VaultMinter>(from: /storage/MFMinter)
            ?? panic("Could not borrow a reference to the minter")
        
            let recipient = getAccount(recipientAddr)

        self.receiver = recipient.getCapability<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>
(/public/MFReceiver)

	}

    execute {
        self.mintingRef.mintTokens(amount: amount, recipient: self.receiver)

        log("tokens minted and deposited")
    }
}
`;
