import Nullstack from "nullstack";
import MFLogo from "../assets/MFLogo";
import "./test.css";

class NFTCard extends Nullstack {
  render() {
    return (
      <div class="flex flex-col items-center border-2 p-1">
        <img
          class="w-[285px] h-[267px]"
          src="/assets/child_home.png"
          alt="ALo"
        />
        <div class="mt-3 w-full p-2">
          <h3 class="font-bold text-md">NFT Name</h3>
          <h4 class="text-sm">Creator's name</h4>
          <br />
          <p class="text-sm">Price</p>
          <div class="text-md flex items-center gap-2">
            <MFLogo />
            <span>0.49</span>
          </div>
        </div>
      </div>
    );
  }
}

export default NFTCard;
