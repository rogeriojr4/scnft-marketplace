import Nullstack from "nullstack";
import "./tailwind.css";
import "./input.css";
import Home from "./Pages/Home";
import Header from "./Elements/Header";
import Footer from "./Elements/Footer";
import Explore from "./Pages/Explore";
import Admin from "./Pages/Admin/Admin";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import Profile from "./Pages/Profile";

class Application extends Nullstack {
  hydrate(context) {
    fcl
      .config()
      .put("accessNode.api", "https://rest-testnet.onflow.org")
      .put("app.detail.title", "Meta Food Truck")
      .put("app.detail.icon", "https://picsum.photos/id/1010/200/200")
      .put(
        "discovery.wallet",
        "https://fcl-discovery.onflow.org/testnet/authn"
      );
    fcl.currentUser().subscribe((user) => (context.user = user));
  }

  renderHead() {
    return (
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
    );
  }

  render({ settings }) {
    return (
      <main
        class="font-sans bg-black text-white"
        style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.7)"
      >
        <Head />
        <Explore route="/explore" addr={settings.adminAddress} />
        <Profile route="/profile" />
        <Admin route="/admin/*" />
        <Home route="/" />
        <Footer />
      </main>
    );
  }
}

export default Application;
