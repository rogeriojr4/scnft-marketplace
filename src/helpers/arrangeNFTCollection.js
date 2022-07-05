export default function arrangeNFTCollection(nfts) {
  let pairedNFTs = [];

  nfts.map((nft) => {
    if (nft.metadata.donateToId) {
      const nftToDonate = nfts.find((a) => a.id === nft.metadata.donateToId);
      if (!nftToDonate) console.log("Donation NFT not found", { nft });

      pairedNFTs.push({ ...nft, nftToDonate });
    }
  });

  let groupedNFT = {};

  nfts.map((nft) => {
    const series = nft.metadata.series;
    if (groupedNFT[series]) {
      groupedNFT[series].push(nft);
      return;
    }
    groupedNFT[series] = [nft];
  });
  
  return groupedNFT;
}
