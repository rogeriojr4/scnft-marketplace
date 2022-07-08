import Nullstack from "nullstack";
import MFLogo from "../assets/MFLogo";
import "./test.css";
import { purchaseWithDonationTx } from "../cdc/NewTransactions/purchase_with_donation";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import StyledButton from "./StyledButton";

class NFTCard extends Nullstack {
  loading = false;

  async purchase({ nftId, donateToId, user, addr, settings }) {
    if (!user.addr) {
      console.log("Could not find a logged user");
      return;
    }
    console.log("settings.donationAddress", settings.donationAddress);
    this.loading = true;
    try {
      const transactionId = await fcl
        .send([
          fcl.transaction(purchaseWithDonationTx),
          fcl.args([
            fcl.arg(addr, t.Address),
            fcl.arg(parseInt(nftId), t.UInt64),
            fcl.arg(parseInt(donateToId), t.UInt64),
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

  render({ name, price, imageSrc, creatorName, nftId, addr, editions }) {
    return (
      <a
        href={`/detail?nftId=${nftId}&addr=${addr}`}
        class="flex flex-col items-center border-2 p-1"
      >
        <img class="w-[285px] h-[267px]" src={imageSrc} alt="ALo" />
        <div class="mt-3 w-full p-2">
          <h3 class="font-bold text-md">{name}</h3>
          <h4 class="text-sm">{creatorName}</h4>

          <>
            <br />
            <p class="text-sm">Price</p>
            <div class="flex justify-between items-center">
              {price && (
                <div class="text-md flex items-center gap-2">
                  <MFLogo />
                  <span>{price}</span>
                </div>
              )}
              <div class="text-xs text-contrast">
                {editions} Edition(s) Minted
              </div>
              {/* <StyledButton loading={this.loading} onclick={this.purchase}>
                  Buy Now
                </StyledButton> */}
            </div>
          </>
        </div>
      </a>
    );
  }
}

export default NFTCard;
