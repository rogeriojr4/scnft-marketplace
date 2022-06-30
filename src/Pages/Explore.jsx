import Nullstack from "nullstack";
import SearchIcon from "../assets/SearchIcon";
import Header from "../Elements/Header";
import NFTCard from "../Elements/NFTCard";

class Explore extends Nullstack {
  render() {
    return (
      <div class="flex flex-col gap-36 items-center">
        <Header />
        <div class="w-full px-56 flex flex-col items-center">
          <div class="max-w-xl flex flex-col items-center">
            <h1 class="text-lg font-bold">Explore the starving children</h1>
            <div class="relative w-full border-b-2 border-white">
              <SearchIcon clazz="absolute top-[10px] left-3" />
              <input
                class="bg-gray-900 w-full text-md p-2"
                type="search"
                name="search"
                id="search-input"
              />
            </div>
          </div>
          <div class="flex flex-wrap w-full justify-around gap-8 mt-12 mb-2">
            {Array(12)
              .fill(0)
              .map(() => {
                return <NFTCard />;
              })}
          </div>
        </div>
          <button class="flex w-full justify-center gap-2 items-center mb-12">
            Load more{" "}
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 8.25417L0 1.25417L1.25417 0L7 5.775L12.7458 0.0291662L14 1.28333L7 8.25417Z"
                fill="white"
              />
            </svg>
          </button>
      </div>
    );
  }
}

export default Explore;
