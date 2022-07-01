import Nullstack from "nullstack";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { getMFBalanceScript } from "../cdc/transactions/MFToken/get_balance";
import MFLogo from "../assets/MFLogo";

class UserBalance extends Nullstack {
  async hydrate(context) {
    if (!context) return;
    const { user } = context;
    const balance = await this.getAccountBalance({ addr: user.addr });
    console.log(balance);
    context.balance = balance;
  }

  async getAccountBalance({ addr }) {
    return fcl
      .send([
        fcl.script(getMFBalanceScript),
        fcl.args([fcl.arg(addr, t.Address)]),
      ])
      .then(fcl.decode);
  }

  render({ balance }) {
    return <div class="flex gap-1 items-center"> <MFLogo /> {balance &&  parseFloat(balance).toFixed(3)} </div>;
  }
}

export default UserBalance;
