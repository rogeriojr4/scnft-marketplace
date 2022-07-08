import Nullstack from "nullstack";
import StyledButton from "../../Elements/StyledButton";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { mintMFTx } from "../../cdc/transactions/MFToken/mint_tokens";
import FaucetIcon from "../../assets/FaucetIcon";

class MintTokens extends Nullstack {
  loading = false;

  userToMint = "";
  amountToMint = "";

  async mintTokens() {
    this.loading = true;
    try {
      const transactionId = await fcl
        .send([
          fcl.transaction(mintMFTx),
          fcl.args([
            fcl.arg(this.amountToMint, t.UFix64),
            fcl.arg(this.userToMint, t.Address),
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
      console.log("err", err);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return (
      <div class="w-full flex gap-12 flex-col">
        {this.loading && (
          <div class="fixed top-0 left-0 z-10 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] text-9xl flex justify-center items-center">
            LOADING . . .
          </div>
        )}
        <h1 class="flex items-center text-lg font-bold gap-4">
          <FaucetIcon /> Faucet
        </h1>
        <div class="flex flex-col max-w-sm">
          <label htmlFor={"userToMint"}>Address</label>
          <input
            class="border border-white font-md text-white bg-black py-1 px-2"
            bind={this.userToMint}
            type="text"
            name="userToMint"
          />
        </div>
        <div class="flex flex-col max-w-sm">
          <label htmlFor={"amountToMint"}>Amount</label>
          <input
            class="border border-white font-md text-white bg-black py-1 px-2"
            bind={this.amountToMint}
            type="number"
            name="amountToMint"
          />
        </div>
        <div class="max-w-[250px]">
          <StyledButton secondary onclick={this.mintTokens}>Mint {'&'} Send</StyledButton>
        </div>
      </div>
    );
  }
}

export default MintTokens;
