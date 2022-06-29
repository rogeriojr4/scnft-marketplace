import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { setupMFAccountTx } from "./cdc/transactions/MFToken/setup_account";
import { createLinktx } from "./cdc/transactions/MFToken/create_link";
import { getMFBalanceScript } from "./cdc/transactions/MFToken/get_balance";
import { mintMFTx } from "./cdc/transactions/MFToken/mint_tokens";
import { transferMFTx } from "./cdc/transactions/MFToken/transfer_tokens";

class Currency extends Nullstack {
  balance = 0.0;

  userToMint = "";
  amountToMint = "";

  amountToTransfer = "";
  accountToTransfer = "";

  async getAccountBalance({ addr }) {
    return fcl
      .send([
        fcl.script(getMFBalanceScript),
        fcl.args([fcl.arg(addr, t.Address)]),
      ])
      .then(fcl.decode);
  }

  async hydrate({ user }) {
    console.log(user);
    const balance = await this.getAccountBalance({ addr: user.addr });
    console.log(balance);
    this.balance = balance;
  }

  async setupMFAccount() {
    const transactionId = await fcl
      .send([
        fcl.transaction(setupMFAccountTx),
        fcl.args([]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionId);
  }

  async linkMFAccount() {
    const transactionId = await fcl
      .send([
        fcl.transaction(createLinktx),
        fcl.args([]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionId);
  }

  async mintTokens() {
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
  }
  
  async transferTokens() {
    const transactionId = await fcl
      .send([
        fcl.transaction(transferMFTx),
        fcl.args([
          fcl.arg(this.amountToTransfer, t.UFix64),
          fcl.arg(this.accountToTransfer, t.Address),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionId);
  }

  render() {
    return (
      <div class="p-3">
        <h1 class="text-lg font-bold">Currency</h1>
        <h2 class="text-md">Balance: {this.balance ? this.balance : "--"}</h2>
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3"
          onclick={this.setupMFAccount}
        >
          {" "}
          Setup Account
        </button>
        <br />
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  my-3"
          onclick={this.linkMFAccount}
        >
          {" "}
          Link Account
        </button>
        <br />
        <div class="border rounded-sm px-3">
          <input
            type="text"
            class="my-3 border rounded-sm p-1"
            placeholder="User Id"
            bind={this.userToMint}
          />{" "}
          <input
            type="text"
            class="my-3 border rounded-sm p-1"
            placeholder="Amount"
            bind={this.amountToMint}
          />{" "}
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  my-3"
            onclick={this.mintTokens}
          >
            {" "}
            Mint Tokens
          </button>
        </div>
        <div class="border rounded-sm px-3 my-2">
          <input
            type="text"
            class="my-3 border rounded-sm p-1"
            placeholder="User Id"
            bind={this.accountToTransfer}
          />{" "}
          <input
            type="text"
            class="my-3 border rounded-sm p-1"
            placeholder="Amount"
            bind={this.amountToTransfer}
          />{" "}
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  my-3"
            onclick={this.transferTokens}
          >
            {" "}
            Transfer Tokens
          </button>
        </div>
      </div>
    );
  }
}

export default Currency;
