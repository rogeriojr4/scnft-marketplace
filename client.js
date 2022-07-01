import { create } from "ipfs-http-client";
import Nullstack from "nullstack";
import Application from "./src/Application";

const context = Nullstack.start(Application);


context.start = async function start() {
  const client = create("https://ipfs.infura.io:5001/api/v0");
  context.ipfs = client;
};

export default context;
