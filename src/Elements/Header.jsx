import Nullstack from "nullstack";
import SCLogo from "../assets/SCLogo";
import SigninIcon from "../assets/signinIcon";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import UserBalance from "./UserBalance";
class Header extends Nullstack {
  logIn() {
    // log in through Blocto
    fcl.authenticate();
  }

  logout() {
    // log out form Blocto
    fcl.unauthenticate();
  }

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
      </nav>
    );
  }

  renderLogoutIcon() {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.16667 15.5C1.70833 15.5 1.31583 15.3369 0.989167 15.0108C0.663055 14.6842 0.5 14.2917 0.5 13.8333V2.16667C0.5 1.70833 0.663055 1.31583 0.989167 0.989167C1.31583 0.663055 1.70833 0.5 2.16667 0.5H8V2.16667H2.16667V13.8333H8V15.5H2.16667ZM11.3333 12.1667L10.1875 10.9583L12.3125 8.83333H5.5V7.16667H12.3125L10.1875 5.04167L11.3333 3.83333L15.5 8L11.3333 12.1667Z"
          fill="white"
        />
      </svg>
    );
  }

  renderProfile({ user, settings }) {
    if (!user?.loggedIn)
      return (
        <div class="w-full pt-10 px-56 justify-end flex">
          <div class="flex gap-1 w-fit">
            <SigninIcon />
            <button onclick={this.logIn}>Sign in</button>
          </div>
        </div>
      );
    return (
      <div class="w-full pt-10 px-56 justify-end flex gap-6">
        <a href={user.addr === settings.adminAddress ? "/admin" : "/profile"}>
          Addr: {user.addr}
        </a>
        <UserBalance />
        <button onclick={this.logout} class="flex items-center gap-2">
          <LogoutIcon />
          logout
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Profile />
        <header class="flex w-full justify-between py-10 px-56">
          <a href="/">
            <SCLogo />
          </a>
          <Menu />
        </header>
      </div>
    );
  }
}

export default Header;
