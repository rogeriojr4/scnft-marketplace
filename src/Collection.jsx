import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getNFTsScript } from "./cdc/scripts/get_nft";
import { listForSaleTx } from "./cdc/transactions/list_for_sale";
import arrangeNFTCollection from "./helpers/arrangeNFTCollection";
import NFTCard from "./Elements/NFTCard";

class Collection extends Nullstack {
  nfts = {};
  loading = false;

  async hydrate() {
    await this.getUserNFTs();
  }

  async getUserNFTs({ addr }) {
    const result = await fcl
      .send([fcl.script(getNFTsScript), fcl.args([fcl.arg(addr, t.Address)])])
      .then(fcl.decode);
    this.nfts = arrangeNFTCollection(result);
    console.log(this.nfts);
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
        {Object.values(this.nfts).map((nfts) => {
          const nft = nfts[0];
          return (
            <NFTCard
              name={nft.metadata.name}
              //price={parseFloat(price).toFixed(3)}
              imageSrc={`https://ipfs.infura.io/ipfs/${nft.ipfsHash}`}
              addr={addr}
              nftId={nft.id}
              donateToId={nft.metadata.donateToId}
              creatorName={nft.metadata.auth}
              editions={nft.metadata.maximumNumber}
            />
          );
        })}
      </div>
    );
  }
}

export default Collection;
