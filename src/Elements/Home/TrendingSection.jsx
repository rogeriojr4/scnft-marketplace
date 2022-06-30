import Nullstack from "nullstack";
import NFTCardWithBorder from "../NFTCardWithBorder";

class TrendingSection extends Nullstack {
  renderTrendingNFTS() {
    return (
      <div class="flex flex-wrap w-full justify-between gap-2">
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
      </div>
    );
  }

  render() {
    return (
      <section class="px-56 w-full bg-[url(/assets/background/pink_elipse_right.svg)] bg-cover pb-24">
        <h1 class="ml-5 text-lg font-bold mb-12">Trending NFTs</h1>
        <TrendingNFTS />
      </section>
    );
  }
}

export default TrendingSection;
