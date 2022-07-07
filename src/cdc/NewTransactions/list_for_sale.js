export const listForSaleTx = `
import MetaFoodMarketplace from 0xe82c94d7f35b66c0

transaction(ids: [UInt64], price: UFix64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&MetaFoodMarketplace.SaleCollection>(from: /storage/MetaFoodSaleCollection)
                            ?? panic("This SaleCollection does not exist")

    for id in ids {
      saleCollection.listForSale(id: id, price: price)
    }

  }

  execute {
    log("A user listed some NFTs for Sale")
  }
}
`