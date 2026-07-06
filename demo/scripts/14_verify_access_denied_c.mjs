import fs from "fs";
import { verifyAndAccess, getRegistryContract, createWeb3, getAccounts } from "../../lib/registry.mjs";

(async () => {
  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);
  const addrA = accounts[0]; // 所有者
  const addrC = accounts[2]; // ユーザーC

  // 1. UserC の VC を読み込む
  const vc = JSON.parse(fs.readFileSync("demo/output/vc_userC.json", "utf8"));
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3"; // 登録したCID

  console.log("\n🟦 Step 14: ポリシー取り消し後の検証 (UserC)");
  
  // 2. verifyAndAccess を実行
  // ポリシーが削除されているため、コントラクトは false を返すはずです
  const allowed = await registry.methods
    .verifyAndAccess(cid, vc.attribute, vc.signature, addrA)
    .call({ from: addrC });

  console.log("   → アクセス要求の結果:", allowed ? "✅ 成功" : "❌ 拒否");

  if (!allowed) {
    console.log("   ✅ 期待通り、アクセスが拒否されました。ポリシー取り消しが正しく機能しています。");
  } else {
    console.error("   ❌ エラー: ポリシーが削除されているのにアクセスが許可されました。");
  }
})();