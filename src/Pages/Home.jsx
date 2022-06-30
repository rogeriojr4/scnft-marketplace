import Nullstack from "nullstack";
import FadedBackground from "../Elements/FadedBackground";
import Header from "../Elements/Header";
import FifthSection from "../Elements/Home/FifthSection";
import FirstSection from "../Elements/Home/FirstSection";
import LastSection from "../Elements/Home/LastSection";
import RecentSalesSection from "../Elements/Home/RecentSalesSection";
import ThirdSection from "../Elements/Home/ThirdSection";
import TopSold from "../Elements/Home/TopSold";
import TrendingSection from "../Elements/Home/TrendingSection";

class Home extends Nullstack {
  render() {
    return (
      <div class="flex flex-col gap-36">
        <FadedBackground bgUrl="/assets/background/04-cropped-shade1.png">
          <Header />
          <FirstSection />
        </FadedBackground>
        <TrendingSection />
        <ThirdSection />
        <RecentSalesSection />
        <FifthSection />
        <TopSold />
        <LastSection />
      </div>
    );
  }
}

export default Home;
