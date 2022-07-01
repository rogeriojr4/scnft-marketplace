import Nullstack from "nullstack";
import Market from "../../Market";

class ForSale extends Nullstack {
  render({ user }) {
    return (
      <div class="flex w-full flex-col gap-12">
        <div>NFTs for Sale</div>
        {user && <Market addr={user.addr} />}
      </div>
    );
  }
}

export default ForSale;
