import Nullstack from "nullstack";

class FadedBackground extends Nullstack {
  render({ children, bgUrl }) {
    return (
      <div class={`w-full bg-[url(${bgUrl || ""})] bg-cover relative`}>
        <div class="w-full bg-[rgba(0,0,0,0.75)] bg-[url(/assets/background/pink_elipse_left.svg)] bg-cover pb-[100px]">
          {children}
        </div>
        <div
          style="position: absolute;
                bottom: 0px;
                display: block;
                width: 100%;
                height: 300px;
                background-image: linear-gradient(to bottom, 
                  rgba(255, 255, 255, 0), 
                    rgba(0, 0, 0, 0.9)
                100%);"
        />
      </div>
    );
  }
}

export default FadedBackground;
