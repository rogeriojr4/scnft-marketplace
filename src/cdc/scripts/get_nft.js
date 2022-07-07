export const getNFTsScript = `
import SCHNFT from 0xe82c94d7f35b66c0
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&SCHNFT.NFT] {
  let collection = getAccount(account).getCapability(/public/SCHNFTCollection)
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic, SCHNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let returnVals: [&SCHNFT.NFT] = []

  let ids = collection.getIDs()
  for id in ids {
    returnVals.append(collection.borrowEntireNFT(id: id))
  }

  return returnVals
}
`;
