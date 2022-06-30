import Nullstack from "nullstack";
import DonationExample from "../../assets/DonationExample";

class FifthSection extends Nullstack {
  render() {
    return (
      <section class="px-64 flex gap-28 items-center">
        <div>
          <h1 class="text-lg font-bold w-full">
            Buy a nft of a dehydrated child and automatically donate an
            <br />
            <span class="bg-contrast text-black px-2"> nft of a water bottle</span>{" "}
          </h1>
          <p class="text-sm">
            Treat your charity like your investments.<br />Expect ROI.
          </p>
        </div>
        <div class="w-full">
          <DonationExample />
        </div>
      </section>
    );
  }
}

export default FifthSection;
