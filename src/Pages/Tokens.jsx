import Nullstack from "nullstack";
import WalletIcon from "../assets/WalletIcon";
import FadedBackground from "../Elements/FadedBackground";
import Header from "../Elements/Header";
import StyledButton from "../Elements/StyledButton";
import {buyTokensTx} from "../cdc/transactions/MFToken/buy_tokens"
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
class Tokens extends Nullstack {

  async buyTokens() {
    if (!fcl.authz) return;
    try {
      console.log("starting")
      const transactionId = await fcl
        .send([
          fcl.transaction(buyTokensTx),
          fcl.args([
            fcl.arg("5.0", t.UFix64),
          ]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId)

      const responseSealed = await fcl.tx(transactionId).onceSealed();

      console.log("responseSealed", responseSealed);
      window.document.location.reload();
    } catch (error) {
      console.log("Error minting files: ", error);
    } finally {
      this.loading = false;
    }
  }
  
  
  render() {
    return (
      <div class="flex w-full flex-col">
        <FadedBackground bgUrl="/assets/background/image-4.png">
          <Header />
          <section class="flex flex-col gap-1 items-center py-56">
            <h1 class="font-bold text-md">Meet our token</h1>
            <h2 class="p-2 bg-contrast text-md font-bold text-black">
              Meta Food Token
            </h2>
            <p class="max-w-sm text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="mt-8">
              <StyledButton onclick={this.buyTokens}>
                <div class="text-sm flex gap-2">
                  <WalletIcon />
                  Connect your wallet
                </div>
              </StyledButton>
            </div>
          </section>
          
        </FadedBackground>
      </div>
    );
  }
}

export default Tokens;
