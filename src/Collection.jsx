import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getNFTsScript } from "./cdc/scripts/get_nft";
import { listForSaleTx } from "./cdc/transactions/list_for_sale";

// 0x3135525943078f46

class Collection extends Nullstack {
  nfts = [];
  loading = false;

  async hydrate() {
    await this.getUserNFTs();
  }

  async getUserNFTs({ addr }) {
    const result = await fcl
      .send([fcl.script(getNFTsScript), fcl.args([fcl.arg(addr, t.Address)])])
      .then(fcl.decode);
    this.nfts = result.reverse();
  }

  async listForSale({ id }) {
    this.loading = true;
    try {
      console.log(`Putting ${id} for sale`);
      const price = prompt("Enter the price");
      const transactionId = await fcl
        .send([
          fcl.transaction(listForSaleTx),
          fcl.args([fcl.arg(parseInt(id), t.UInt64), fcl.arg(price, t.UFix64)]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId);
      const response = await fcl.tx(transactionId).onceSealed();
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  render({ addr, settings }) {
    return (
      <div class="w-full flex gap-5 flex-wrap">
        {this.loading && (
          <div class="fixed top-0 left-0 z-10 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] text-9xl flex justify-center items-center">
            LOADING . . .
          </div>
        )}
        {this.nfts.map((nft) => {
          console.log(nft.ipfsHash);
          if (nft.id < 10) return null;
          return (
            <div class="border border-white rounded-md p-5" key={nft.id}>
              <h1>#{nft.id}</h1>
              <img
                class="w-[100px] h-[100px]"
                src={`https://ipfs.infura.io/ipfs/${nft.ipfsHash}`}
                alt="won't work"
              />
              <h1>Name: {nft.metadata.name}</h1>
              {addr === settings.adminAddress && (
                <button
                  onclick={() => this.listForSale({ id: nft.id })}
                  class="bg-contrast hover:underline text-white font-bold py-2 px-4 rounded"
                >
                  Put it for sale!
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Collection;
