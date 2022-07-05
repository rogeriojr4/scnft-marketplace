import Nullstack from "nullstack";
import SearchIcon from "../assets/SearchIcon";
import Header from "../Elements/Header";
import NFTCard from "../Elements/NFTCard";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getSaleNFTsScript } from "../cdc/scripts/get_sale_nfts";
import arrangeNFTMarketPlace from "../helpers/arrangeNFTMarketPlaceCollection";

class Explore extends Nullstack {
  nfts = null;
  loading = false;

  search = "";

  async hydrate({ addr }) {
    // console.log({ addr });
    const result = await fcl
      .send([
        fcl.script(getSaleNFTsScript),
        fcl.args([fcl.arg(addr, t.Address)]),
      ])
      .then(fcl.decode);

    console.log(result);
    this.nfts = arrangeNFTMarketPlace(result);
    this.loading = false;
  }

  render({ addr }) {
    return (
      <div class="flex w-full flex-col">
        <Header />
        <div class="flex flex-col gap-36 items-center">
          <div class="w-full px-56 flex flex-col items-center">
            <div class="max-w-xl flex flex-col items-center">
              <h1 class="text-lg font-bold">Explore the starving children</h1>
              <div class="relative w-full border-b-2 border-white">
                <SearchIcon clazz="absolute top-[10px] left-3" />
                <input
                  class="bg-gray-900 w-full text-md p-2 pl-14"
                  type="search"
                  name="search"
                  id="search-input"
                  bind={this.search}
                />
              </div>
            </div>
            <div class="flex flex-wrap w-full justify-around gap-8 mt-12 mb-2">
              {this.nfts &&
                Object.entries(this.nfts).map(([id, { nftRef, price }]) => {
                  if (
                    // id < 10 ||
                    !nftRef.metadata.name
                      .toLocaleLowerCase()
                      .includes(this.search.toLocaleLowerCase())
                  )
                    return null;
                  return (
                    <NFTCard
                      name={nftRef.metadata.name}
                      price={parseFloat(price).toFixed(3)}
                      imageSrc={`https://ipfs.infura.io/ipfs/${nftRef.ipfsHash}`}
                      addr={addr}
                      nftId={nftRef.id}
                      donateToId={nftRef.metadata.donateToId}
                    />
                  );
                })}
            </div>
          </div>
          <button class="flex w-full justify-center gap-2 items-center mb-12">
            Load more{" "}
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 8.25417L0 1.25417L1.25417 0L7 5.775L12.7458 0.0291662L14 1.28333L7 8.25417Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default Explore;
