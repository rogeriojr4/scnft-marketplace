export default function arrangeNFTCollection(nfts) {
  const sortedNFTs = nfts.sort((a, b) => {
    return a.id - b.id;
  });

  let pairedNFTs = [];

  sortedNFTs.map((nft) => {
    if (nft.metadata.donateToId) {
      const nftToDonate = nfts.find((a) => a.id === nft.metadata.donateToId);
      if (!nftToDonate) console.log("Donation NFT not found", { nft });

      pairedNFTs.push({ ...nft, nftToDonate });
    }
  });

  console.log(pairedNFTs);

  let groupedNFT = {};

  pairedNFTs.map((nft) => {
    const series = nft.metadata.series;
    if (groupedNFT[series]) {
      groupedNFT[series].push(nft);
      return;
    }
    groupedNFT[series] = [nft];
  });

  console.log(pairedNFTs);

  return groupedNFT;
}
