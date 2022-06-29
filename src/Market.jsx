import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { getSaleNFTsScript } from "./cdc/scripts/get_sale_nfts";
import { unlistFromSaleTx } from "./cdc/transactions/unlist_from_sale";
import { purchaseTx } from "./cdc/transactions/purchase";

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

    this.nfts = result;
    this.loading = false;
  }

  async unlistFromSale({ id }) {
    const transactionId = await fcl
      .send([
        fcl.transaction(unlistFromSaleTx),
        fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
  }

  async purchase({ id, user, addr }) {
    if (!user.addr) {
      console.log("Could not find a logged user");
      return;
    }
    const transactionId = await fcl
      .send([
        fcl.transaction(purchaseTx),
        fcl.args([
          fcl.arg(addr, t.Address),
          fcl.arg(parseInt(id), t.UInt64),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
  }

  render({ deflt }) {
    if (this.loading) return <></>;
    return (
      <section class="p-3 bg-emerald-300">
        <h1 class="text-lg font-bold">NFTs for Sale</h1>
        <div class="w-full flex gap-5">
          {Object.entries(this.nfts).map(([id, { nftRef, price }]) => {
            return (
              <div class="border border-green-700 rounded-md p-5" key={id}>
                <h1>#{id}</h1>
                <img
                  class="w-[100px] h-[100px]"
                  src={`https://dweb.link/ipfs/${nftRef.ipfsHash}/image.png`}
                  alt="won't work"
                />
                <h1>Author: {nftRef.metadata.name}</h1>
                <h1>Price: {price}</h1>
                {deflt ? (
                  <button
                    onclick={() => this.purchase({ id: id })}
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Buy Now!
                  </button>
                ) : (
                  <button
                    onclick={() => this.unlistFromSale({ id: id })}
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove it from sale
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Market;
