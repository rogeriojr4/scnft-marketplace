import NonFungibleToken from 0x631e88ae7f1d7c20
import SCHNFT from 0x3135525943078f46
import MetaFoodToken from 0x3135525943078f46

pub contract MetaFoodMarketplace {

  pub struct SaleItem {
    pub let price: UFix64
    
    pub let nftRef: &SCHNFT.NFT
    
    init(_price: UFix64, _nftRef: &SCHNFT.NFT) {
      self.price = _price
      self.nftRef = _nftRef
    }
  }

  pub resource interface SaleCollectionPublic {
    pub fun getIDs(): [UInt64]
    pub fun getPrice(id: UInt64): UFix64
    pub fun purchase(id: UInt64, recipientCollection: &SCHNFT.Collection{NonFungibleToken.CollectionPublic}, payment: @MetaFoodToken.Vault)
  }

  pub resource SaleCollection: SaleCollectionPublic {
    // maps the id of the NFT --> the price of that NFT
    pub var forSale: {UInt64: UFix64}
    pub let SCHNFTCollection: Capability<&SCHNFT.Collection>
    pub let MetaFoodVault: Capability<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>

    pub fun listForSale(id: UInt64, price: UFix64) {
      pre {
        price >= 0.0: "It doesn't make sense to list a token for less than 0.0"
        self.SCHNFTCollection.borrow()!.getIDs().contains(id): "This SaleCollection owner does not have this NFT"
      }

      self.forSale[id] = price
    }

    pub fun unlistFromSale(id: UInt64) {
      self.forSale.remove(key: id)
    }

    pub fun purchase(id: UInt64, recipientCollection: &SCHNFT.Collection{NonFungibleToken.CollectionPublic}, payment: @MetaFoodToken.Vault) {
      pre {
        payment.balance == self.forSale[id]: "The payment is not equal to the price of the NFT"
      }

      recipientCollection.deposit(token: <- self.SCHNFTCollection.borrow()!.withdraw(withdrawID: id))
      self.MetaFoodVault.borrow()!.deposit(from: <- payment)
      self.unlistFromSale(id: id)
    }

    pub fun getPrice(id: UInt64): UFix64 {
      return self.forSale[id]!
    }

    pub fun getIDs(): [UInt64] {
      return self.forSale.keys
    }

    init(_SCHNFTCollection: Capability<&SCHNFT.Collection>, _MetaFoodVault: Capability<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>) {
      self.forSale = {}
      self.SCHNFTCollection = _SCHNFTCollection
      self.MetaFoodVault = _MetaFoodVault
    }
  }

  pub fun createSaleCollection(SCHNFTCollection: Capability<&SCHNFT.Collection>, MetaFoodVault: Capability<&MetaFoodToken.Vault{MetaFoodToken.Receiver}>): @SaleCollection {
    return <- create SaleCollection(_SCHNFTCollection: SCHNFTCollection, _MetaFoodVault: MetaFoodVault)
  }

  init() {

  }
}