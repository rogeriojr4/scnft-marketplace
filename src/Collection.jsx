import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getNFTsScript } from "./cdc/scripts/get_nft";
import { listForSaleTx } from "./cdc/transactions/list_for_sale";

// 0x3135525943078f46

class Collection extends Nullstack {
  nfts = [];

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
    console.log(`Putting ${id} for sale`);
    const price = prompt("Enter the price")
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
    return fcl.tx(transactionId).onceSealed();
  }

  render() {
    return (
      <div class="w-full flex gap-5">
        {this.nfts.map((nft) => (
          <div class="border border-green-700 rounded-md p-5" key={nft.id}>
            <h1>#{nft.id}</h1>
            <img
              class="w-[100px] h-[100px]"
              src={`https://dweb.link/ipfs/${nft.ipfsHash}/image.png`}
              alt="won't work"
            />
            <h1>Author: {nft.metadata.name}</h1>
            <button
              onclick={() => this.listForSale({ id: nft.id })}
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Put it for sale!
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Collection;
