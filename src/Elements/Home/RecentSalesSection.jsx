import Nullstack from "nullstack";
import NFTCard from "../NFTCard";

class RecentSalesSection extends Nullstack {
  render() {
    return (
      <section class="px-64">
        <h1 class="ml-5 text-lg font-bold">Recent Sales</h1>
        <div class="flex gap-4 mt-6 justify-between">
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
        </div>
      </section>
    );
  }
}

export default RecentSalesSection;
