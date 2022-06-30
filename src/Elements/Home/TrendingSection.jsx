import Nullstack from 'nullstack';
import NFTCardWithBorder from '../NFTCardWithBorder';

class TrendingSection extends Nullstack {
  

  renderTrendingNFTS() {
    return(
      <div class="flex flex-wrap w-full">
        <NFTCardWithBorder />
        <NFTCardWithBorder />
        <NFTCardWithBorder />
      </div>
    )
  }

  render() {
    return (
      <section>
         <h1 class="text-md font-bold">Trending NFTs</h1>
         <TrendingNFTS />
      </section>
    )
  }

}

export default TrendingSection;