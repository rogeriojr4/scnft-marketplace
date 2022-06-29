export const getMFBalanceScript = `
import MetaFoodToken from 0x3135525943078f46

pub fun main(acc: Address):UFix64 {

    let acc1 = getAccount(acc)
		
		let vaultRef = acc1.getCapability(/public/MFReceiver)
                      .borrow<&MetaFoodToken.Vault{MetaFoodToken.Balance}>()
                      ?? panic("Could not borrow a reference to the receiver")


  return vaultRef.balance
}

`;
