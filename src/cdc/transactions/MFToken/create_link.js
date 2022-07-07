export const createLinktx = `// Create Link

import MetaFoodToken from 0xe82c94d7f35b66c0

transaction {
  prepare(acct: AuthAccount) {

    acct.link<&MetaFoodToken.Vault{MetaFoodToken.Receiver, MetaFoodToken.Balance}>(/public/MFReceiver, target: /storage/MFReceiver)

    log("Public Receiver reference created!")
  }
}
`;
