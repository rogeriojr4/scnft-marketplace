import Nullstack from "nullstack";
import StyledInput from "../../Elements/Admin/StyledInput";
import StyledButton from "../../Elements/StyledButton";

class CreateNFT extends Nullstack {
  nftName = "";
  quantity = "1";
  price = "10.234";

  renderSideA() {
    return (
      <div class="flex flex-col gap-6">
        <h1 class="font-bold text-lg">Create a new NFT</h1>
        <h2 class="text-md font-bold">Image, Video, Audio, or 3D Model *</h2>
        <h4 class="text-gray-300 text-sm">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </h4>
        <input type="file" name="nftContent" id="nft-content-input" />
        <StyledInput
          type="text"
          name="nftName"
          id="nft-name-input"
          bind={this.nftName}
          label="Name *"
        />
        <StyledInput
          type="number"
          name="quantity"
          id="nft-quantity-input"
          bind={this.quantity}
          label="Quantity *"
        />
        <StyledInput
          type="number"
          name="price"
          id="nft-price-input"
          bind={this.price}
          label="Price *"
        />
        <div class="w-[200px]">
          <StyledButton>Create NFT</StyledButton>
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
        <input type="file" name="nftContent" id="nft-content-input" />
        <StyledInput
          type="text"
          name="nftName"
          id="nft-name-input"
          bind={this.nftName}
          label="Name *"
        />
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
