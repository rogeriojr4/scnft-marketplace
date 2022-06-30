import Nullstack from "nullstack";
import SCLogo from "../assets/SCLogo";

class Footer extends Nullstack {
  render() {
    return (
      <footer class="flex justify-between px-64 py-10 border-t-2 border-white">
        <div class="flex flex-col justify-start">
          <div class="w-fit">
            <SCLogo />
          </div>
          <p class="text-xs mt-4 max-w-[300px]">
            They may not have food, but you can help an NFT-less child with this
            buy one, give one opportunity. Every child deserves an NFT.
          </p>
        </div>
        <div class="w-full flex justify-end">
          <div>
            <h1 class="font-bold">Marketplace</h1>
            <nav class="flex flex-col gap-2 text-xs mt-2">
              <a class="hover:underline" href="/wtf">WTF?</a>
              <a class="hover:underline" href="/explore">Explore</a>
              <a class="hover:underline" href="/tokens">MetaFood's</a>
            </nav>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
