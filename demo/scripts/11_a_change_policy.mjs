import { getRegistryContract, getAccounts, createWeb3, setAccessPolicy } from "../../lib/registry.mjs";

(async () => {
  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);
  
  // 登録済みのCID
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3";

  console.log("\n🟦 Step 11: UserA によるポリシー変更 (Admin → Guest)");
  
  try {
    // 権限管理: onlyOwner により、所有者(accounts[0])のみが実行可能
    await setAccessPolicy(registry, accounts[0], cid, "Guest");
    console.log("   → ポリシーを 'Guest' に変更しました。");
  } catch (error) {
    console.error("   ❌ ポリシー変更に失敗しました:", error.message);
  }
})();