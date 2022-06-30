import Nullstack from "nullstack";
import ImageBorder from "../assets/ImageBorder";
import MFLogo from "../assets/MFLogo";
import "./test.css";

class NFTCardWithBorder extends Nullstack {
  render() {
    return (
      <div class="relative">
        <svg
          width="331"
          height="443"
          viewBox="0 0 331 443"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M303.896 419H6.39686L31.1027 440H325.719L303.896 419ZM328.837 443H328H30L1.76471 419L0 417.5V416V3V0H3H303H304.5L306 1.72642L331 30.5V440V440.918V443H328.837ZM328 438.032V31.6212L306 6.30048V416.862L328 438.032ZM303 3H3V416H303V3Z"
            fill="white"
          />
        </svg>
        <img
          class="absolute top-[10px] left-[10px] w-[285px] h-[267px]"
          src="/assets/child_home.png"
          alt="ALo"
        />
        <div class="absolute top-[277px] left-[10px] w-[285px]">
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

export default NFTCardWithBorder;
