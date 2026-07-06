// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDRegistry {
    struct DIDDoc { string did; string doc; }
    mapping(address => DIDDoc[]) public didDocuments;
    mapping(string => string) public accessPolicies;
    mapping(string => address) public cidOwners;

    event PolicyUpdated(string cid, string requiredAttribute);

    modifier onlyOwner(string memory cid) {
        require(msg.sender == cidOwners[cid], "Not the owner of this data");
        _;
    }

    function registerDIDDocument(string memory did, string memory doc) public {
        didDocuments[msg.sender].push(DIDDoc(did, doc));
    }

    function registerIoTData(string memory cid) public {
        cidOwners[cid] = msg.sender;
    }

    function setAccessPolicy(string memory cid, string memory requiredAttribute) public onlyOwner(cid) {
        accessPolicies[cid] = requiredAttribute;
        emit PolicyUpdated(cid, requiredAttribute);
    }

    function removeAccessPolicy(string memory cid) public onlyOwner(cid) {
        delete accessPolicies[cid];
        emit PolicyUpdated(cid, "");
    }

    // VC(署名)を検証してアクセスを判断する
    function verifyAndAccess(
        string memory cid,
        string memory attribute,
        bytes memory signature,
        address issuerA
    ) public view returns (bool) {
        // 1. ポリシー確認
        if (keccak256(bytes(accessPolicies[cid])) != keccak256(bytes(attribute))) return false;

        // 2. 署名検証：cid, attribute, msg.sender をすべて署名対象に含めて検証
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, attribute, cid));
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        
        return recoverSigner(ethSignedHash, signature) == issuerA;
    }

    function recoverSigner(bytes32 hash, bytes memory sig) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(sig);
        return ecrecover(hash, v, r, s);
    }

    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65);
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}