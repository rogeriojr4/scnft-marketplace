import Nullstack from "nullstack";
import SigninIcon from "../assets/signinIcon";

class Header extends Nullstack {
  renderLogo() {
    return (
      <div class="text-center font-extralight">
        <div class="font-bold text-xs">NFTS FOR</div>
        STARVING
        <br />
        CHILDREN
      </div>
    );
  }

  renderMenu({ router }) {
    const active = "font-bold border-b-2 border-contrast";

    return (
      <nav class="flex gap-4 font-extralight h-[30px]">
        <a class={router.url.length === 1 ? active : ""} href="/">
          Home
        </a>
        <a class={router.url.includes("/wtf") ? active : ""} href="/wtf">
          WTF?
        </a>
        <a
          class={router.url.includes("/explore") ? active : ""}
          href="/explore"
        >
          Explore
        </a>
        <a class={router.url.includes("/tokens") ? active : ""} href="/tokens">
          MetaFood's
        </a>
        <div class="flex items-start gap-1">
          <SigninIcon />
          <button>Sign in</button>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <header class="mb-20 flex w-full justify-between">
        <Logo />
        <Menu />
      </header>
    );
  }
}

export default Header;
