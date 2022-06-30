import Nullstack from "nullstack";
import DonationExample from "../../assets/DonationExample";

class FifthSection extends Nullstack {
  render() {
    return (
      <section class="flex gap-28 items-center">
        <div>
          <h1 class="text-lg font-bold w-full">
            Buy a nft of a dehydrated child and automatically donate a
            <span class="bg-contrast text-black"> nft of a water bottle</span>{" "}
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
