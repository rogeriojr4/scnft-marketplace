import Nullstack from "nullstack";
import StyledButton from "../StyledButton";

class LastSection extends Nullstack {
  render() {
    return (
      <section class="w-full flex items-center flex-col gap-4">
        <h1 class="text-lg font-bold">
          With <span class="text-black bg-contrast">great power</span> comes
          non-fungibility
        </h1>
        <h2>
          What Uncle Ben and Uncle Satoshi mean is that you can use your “power”
          to change the world... by minting a few NFTs.
        </h2>
        <div class="mt-6">
          <StyledButton secondary width="full">
            BUY A NFT TO A STARVING CHILD
          </StyledButton>
        </div>
      </section>
    );
  }
}

export default LastSection;
