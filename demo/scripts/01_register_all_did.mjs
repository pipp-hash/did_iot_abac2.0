import fs from "fs";
import { createWeb3, getAccounts, getRegistryContract, registerIoTDocument } from "../../lib/registry.mjs";

(async () => {
  console.log("\n==========================================");
  console.log("🟦 Step1: DID ドキュメント生成 & 登録 (A, B, C, Company)");
  console.log("==========================================\n");

  // --- Web3・アカウント・Registry接続(共通化) ---
  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);

  const userA = accounts[0];
  const company = accounts[1];
  const userB = accounts[2]; // 新規追加: UserB
  const userC = accounts[3]; // 新規追加: UserC

  // --- DID Document 作成 ---
  const didDocs = {
    userA: { id: "did:example:userA", controller: userA },
    userB: { id: "did:example:userB", controller: userB },
    userC: { id: "did:example:userC", controller: userC },
    company: { id: "did:example:company", controller: company }
  };

  console.log("[1] DID Document を作成しました。\n");
  console.log(`📄 UserA DID: ${didDocs.userA.id}`);
  console.log(`📄 UserB DID: ${didDocs.userB.id}`);
  console.log(`📄 UserC DID: ${didDocs.userC.id}`);
  console.log(`📄 Company DID: ${didDocs.company.id}\n`);

  // --- ファイル保存 ---
  // 出力先ディレクトリが存在しない場合は作成（念のため）
  const outDir = "demo/output";
  if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(`${outDir}/userA_did.json`, JSON.stringify(didDocs.userA, null, 2));
  fs.writeFileSync(`${outDir}/userB_did.json`, JSON.stringify(didDocs.userB, null, 2));
  fs.writeFileSync(`${outDir}/userC_did.json`, JSON.stringify(didDocs.userC, null, 2));
  fs.writeFileSync(`${outDir}/company_did.json`, JSON.stringify(didDocs.company, null, 2));
  console.log("[2] DID Document をファイルに保存しました。\n");

  // --- ブロックチェーンへの登録 ---
  console.log("[3] ブロックチェーンへ登録中...");
  
  await registerIoTDocument(registry, userA, didDocs.userA.id, didDocs.userA);
  console.log("   → UserA の DID を登録しました。");

  await registerIoTDocument(registry, userB, didDocs.userB.id, didDocs.userB);
  console.log("   → UserB の DID を登録しました。");

  await registerIoTDocument(registry, userC, didDocs.userC.id, didDocs.userC);
  console.log("   → UserC の DID を登録しました。");

  await registerIoTDocument(registry, company, didDocs.company.id, didDocs.company);
  console.log("   → Company の DID を登録しました。\n");

  console.log("==========================================");
  console.log("🎉 DID ドキュメント登録 完了");
  console.log("==========================================\n");
})();