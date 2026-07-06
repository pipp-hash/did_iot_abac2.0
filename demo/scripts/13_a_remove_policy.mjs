import { getRegistryContract, getAccounts, createWeb3, removeAccessPolicy } from "../../lib/registry.mjs";

(async () => {
  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);
  
  // 登録済みのCID
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3";

  console.log("\n🟦 Step 13: UserA によるポリシー取り消し");
  
  try {
    // 所有者のみが実行可能
    await removeAccessPolicy(registry, accounts[0], cid);
    console.log("   → ポリシーを削除しました。すべてのアクセス要求が拒否されるようになります。");
  } catch (error) {
    console.error("   ❌ ポリシー取り消しに失敗しました:", error.message);
  }
})();