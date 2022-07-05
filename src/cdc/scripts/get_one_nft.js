// export const getOneNFTScript = `
// import SCHNFT from 0x3135525943078f46
// import NonFungibleToken from 0x631e88ae7f1d7c20

// pub fun main(account: Address, id: UInt64): &SCHNFT.NFT {
//   let collection = getAccount(account).getCapability(/public/SCHNFTCollection)
//                     .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic, SCHNFT.CollectionPublic}>()
//                     ?? panic("Can't get the User's collection.")

//   return collection.borrowEntireNFT(id: id)

// }
// `;

export const getOneNFTScript = `
import SCHNFT from 0x3135525943078f46
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetaFoodMarketplace from 0x3135525943078f46

pub fun main(account: Address, saleID: UInt64): [MetaFoodMarketplace.SaleItem] {
  let saleCollection = getAccount(account).getCapability(/public/MetaFoodSaleCollection)
                        .borrow<&MetaFoodMarketplace.SaleCollection{MetaFoodMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

  let collection = getAccount(account).getCapability(/public/SCHNFTCollection) 
                    .borrow<&SCHNFT.Collection{NonFungibleToken.CollectionPublic, SCHNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  
  
  
  let nftRef = collection.borrowEntireNFT(id: saleID)

  if nftRef.metadata["donateToId"] != nil {
    let price = saleCollection.getOptionalPrice(id: saleID) ?? 0.0
    let donationRef = collection.borrowEntireNFT(id: saleID - 1)
    return [MetaFoodMarketplace.SaleItem(_price: price, _nftRef: nftRef), MetaFoodMarketplace.SaleItem(_price: 0.0, _nftRef: donationRef)]
  } else {
    let price = saleCollection.getOptionalPrice(id: saleID + 1) ?? 0.0
    let donationRef = collection.borrowEntireNFT(id: saleID + 1)
    return [MetaFoodMarketplace.SaleItem(_price: 0.0, _nftRef: donationRef), MetaFoodMarketplace.SaleItem(_price: price, _nftRef: nftRef)]
  }
}
`;
