import Nullstack from "nullstack";

class MFLogo extends Nullstack {
  render() {
    return (
      <div class="border h-fit w-fit p-1 rounded-sm">
        <svg viewBox="0 0 50 40" width="20" height="1 0" fill="#fff">
          <rect width="50" height="10"></rect>
          <rect y="15" width="50" height="10"></rect>
          <rect y="30" width="50" height="10"></rect>
        </svg>
      </div>
    );
  }
}

export default MFLogo;
