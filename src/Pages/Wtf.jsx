import Nullstack from "nullstack";
import WalletIcon from "../assets/WalletIcon";
import FadedBackground from "../Elements/FadedBackground";
import Header from "../Elements/Header";
import LastSection from "../Elements/Home/LastSection";
import StyledButton from "../Elements/StyledButton";

class Wtf extends Nullstack {
  render() {
    return (
      <div class="flex w-full flex-col">
        <FadedBackground bgUrl="/assets/background/01-cropped-and-desaturated-1.png">
          <Header />
          <section class="flex flex-col gap-5 items-center py-36">
            <h1 class="text-lg font-bold text-center">
              Treat you charity
              <br />
              like your investments
              <br />
              <span class="font-bold text-black bg-contrast px-2">
                - Expect ROI
              </span>
            </h1>
            <h2>
              Bringing attention to effective altruism, and reminding you that
              not all charities are created equal
            </h2>
            <StyledButton>
              <div class="text-sm flex gap-2">
                <WalletIcon />
                Connect your wallet
              </div>
            </StyledButton>
          </section>
        </FadedBackground>
        <section class="w-full flex justify-center bg-black py-20">
          <div class="max-w-lg flex flex-col gap-8 text-center items-center">
            <h1 class="text-md font-bold">
              Giving to charities <br /> that count
            </h1>
            <p>
              Some “charities” manipulate emotions with imagery. This helps
              fundraise, but not necessarily those in need. Treat your charity
              like any other investment. Verify that your hard-earned money
              benefits those in greatest need. Know what percentage of each
              donation is retained vs. distributed!
            </p>
            <p>
              This project brings awareness to the issue of inefficient
              charities that keep most of the funds they raise internally. Let’s
              help altruistic people give to the most efficient, effective
              charities!
            </p>
            <p>
              Note: All monetary proceeds from this project will be donated to
              charities deemed effective by GiveWell.
            </p>
            <div class="w-fit">
              <StyledButton>
                <div class="text-sm flex gap-2">
                  <WalletIcon />
                  Givin what we can
                </div>
              </StyledButton>
            </div>
          </div>
        </section>
        <LastSection />
      </div>
    );
  }
}

export default Wtf;
