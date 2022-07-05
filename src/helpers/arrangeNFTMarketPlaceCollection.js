export default function arrangeNFTMarketPlace(nfts) {
  let nftGrouped = {};

  Object.values(nfts).map(({ nftRef, price }) => {
    const metadata = nftRef.metadata;

    if (!nftRef.metadata.donateToId) return;

    if (nftGrouped[metadata.series]) {
      nftGrouped[metadata.series].nftIds.push(nftRef.id);
      return;
    }

    nftGrouped[metadata.series] = {
      nftRef,
      price,
      nftIds: [nftRef.id],
    };
  });

  return nftGrouped;
}
