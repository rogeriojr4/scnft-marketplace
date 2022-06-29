import Nullstack from "nullstack";
import "./tailwind.css";
import "./input.css";
import Home from "./Pages/Home";
import Header from "./Elements/Header";

class Application extends Nullstack {
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

  render() {
    return (
      <main
        class="font-sans bg-black px-64 py-10 text-white"
        style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.7)"
      >
        <Head />
        <Header />
        <Home route="/" />
      </main>
    );
  }
}

export default Application;
