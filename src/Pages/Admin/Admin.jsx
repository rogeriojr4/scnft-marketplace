import Nullstack from "nullstack";
import SCLogo from "../../assets/SCLogo";
import AdminHeader from "../../Elements/Admin/AdminHeader";

class Admin extends Nullstack {
  renderAdminNavBar() {
    return (
      <nav class="flex flex-col h-[calc(100vh-226px)] scroll-auto w-56 gap-5 items-center">
        <a href="/">
          <SCLogo />
        </a>
        <a
          class="hover:underline bg-contrast w-fit text-sm text-black font-bold py-2 px-4"
          href="/admin/createNFT"
        >
          Create NFT
        </a>
        <a class="hover:underline" href="/admin/NFT">
          NFTs
        </a>
        <a class="hover:underline" href="/admin/collections">
          Collections
        </a>
        <a class="hover:underline" href="/admin/traits">
          Traits
        </a>
        <a class="hover:underline" href="/admin/account">
          Account
        </a>
      </nav>
    );
  }

  render() {
    return (
      <div class="flex pt-8">
        <AdminNavBar />
        <div class="w-[calc(100%-14rem)]">
          <AdminHeader />
        </div>
      </div>
    );
  }
}

export default Admin;
