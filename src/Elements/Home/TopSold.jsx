import Nullstack from "nullstack";
import MFLogo from "../../assets/MFLogo";

class TopSold extends Nullstack {
  renderSoldNFT({ name, editionsNumber, price, imageSrc, position }) {
    return (
      <div class="flex items-center justify-between gap-12 border-b-2 border-white p-4">
        <div class="w-[30%] h-[70px] relative">
          <img class="max-h-[70px]" src={imageSrc} alt={name} />
          <div class="absolute top-[-15px] left-[-15px] w-[34px] h-[34px] bg-contrast text-black flex items-center justify-center font-bold">
            {position}
          </div>
        </div>
        <div class="w-[40%]">
          <h3>{name}</h3>
          <p class="text-contrast text-sm">{editionsNumber} Editions</p>
        </div>
        <div class="w-[30%] flex gap-2 items-center">
          <MFLogo />
          <div class="font-bold">{price}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section class="px-64 flex flex-col items-center w-full">
        <h1 class="text-lg font-bold">
          Top NFTs sold over{" "}
          <span class="text-black bg-contrast px-2">last 24 hours</span>
        </h1>
        <div class="flex gap-16 mt-12 flex-wrap justify-around w-full">
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="1"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="2"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="3"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="4"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="5"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="6"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="7"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="8"
          />
          <SoldNFT
            name="NFT Name"
            editionsNumber="324"
            price="2.34"
            imageSrc="/assets/top_sold.png"
            position="9"
          />
        </div>
      </section>
    );
  }
}

export default TopSold;
