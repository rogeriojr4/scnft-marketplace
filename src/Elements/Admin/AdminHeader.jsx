import Nullstack from "nullstack";

class AdminHeader extends Nullstack {
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

  render() {
    return (
      <header class="w-full flex justify-end gap-6 pr-6">
        <div>tap@nft.com</div>
        <button class="flex items-center gap-2">
          <LogoutIcon />
          logout
        </button>
      </header>
    );
  }
}

export default AdminHeader;
