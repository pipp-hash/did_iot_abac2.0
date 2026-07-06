import fs from "fs";
import { connectIPFS, uploadFile } from "../../lib/ipfs_client.mjs";

(async () => {
  console.log("\n==========================================");
  console.log("🟦 Step2: IoTデータをIPFSへアップロード");
  console.log("==========================================\n");

  console.log("[1] ローカル IPFS ノードへ接続しています...");
  const ipfs = connectIPFS();
  console.log("   → 接続成功\n");

  const filePath = "demo/data/iot-data.json";
  console.log("[2] IoTデータファイルを読み込みました");
  console.log(` 対象ファイル： ${filePath}\n`);

  console.log("[3] IPFS へデータをアップロード中...\n");
  const cid = await uploadFile(ipfs, filePath);

  fs.writeFileSync("demo/output/ipfs_cid.txt", cid);

  console.log("[4] アップロード完了！");
  console.log(` →取得したIPFS CID: ${cid}\n`);
  console.log("==========================================");
  console.log("🎉 IPFS アップロード処理 完了");
  console.log("==========================================\n");
})();