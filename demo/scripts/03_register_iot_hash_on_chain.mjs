import fs from "fs";
import { createWeb3, getAccounts, getRegistryContract, registerIoTData } from "../../lib/registry.mjs";

(async () => {
  console.log("\n==========================================");
  console.log("🟦 Step3: IoTデータ(CID) をブロックチェーンへ所有権登録");
  console.log("==========================================\n");

  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);

  const userA = accounts[0];
  console.log("[1] UserA の Ethereum アドレス:", userA, "\n");

  // --- CID 読み込み ---
  const cid = fs.readFileSync("demo/output/ipfs_cid.txt", "utf8").trim();

  console.log("[2] IPFS から取得した CID:");
  console.log(`   → ${cid}\n`);

  console.log("[3] ブロックチェーンへ所有権登録を送信中...\n");

  // --- CID のみ登録（DIDは不要になったため削除） ---
  await registerIoTData(registry, userA, cid);

  console.log("[4] 登録完了！");
  console.log("   → IoTデータ所有者(Owner)をUserAとして保存しました。\n");

  console.log("==========================================");
  console.log("🎉 Step3 完了: IoT データ所有権登録成功");
  console.log("==========================================\n");
})();