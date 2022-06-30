import Nullstack from "nullstack";
import SCLogo from "../assets/SCLogo";
import SigninIcon from "../assets/signinIcon";

class Header extends Nullstack {
  renderMenu({ router }) {
    const active = "font-bold border-b-2 border-contrast";

    return (
      <nav class="flex gap-4 font-extralight h-[30px]">
        <a
          class={
            router.url.length === 1
              ? active
              : "hover:underline hover:underline-offset-1"
          }
          href="/"
        >
          Home
        </a>
        <a
          class={
            router.url.includes("/wtf")
              ? active
              : "hover:underline hover:underline-offset-1"
          }
          href="/wtf"
        >
          WTF?
        </a>
        <a
          class={
            router.url.includes("/explore")
              ? active
              : "hover:underline hover:underline-offset-1"
          }
          href="/explore"
        >
          Explore
        </a>
        <a
          class={
            router.url.includes("/tokens")
              ? active
              : "hover:underline hover:underline-offset-1"
          }
          href="/tokens"
        >
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
      <header class="flex w-full justify-between py-10 px-56">
        <a href="/">
          <SCLogo />
        </a>
        <Menu />
      </header>
    );
  }
}

export default Header;
