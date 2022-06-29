export const createLinktx = `// Create Link

import MetaFoodToken from 0x3135525943078f46

transaction {
  prepare(acct: AuthAccount) {

    acct.link<&MetaFoodToken.Vault{MetaFoodToken.Receiver, MetaFoodToken.Balance}>(/public/MFReceiver, target: /storage/MFReceiver)

    log("Public Receiver reference created!")
  }
}
`;
