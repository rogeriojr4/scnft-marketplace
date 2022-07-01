import Nullstack from "nullstack";
import Collection from "../../Collection";

class NFTs extends Nullstack {
  render({ user }) {
    return (
      <div class="w-full flex flex-col gap-12">
        <div>Your NFT Collection:</div>
        {user?.addr && <Collection addr={user.addr} />}
      </div>
    );
  }
}

export default NFTs;
