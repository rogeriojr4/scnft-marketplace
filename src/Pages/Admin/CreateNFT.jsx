import Nullstack from "nullstack";
import StyledInput from "../../Elements/Admin/StyledInput";
import StyledButton from "../../Elements/StyledButton";
import { mintNFT } from "../../cdc/transactions/mint_nft";
// import { mintNFTsTx } from "../../cdc/NewTransactions/mint_nfts";
import { mintNFTsTx } from "../../cdc/NewTransactions/mint_nfts_and_list";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { nanoid } from "nanoid";

class CreateNFT extends Nullstack {
  nftName = "";
  nftAuthor = "";
  nftDescription = "";
  price = "10.234";
  fileA = "";

  nftBName = "";
  nftBAuthor = "";
  nftBDescription = "";
  fileB = "";

  maxEditions = "";

  loading = false;

  onImageChange({ event, fileType }) {
    event.preventDefault();

    if (event.target.files.length < 1) return;
    if (fileType === "A") this.fileA = event.target.files[0];
    else this.fileB = event.target.files[0];
    console.log("file read");

    // const reader = new FileReader();
    // reader.onload = () => {
    // if (fileType === "A") this.fileA = reader.result;
    // else this.fileB = reader.result;
    // console.log("file read");
    // };

    // reader.readAsArrayBuffer(event.target.files[0]);
  }

  async mint({ ipfs }) {
    if (!fcl.authz) return;
    try {
      this.loading = true;

      const cidAPromise = ipfs.add(this.fileA);
      const cidBPromise = ipfs.add(this.fileB);

      const [cidA, cidB] = await Promise.all([cidAPromise, cidBPromise]);
      
      // const cidA = { path: "QmXHATBdSeaq1kjPQVbx1CBNjND8AnkZ4i5x6GusLJmkfJ" };
      // const cidB = { path: "Qmf14DY2xCF9gHLGjDsUHqZXbv9xrTxHe5DjkihKtu4o9W" };

      console.log("cid", { cidA: cidA.path, cidB: cidB.path });
      if (!cidA || !cidB) {
        console.log("Error uploading image");
        return;
      }

      const transactionId = await fcl
        .send([
          fcl.transaction(mintNFTsTx),
          fcl.args([
            fcl.arg(nanoid(), t.String),
            fcl.arg(this.price, t.UFix64),
            fcl.arg(parseInt(this.maxEditions), t.Int),
            fcl.arg(cidA.path, t.String),
            fcl.arg(this.nftName, t.String),
            fcl.arg(this.nftAuthor, t.String),
            fcl.arg(this.nftDescription, t.String),
            fcl.arg(cidB.path, t.String),
            fcl.arg(this.nftBName, t.String),
            fcl.arg(this.nftBAuthor, t.String),
            fcl.arg(this.nftBDescription, t.String),
          ]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      const responseSealed = await fcl.tx(transactionId).onceSealed();

      console.log("responseSealed", responseSealed);
      window.document.location.reload();
    } catch (error) {
      console.log("Error minting files: ", error);
    } finally {
      this.loading = false;
    }
  }
  
  renderSideA() {
    return (
      <div class="flex flex-col gap-6">
        {this.loading && (
          <div class="fixed top-0 left-0 z-10 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] text-9xl flex justify-center items-center">
            LOADING . . .
          </div>
        )}
        <h1 class="font-bold text-lg">Create a new NFT</h1>
        <h2 class="text-md font-bold">Image, Video, Audio, or 3D Model *</h2>
        <h4 class="text-gray-300 text-sm">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </h4>
        <input
          onchange={({ event }) => this.onImageChange({ event, fileType: "A" })}
          type="file"
          name="nftContent"
          id="nft-content-input"
        />
        <StyledInput
          type="text"
          name="nftName"
          id="nftName"
          bind={this.nftName}
          label="Name *"
        />
        <StyledInput
          type="text"
          name="nftAuthor"
          id="nftAuthor"
          bind={this.nftAuthor}
          label="Author *"
        />
        <StyledInput
          type="number"
          name="nftMaxEditions"
          id="nftMaxEditions"
          bind={this.maxEditions}
          label="Max Editions *"
        />
        <StyledInput
          type="number"
          name="nftPrice"
          id="nftPrice"
          bind={this.price}
          label="Price *"
        />
        <div class="flex flex-col">
          <label htmlFor={"nftDescription"}>Description *</label>
          <textarea
            class="bg-black border border-white"
            name="nftDescription"
            id="nftDescription"
            bind={this.nftDescription}
          />
        </div>
        <div class="w-[200px]">
          <StyledButton onclick={this.mint}>Create NFT</StyledButton>
        </div>
      </div>
    );
  }

  renderSideB() {
    return (
      <div class="flex flex-col gap-6">
        <h1 class="font-bold text-lg">
          <span class="text-contrast-secondary">Side B</span> - NFT for donation
        </h1>
        <h2 class="text-md font-bold">Image, Video, Audio, or 3D Model *</h2>
        <h4 class="text-gray-300 text-sm">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </h4>
        <input
          oninput={({ event }) => this.onImageChange({ event, fileType: "B" })}
          type="file"
          name="nftContent"
          id="nft-content-input"
        />
        <StyledInput
          type="text"
          name="nftBName"
          id="nftBName"
          bind={this.nftBName}
          label="Name *"
        />
        <StyledInput
          type="text"
          name="nftBAuthor"
          id="nftBAuthor"
          bind={this.nftBAuthor}
          label="Author *"
        />
        <div class="flex flex-col">
          <label htmlFor={"nftBDescription"}>Description *</label>
          <textarea
            class="bg-black border border-white"
            name="nftBDescription"
            id="nftBDescription"
            bind={this.nftBDescription}
          />
        </div>
        <p class="text-gray-300 text-sm">
          This NFT will be generated in the same time with the original one, and
          will be donated when you sell the original.
        </p>
      </div>
    );
  }

  render() {
    return (
      <div class="w-full flex gap-12">
        <SideA />
        <SideB />
      </div>
    );
  }
}

export default CreateNFT;
