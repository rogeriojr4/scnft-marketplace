export const listForSaleTx = `
import MetaFoodMarketplace from 0x3135525943078f46

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