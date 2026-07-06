import fs from "fs";
import { signWithPrivateKey } from "../../lib/crypto.mjs";
import { getAccounts, createWeb3 } from "../../lib/registry.mjs";

(async () => {
  const accounts = await getAccounts(createWeb3());
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3";

  // B (Admin)
  const vcB = { subject: "did:example:userB", cid: cid, attribute: "Admin" };
  vcB.signature = (await signWithPrivateKey(accounts[0], vcB)).signature;
  fs.writeFileSync("demo/output/vc_userB.json", JSON.stringify(vcB));

  // C (Guest)
  const vcC = { subject: "did:example:userC", cid: cid, attribute: "Guest" };
  vcC.signature = (await signWithPrivateKey(accounts[0], vcC)).signature;
  fs.writeFileSync("demo/output/vc_userC.json", JSON.stringify(vcC));
  console.log("✅ 8. VC発行完了");
})();