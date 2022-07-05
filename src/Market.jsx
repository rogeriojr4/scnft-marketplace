import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { getSaleNFTsScript } from "./cdc/scripts/get_sale_nfts";
import { unlistManyFromSaleTx } from "./cdc/NewTransactions/unlist_many_from_sale";
import arrangeNFTMarketPlace from "./helpers/arrangeNFTMarketPlaceCollection";

class Market extends Nullstack {
  nfts = {};
  loading = true;

  async hydrate({ addr }) {
    const result = await fcl
      .send([
        fcl.script(getSaleNFTsScript),
        fcl.args([fcl.arg(addr, t.Address)]),
      ])
      .then(fcl.decode);

    this.nfts = arrangeNFTMarketPlace(result);
    this.loading = false;
  }

  async unlistFromSale({ ids }) {
    this.loading = true;
    try {
      const transactionId = await fcl
        .send([
          fcl.transaction(unlistManyFromSaleTx),
          fcl.args([fcl.arg(parseInt(id), t.Array(t.UInt64))]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId);
      const response = await fcl.tx(transactionId).onceSealed();
      console.log(response);
      window.document.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return (
      <section class="p-3">
        {this.loading && (
          <div class="fixed top-0 left-0 z-10 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] text-9xl flex justify-center items-center">
            LOADING . . .
          </div>
        )}
        <div class="w-full flex gap-5">
          {Object.entries(this.nfts).map(([id, { nftRef, price, nftIds }]) => {
            // if (id < 10) return null;
            return (
              <div class="border border-green-700 rounded-md p-5" key={id}>
                <h1>#{nftRef.metadata.name}</h1>
                <img
                  class="w-[100px] h-[100px]"
                  src={`https://ipfs.infura.io/ipfs/${nftRef.ipfsHash}`}
                  alt="won't work"
                />
                <h1>Author: {nftRef.metadata.auth}</h1>
                <p>Description: {nftRef.metadata.description}</p>
                <h1>Price: {parseFloat(price).toFixed(3)}</h1>
                <p>Available to buy: {nftIds.length}</p>
                <button
                  onclick={() => this.unlistFromSale({ id: id })}
                  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove it from sale
                </button>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Market;
