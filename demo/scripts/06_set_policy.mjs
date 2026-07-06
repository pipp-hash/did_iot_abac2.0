import { getRegistryContract, getAccounts, createWeb3, setAccessPolicy } from "../../lib/registry.mjs";
(async () => {
  const accounts = await getAccounts(createWeb3());
  const registry = await getRegistryContract(createWeb3());
  const cid = "QmRh3fCVx3AuedwpND6TRKpZKVo9TdbtK8cjNDxP9d7TS3";
  
  await setAccessPolicy(registry, accounts[0], cid, "Admin");
  console.log("✅ 6. Adminポリシー設定完了");
})();