import Nullstack from "nullstack";
import WalletIcon from "../assets/WalletIcon";
import FadedBackground from "../Elements/FadedBackground";
import Header from "../Elements/Header";
import StyledButton from "../Elements/StyledButton";
import { buyTokensTx } from "../cdc/transactions/MFToken/buy_tokens";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import FlowIcon from "../assets/FlowIcon";
import MFLogo from "../assets/MFLogo";
import LastSection from "../Elements/Home/LastSection";
class Tokens extends Nullstack {
  flows = "0.0";
  mfs = "0.0";

  async buyTokens() {
    if (!fcl.authz) return;
    try {
      console.log("starting");
      const transactionId = await fcl
        .send([
          fcl.transaction(buyTokensTx),
          fcl.args([fcl.arg(parseFloat(this.flows).toFixed(4), t.UFix64)]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId);

      const responseSealed = await fcl.tx(transactionId).onceSealed();

      console.log("responseSealed", responseSealed);
      window.document.location.reload();
    } catch (error) {
      console.log("Error minting files: ", error);
    } finally {
      this.loading = false;
    }
  }

  onChangeFlows({ event }) {
    const flows = parseFloat(event.target.value);
    this.mfs = flows * 30;
  }

  onChangeMFs({ event }) {
    const flows = parseFloat(event.target.value);
    this.flows = flows / 30;
  }

  renderBuyMFs({ user }) {
    return (
      <section class="bg-[url(/assets/background/pink_elipse_right.svg)] w-full bg-fit bg-left bg-no-repeat flex items-center flex-col gap-6 py-36">
        <h1 class="text-lg text-center font-bold">Buy MFs</h1>
        <div class="bg-black border border-gray-300 flex p-12 flex-col gap-2 items-center">
          <div class="flex w-full justify-between gap-10 p-4 border border-white">
            <input
              class="bg-black"
              type="number"
              step=".001"
              oninput={this.onChangeFlows}
              value={this.flows}
            />
            <div class="flex gap-2 text-xs font-bold items-center">
              <FlowIcon />
              FLOW
            </div>
          </div>
          <div class="flex w-full justify-between gap-10 p-4 border border-white">
            <input
              class="bg-black"
              type="number"
              step=".001"
              oninput={this.onChangeMFs}
              value={this.mfs}
            />
            <div class="flex gap-2 text-xs font-bold items-center">
              <MFLogo />
              &nbsp;&nbsp;MFs
            </div>
          </div>
          <div class="mt-8">
            {(user && user.addr) ? (
              <StyledButton onclick={this.buyTokens}>Submit</StyledButton>
            ) : (
              <StyledButton>Connect your wallet</StyledButton>
            )}
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div class="flex w-full flex-col">
        <FadedBackground bgUrl="/assets/background/image-4.png">
          <Header />
          <section class="flex flex-col gap-1 items-center py-48">
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
        <section class="w-full flex flex-col items-center gap-12 py-12">
          <h1 class="text-lg font-bold text-center max-w-xl">
            Buy a nft of a dehytrated child and automatically donate a nft of a
            water bottle
          </h1>
          <p class="text-md text-center max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <StyledButton>
            <span class="text-md">Givin what we can</span>
          </StyledButton>
        </section>
        <BuyMFs />
        <LastSection />
      </div>
    );
  }
}

export default Tokens;
