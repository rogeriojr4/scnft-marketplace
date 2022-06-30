import Nullstack from "nullstack";

class ThirdSection extends Nullstack {
  renderImageDescription({ title, imageSrc, children }) {
    return (
      <div class="w-full flex flex-col items-center text-center">
        <img src={imageSrc} alt={title} />
        <h2 class="font-bold mt-4 mb-2">{title}</h2>
        <p>{children}</p>
      </div>
    );
  }

  render() {
    return (
      <section class="flex flex-col items-center">
        <h1 class="text-lg font-bold text-center max-w-xl">
          Don't let these weary children lose their
          <span class="bg-contrast text-black"> last shreds of hope</span>{" "}
        </h1>
        <div class="flex gap-12 justify-center mt-36">
          <ImageDescription
            title="Unimaginable poverty"
            imageSrc="/assets/sec_3_image1.png"
          >
            There are children raised in unimaginable poverty. Not only are they
            deprived of clean water, nutritious food, reliable electricity and
            educational opportunities... but they also lack NFTs.
          </ImageDescription>
          <ImageDescription
            title="They need you"
            imageSrc="/assets/sec_3_image2.png"
          >
            Please offer your support. Even if a warlord steals their family’s
            smartphone, you will have provided a “token” of non-fungible
            support.
          </ImageDescription>
          <ImageDescription
            title="A bottle of hope"
            imageSrc="/assets/sec_3_image3.png"
          >
            Every dehydrated child can receive an NFT of a water bottle today,
            if only you can find it in your heart and crypto-wallet to give.
          </ImageDescription>
        </div>
      </section>
    );
  }
}

export default ThirdSection;
