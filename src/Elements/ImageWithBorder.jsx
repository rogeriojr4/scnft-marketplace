import Nullstack from "nullstack";
import ImageBorder from "../assets/ImageBorder";
import "./test.css";

class ImageWithBorder extends Nullstack {
  render() {
    return (
      <div class="relative">
        <svg
          width="418"
          height="571"
          viewBox="0 0 418 571"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3539 513.244H363.587L414.614 569.5H76.3088L4.3539 513.244ZM362.751 510.244H1.5V1.5H362.751V510.244ZM365.751 511.165V4.39872L416.5 70.1559V567.114L365.751 511.165Z"
            stroke="white"
            stroke-width="3"
          />
        </svg>
        <img class="absolute top-[3px] left-[3px] w-[360px] h-[506px]" src="/assets/child_home.png" alt="ALo" />
      </div>
    );
  }
}

export default ImageWithBorder;
