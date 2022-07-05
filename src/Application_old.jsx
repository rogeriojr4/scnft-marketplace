import Nullstack from "nullstack";
import "./input.css";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import Collection from "./Collection";
import "./tailwind.css";
import { mintNFT } from "./cdc/transactions/mint_nft.js";
import { setupUserTx } from "./cdc/transactions/setup_user.js";

import Market from "./Market";
import Currency from "./Currency";

class Application extends Nullstack {
  name = "";
  file = null;

  // static async saveImage({ image }) {
  //   const client = new Web3Storage({
  //     token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJjQzRiNUVBZjM4OTMzZkQ2NTMzYjNmNzIzNTFhODU1ZGE4NzJlRTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY0MzA1NjcwNjUsIm5hbWUiOiJ0ZXN0In0.dzMeCAnupdbBOe8eZLWgr9lpLCGfG1z0Kg8QY-1SiC0",
  //   });

  //   const base64Image = Buffer.from(
  //     image.replace(/^data:image\/\w+;base64,/, ""),
  //     "base64"
  //   );

  //   const file = new File([base64Image], "image.png");

  //   return client.put([file]);
  // }

  hydrate(context) {
    fcl
      .config()
      .put("accessNode.api", "https://rest-testnet.onflow.org")
      .put("app.detail.title", "Meta Food Truck")
      .put("app.detail.icon", "https://picsum.photos/id/1010/200/200")
      .put(
        "discovery.wallet",
        "https://fcl-discovery.onflow.org/testnet/authn"
      );
    fcl.currentUser().subscribe((user) => (context.user = user));
  }

  logIn() {
    // log in through Blocto
    fcl.authenticate();
  }

  logout() {
    // log out form Blocto
    fcl.unauthenticate();
  }

  async setupUser() {
    const transactionId = await fcl
      .send([
        fcl.transaction(setupUserTx),
        fcl.args([]),
        fcl.payer(fcl.currentUser),
        fcl.proposer(fcl.currentUser),
        fcl.authorizations([fcl.currentUser]),
        fcl.limit(99),
      ])
      .then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
  }

  async mint() {
    try {
      const cid = await this.saveImage({ image: this.file });
      console.log("cid", cid);
      const transactionId = await fcl
        .send([
          fcl.transaction(mintNFT),
          fcl.args([fcl.arg(cid, t.String), fcl.arg(this.name, t.String)]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId);
      return fcl.tx(transactionId).onceSealed();
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async sendTx() {
    await fcl.query({
      cadence: `
        pub fun main(): Bool {
          return true
        }
      `,
    });
  }

  onImageChange({ event }) {
    event.preventDefault();
    this.changedImage = true;
    this.hasMadeChanges = true;

    if (event.target.files.length < 1) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.file = reader.result;
      console.log("file read");
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  async unlistFromSale({ id }) {
    const transactionId = await fcl
      .send([
        fcl.transaction(unlistFromSaleTx),
        fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
  }

  renderHead() {
    return <head>{/* <link href="/dist/ t.css" rel="stylesheet" /> */}</head>;
  }

  renderAdmin({ user }) {
    return (
      <>
        <section class="bg-blue-50 p-3">
          <br />
          <br />
          <hr />
          <br />
          <h1 class="text-lg font-bold">Admin Section</h1>
          <label>Enter your NFT Params to Mint:</label>
          <br />
          <input type="text" bind={this.name} placeholder="Author Name" />
          <br />
          <br />
          <input type="file" onchange={this.onImageChange} />
          <br />
          <br />
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onclick={this.mint}
          >
            Mint
          </button>
        </section>
        <section class="p-3 bg-green-300">
          Your Collection:
          {user?.addr && <Collection addr={user.addr} />}
        </section>
        {user?.addr && <Market deflt={false} addr={user.addr} />}
      </>
    );
  }

  renderDefault() {
    return (
      <Market deflt={true} addr={"0x3135525943078f46"}>
        Oi
      </Market>
    );
  }

  render({ user }) {
    return (
      <main>
        <Head />
        <section class="bg-sky-500 p-3">
          <h1 class="text-lg font-bold">Login</h1>
          Logged Address: {user && user.addr ? user.addr : ""}
          <br />
          <br />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick={this.logIn}
          >
            Click to Login
          </button>
          <br />
          <br />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick={this.logout}
          >
            Click to Logout
          </button>
          <br />
          <br />
          <h2 class="text-md font-bold">First of all, setup your user</h2>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick={this.setupUser}
          >
            Setup User
          </button>
        </section>
        {user && (
          <>
            <Default route="/" />
            <Admin route="/admin" />
            <Currency route="/currency" />
          </>
        )}
      </main>
    );
  }
}

export default Application;
