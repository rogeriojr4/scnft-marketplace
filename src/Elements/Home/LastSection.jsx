import Nullstack from "nullstack";
import StyledButton from "../StyledButton";

class LastSection extends Nullstack {
  render() {
    return (
      <section class="px-64 w-full flex items-center flex-col gap-4 mt-[-100px] py-64 bg-[url(/assets/background/grid.svg)] bg-cover">
        <h1 class="text-lg font-bold">
          With <span class="text-black bg-contrast">great power</span> comes
          non-fungibility
        </h1>
        <h2>
          What Uncle Ben and Uncle Satoshi mean is that you can use your “power”
          to change the world... by minting a few NFTs.
        </h2>
        <a href="/explore" class="mt-6">
          <StyledButton secondary>
            BUY AN NFT TO A STARVING CHILD
          </StyledButton>
        </a>
      </section>
    );
  }
}

export default LastSection;
