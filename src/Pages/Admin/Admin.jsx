import Nullstack from "nullstack";
import SCLogo from "../../assets/SCLogo";
import AdminHeader from "../../Elements/Admin/AdminHeader";
import CreateNFT from "./CreateNFT";
import NFTs from "./NFTs";
import ForSale from "./ForSale";
import MintTokens from "./MintTokens";

class Admin extends Nullstack {
  renderAdminNavBar({ router }) {
    const activeStyle =
      "background: linear-gradient(90deg, rgba(255, 199, 1, 0.28) 0%, rgba(255, 199, 1, 0) 100%);";

    return (
      <nav class="flex pt-8 flex-col min-h-[calc(100vh-226px)] scroll-auto w-56 items-center">
        <a href="/">
          <SCLogo />
        </a>
        <a
          class="hover:underline bg-contrast w-fit text-sm text-black font-bold py-2 px-4 my-5"
          href="/admin/createNFT"
        >
          Create NFT
        </a>
        <a
          class="hover:underline w-full text-center py-2"
          style={router.url.includes("NFT") ? activeStyle : ""}
          href="/admin/NFT"
        >
          NFTs
        </a>
        {/* <a
          class="hover:underline w-full text-center py-2"
          style={router.url.includes("forSale") ? activeStyle : ""}
          href="/admin/forSale"
        >
          For Sale
        </a> */}
        <a
          class="hover:underline w-full text-center py-2"
          style={router.url.includes("mintTokens") ? activeStyle : ""}
          href="/admin/mintTokens"
        >
          Faucet
        </a>
        {/* <a class="hover:underline w-full text-center py-2" href="/admin/traits">
          Traits
        </a>
        <a
          class="hover:underline w-full text-center py-2"
          href="/admin/account"
        >
          Account
        </a> */}
      </nav>
    );
  }

  render() {
    return (
      <div class="flex" style="text-shadow: none;">
        <AdminNavBar />
        <div class="w-[calc(100%-14rem)] pt-8 bg-[#111111]">
          <AdminHeader />
          <div class="p-8 w-full">
            <CreateNFT route="/admin/createNFT" />
            <NFTs route="/admin/NFT" />
            <ForSale route="/admin/forSale" />
            <MintTokens route="/admin/mintTokens" />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
