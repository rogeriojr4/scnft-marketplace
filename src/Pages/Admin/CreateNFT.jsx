import Nullstack from "nullstack";
import StyledInput from "../../Elements/Admin/StyledInput";
import StyledButton from "../../Elements/StyledButton";
import { mintNFT } from "../../cdc/transactions/mint_nft";
import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
class CreateNFT extends Nullstack {
  nftName = "";
  price = "10.234";
  fileA = "";

  nftBName = "";
  fileB = "";

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

      // const cidA = "QmNQrmZdXbp2EtxVfLLoNR2V9hk2b6rJPNJVduD1nHUBuT";
      // const cidB = "QmXasV8mQcviBUBsyAPNQCtUKcpxQtxrXfoVMFTemvxcz4";

      console.log("cid", { cidA: cidA.path, cidB: cidB.path });
      if (!cidA || !cidB) {
        console.log("Error uploading image");
        return;
      }
      const transactionId1 = await fcl
        .send([
          fcl.transaction(mintNFT),
          fcl.args([
            fcl.arg(cidA.path, t.String),
            fcl.arg(this.nftName, t.String),
          ]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      const transactionId2 = await fcl
        .send([
          fcl.transaction(mintNFT),
          fcl.args([
            fcl.arg(cidB.path, t.String),
            fcl.arg(this.nftBName, t.String),
          ]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log({ transactionId1, transactionId2 });

      const responseSealed1 = fcl.tx(transactionId1).onceSealed();
      const responseSealed2 = fcl.tx(transactionId2).onceSealed();

      const [doneSealed1, doneSealed2] = await Promise.all([
        responseSealed1,
        responseSealed2,
      ]);

      console.log({ doneSealed1, doneSealed2 });
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
        <div class="flex flex-col">
          <label htmlFor={"nftName"}>Name *</label>
          <input type="text" name="nftName" id="nftName" bind={this.nftName} />
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
        <div class="flex flex-col">
          <label htmlFor={"nftName"}>Name *</label>
          <input
            type="text"
            name="nftBName"
            id="nftBName"
            bind={this.nftBName}
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
        {this.loading && (
          <div class="fixed top-0 left-0 z-10 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] text-9xl flex justify-center items-center">
            LOADING . . .
          </div>
        )}
        <SideA />
        <SideB />
      </div>
    );
  }
}

export default CreateNFT;
