export const getSaleNFTsScript = `
import SCHNFT from 0x3135525943078f46
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetaFoodMarketplace from 0x3135525943078f46

pub fun main(account: Address): {UInt64: MetaFoodMarketplace.SaleItem} {
  let saleCollection = getAccount(account).getCapability(/public/MetaFoodSaleCollection)
                        .borrow<&MetaFoodMarketplace.SaleCollection{MetaFoodMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

  let collection = getAccount(account).getCapability(/public/SCHNFTCollection) 
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic, SCHNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let saleIDs = saleCollection.getIDs()

  let returnVals: {UInt64: MetaFoodMarketplace.SaleItem} = {}

  for saleID in saleIDs {
    let price = saleCollection.getPrice(id: saleID)
    let nftRef = collection.borrowEntireNFT(id: saleID)

    returnVals.insert(key: saleID, MetaFoodMarketplace.SaleItem(_price: price, _nftRef: nftRef))
  }

  return returnVals
}
`;
