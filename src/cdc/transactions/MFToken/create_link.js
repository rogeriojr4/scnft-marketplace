export const createLinktx = `// Create Link

import MetaFoodToken from 0x234f923cf4d3d3e7

transaction {
  prepare(acct: AuthAccount) {

    acct.link<&MetaFoodToken.Vault{MetaFoodToken.Receiver, MetaFoodToken.Balance}>(/public/MFReceiver, target: /storage/MFReceiver)

    log("Public Receiver reference created!")
  }
}
`;
