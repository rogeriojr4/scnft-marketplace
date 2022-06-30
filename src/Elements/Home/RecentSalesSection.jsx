import Nullstack from 'nullstack';
import NFTCard from '../NFTCard';

class RecentSalesSection extends Nullstack {
  


  render() {
    return (
      <section>
        <h1 class="text-lg font-bold">
          Recent Sales
        </h1>
        <div class="flex gap-4 mt-6">
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
        </div>
      </section>
    )
  }

}

export default RecentSalesSection;