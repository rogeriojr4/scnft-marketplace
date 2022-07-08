import Nullstack from "nullstack";
import DetailsGrid from "../assets/DetailsGrid";
import MFLogo from "../assets/MFLogo";
import WalletIcon from "../assets/WalletIcon";
import Header from "../Elements/Header";
import StyledButton from "../Elements/StyledButton";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getOneNFTScript } from "../cdc/scripts/get_one_nft";

class NFTDetail extends Nullstack {
  nftId = "";
  addr = "";
  price = "";

  nft = null;
  donationNft = null;

  initiate({ params, settings }) {
    this.nftId = params.nftId;
    this.addr = params.addr || settings.adminAddress;
  }

  async hydrate() {
    if (!this.nftId) return;
    const result = await fcl
      .send([
        fcl.script(getOneNFTScript),
        fcl.args([
          fcl.arg(this.addr, t.Address),
          fcl.arg(this.nftId, t.UInt64),
        ]),
      ])
      .then(fcl.decode);
    console.log(result);
    this.nft = result[0]?.nftRef;
    this.price = result[0]?.price;
    this.donationNft = result[1].nftRef;
  }

  async purchase({ user, settings }) {
    if (!user.addr) {
      console.log("Could not find a logged user");
      return;
    }
    this.loading = true;
    try {
      const transactionId = await fcl
        .send([
          fcl.transaction(purchaseWithDonationTx),
          fcl.args([
            fcl.arg(this.addr, t.Address),
            fcl.arg(parseInt(this.nft.id), t.UInt64),
            fcl.arg(parseInt(this.nft.metadata.donateToId), t.UInt64),
            fcl.arg(settings.donationAddress, t.Address),
          ]),
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

  renderDetails({ user, settings }) {
    return (
      <div class="w-full flex flex-col items-center pt-20">
        <div class="flex flex-col gap-6">
          <h1 class="text-md font-bold">
            {this.nft?.metadata.name ||
              "Starving & Dehydrated African Crypto Kid"}
          </h1>
          {this.addr !== settings.adminAddress && (
            <p class="text-sm">
              Owned by: <span class="text-contrast-secondary">{this.addr}</span>
            </p>
          )}
          <p class="font-semibold text-sm">
            Edition {this.nft?.metadata.edition} of{" "}
            {this.nft?.metadata.maximumNumber || "unknown"}
          </p>
          {this.price > 0 && (
            <div class="mt-4">
              <h1 class="text-md font-semibold">Price</h1>
              <div class="flex gap-2">
                <MFLogo />
                <h2 class="text-md font-bold">
                  {parseFloat(this.price).toFixed(3)}
                </h2>
              </div>
            </div>
          )}
          {user && user.addr && this.price > 0 && (
            <div class="max-w-[200px] my-6">
              <StyledButton>
                <div class="text-sm flex gap-2">
                  <WalletIcon />
                  Buy Now
                </div>
              </StyledButton>
            </div>
          )}
          <h1 class="font-bold text-md">Description</h1>
          <p>{this.nft?.metadata.description}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="flex w-full flex-col bg-[url(/assets/background/bg-details.svg)] bg-no-repeat bg-w-full">
        <Header />
        <div class="flex justify-between py-28 px-56 min-h-[1500px]">
          <div class="w-full flex justify-center">
            <div class="flex flex-col gap-5">
              {this.nft && this.donationNft && (
                <DetailsGrid
                  imageA={`https://ipfs.infura.io/ipfs/${this.nft?.ipfsHash}`}
                  imageB={`https://ipfs.infura.io/ipfs/${this.donationNft?.ipfsHash}`}
                />
              )}
              <h1 class="font-bold text-sm">
                {this.donationNft?.metadata.name}
              </h1>
              <p class="text-xs">
                Owned by:{" "}
                <span class="text-contrast-secondary">Nobody yet</span>
              </p>
            </div>
          </div>
          <Details />
        </div>
      </div>
    );
  }
}

export default NFTDetail;
