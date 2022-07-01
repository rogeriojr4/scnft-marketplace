import Nullstack from "nullstack";
import Collection from "../Collection";
import Header from "../Elements/Header";

class Profile extends Nullstack {
  render({ user }) {
    return (
      <div class="w-full">
        <Header />
        <div class="flex flex-col w-full px-36 min-h-[calc(100vh-436px)] flex-wrap bg-[rgb(15,15,15)]">
          <h1 class="text-lg text-bold my-12">Your NFTs:</h1>
          {user && <Collection addr={user.addr} />}
        </div>
      </div>
    );
  }
}

export default Profile;
