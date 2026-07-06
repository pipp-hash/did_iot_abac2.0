// demo/scripts/09_b_access.mjs
import fs from "fs";
import { verifyAndAccess, getRegistryContract, createWeb3, getAccounts } from "../../lib/registry.mjs";

(async () => {
  const registry = await getRegistryContract(createWeb3());
  const accounts = await getAccounts(createWeb3());
  const addrA = accounts[0];
  const addrB = accounts[2]; // UserB
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3";

  console.log("\n🟦 Step 9: UserB (Admin) によるアクセス検証");
  const vc = JSON.parse(fs.readFileSync("demo/output/vc_userB.json", "utf8"));
  
  const allowed = await verifyAndAccess(registry, addrB, cid, vc.attribute, vc.signature, addrA);
  console.log(`   → UserB(Admin)のアクセス結果: ${allowed ? "✅ 成功" : "❌ 拒否"}`);
})();

// demo/scripts/10_c_access.mjs
import { verifyAndAccess, getRegistryContract, createWeb3, getAccounts } from "../../lib/registry.mjs";

(async () => {
  const registry = await getRegistryContract(createWeb3());
  const accounts = await getAccounts(createWeb3());
  const addrA = accounts[0];
  const addrC = accounts[3]; // UserC
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3";

  console.log("\n🟦 Step 10: UserC (Guest) によるアクセス検証");
  const vc = JSON.parse(fs.readFileSync("demo/output/vc_userC.json", "utf8"));
  
  // ポリシーが "Admin" なので、"Guest" のUserCはここで拒否されるはずです
  const allowed = await verifyAndAccess(registry, addrC, cid, vc.attribute, vc.signature, addrA);
  console.log(`   → UserC(Guest)のアクセス結果: ${allowed ? "✅ 成功" : "❌ 拒否"}`);
})();