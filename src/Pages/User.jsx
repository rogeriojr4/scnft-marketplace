import Nullstack from "nullstack";
import MFLogo from "../assets/MFLogo";
import Collection from "../Collection";
import FadedBackground from "../Elements/FadedBackground";
import Header from "../Elements/Header";

class User extends Nullstack {

  renderProfile({user}){
    return(
      <div class="w-full px-56 flex items-center gap-12 z-10 sticky pb-12">
        <div class="w-[97px] h-[97px] bg-yellow-400 flex justify-center items-center">
          <MFLogo />
        </div>
        {user?.addr}
      </div>
    )
  }
  
  
  render({user}) {
    return (
      <div>
        <FadedBackground bgUrl="/assets/background/public-profile.png">
          <Header />
          <Profile />
        </FadedBackground>
        {user && <Collection addr={user.addr} />}
        
      </div>
    );
  }
}

export default User;
