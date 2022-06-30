import Nullstack from 'nullstack';
import FifthSection from '../Elements/Home/FifthSection';
import FirstSection from '../Elements/Home/FirstSection';
import LastSection from '../Elements/Home/LastSection';
import RecentSalesSection from '../Elements/Home/RecentSalesSection';
import ThirdSection from '../Elements/Home/ThirdSection';
import TopSold from '../Elements/Home/TopSold';
import TrendingSection from '../Elements/Home/TrendingSection';

class Home extends Nullstack {
  
  render() {
    return (
      <div class="flex flex-col gap-56">
        <FirstSection />
        <TrendingSection />
        <ThirdSection />
        <RecentSalesSection />
        <FifthSection />
        <TopSold />
        <LastSection />
      </div>
    )
  }

}

export default Home;