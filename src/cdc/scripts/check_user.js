export const checkUser = `
import SCHNFT from 0xe82c94d7f35b66c0

pub fun main(account: Address): {UInt64: MetaFoodMarketplace.SaleItem} {
  
  let collection = getAccount(account).getCapability(/public/SCHNFTCollection) 
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic, SCHNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let acc1 = getAccount(acc)

  let vaultRef = acc1.getCapability(/public/MFReceiver)
                    .borrow<&MetaFoodToken.Vault{MetaFoodToken.Balance}>()
                    ?? panic("Could not borrow a reference to the receiver")                  

  return returnVals
}
`