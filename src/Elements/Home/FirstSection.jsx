import Nullstack from "nullstack";
import ImageWithBorder from "../ImageWithBorder";
import StyledButton from "../StyledButton";

class FirstSection extends Nullstack {
  render() {
    return (
      <section class="flex w-full justify-between items-center px-64 py-8">
        <div class="max-w-[470px]">
          <h1 class="text-lg font-bold">
            Your kindness can make the world of a difference for a
            <span class="bg-contrast text-black"> child's crypto wallet.</span>
          </h1>
          <h2 class="text-md max-w-[450px] my-4">
            They may not have food, but you can help an NFT-less child with this
            buy one, give one opportunity. Every child deserves an NFT.
          </h2>
          <div class="flex gap-6">
            <StyledButton w="full">Explore</StyledButton>
            <StyledButton secondary w="full">
              Buy MFs
            </StyledButton>
          </div>
        </div>
        <div>
          <ImageWithBorder />
        </div>
      </section>
    );
  }
}

export default FirstSection;
