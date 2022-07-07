export const unlistManyFromSaleTx = `
import MetaFoodMarketplace from 0xe82c94d7f35b66c0

transaction(ids: [UInt64]) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&MetaFoodMarketplace.SaleCollection>(from: /storage/MetaFoodSaleCollection)
                            ?? panic("This SaleCollection does not exist")

    for id in ids {
      saleCollection.unlistFromSale(id: id)
    }

  }

  execute {
    log("A user unlisted some NFTs from Sale")
  }
}

`