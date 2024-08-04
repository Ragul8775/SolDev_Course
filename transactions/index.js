"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
require("dotenv/config");
var suppliedToPubKey = process.argv[2] || null;
if (!suppliedToPubKey) {
    console.log("Please provide a public key to send to");
    process.exit(1);
}
var keypair = web3_js_1.Keypair.generate();
var senderKeyPair = keypair.secretKey;
console.log("SECRET KEY", senderKeyPair);
console.log("Public Key", keypair.publicKey.toBase58());
console.log("suppliedToPubKey: ".concat(suppliedToPubKey));
var toPubKey = new web3_js_1.PublicKey(suppliedToPubKey);
var connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
console.log("\u2705 Loaded our own keypair, the destination publicKey, and Connected to Solana");
var transaction = new web3_js_1.Transaction();
var LAMPORTS_TO_SEND = 5000;
var sendSolInstruction = web3_js_1.SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND
});
transaction.add(sendSolInstruction);
function airDropSol(connection, keypair, lamports) {
    return __awaiter(this, void 0, void 0, function () {
        var sirDrop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.requestAirdrop(keypair.publicKey, lamports)];
                case 1:
                    sirDrop = _a.sent();
                    return [4 /*yield*/, connection.confirmTransaction(sirDrop)];
                case 2:
                    _a.sent();
                    console.log("Funded account with ".concat(lamports, " lamports"));
                    return [2 /*return*/];
            }
        });
    });
}
function sendTransaction() {
    return __awaiter(this, void 0, void 0, function () {
        var balance, signature, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, airDropSol(connection, keypair, LAMPORTS_TO_SEND * 2)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getBalance(keypair.publicKey)];
                case 2:
                    balance = _a.sent();
                    console.log("Account Balance: ".concat(balance / web3_js_1.LAMPORTS_PER_SOL));
                    if (balance < LAMPORTS_TO_SEND) {
                        throw new Error("Insufficient FUnds, Account Balance is ".concat(balance));
                    }
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [keypair])];
                case 3:
                    signature = _a.sent();
                    console.log('Finished send', LAMPORTS_TO_SEND, 'to the address', toPubKey);
                    console.log("Transaction signature is ".concat(signature, "!"));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Transaction failed:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
sendTransaction().catch(function (err) {
    console.error(err);
    process.exit(1);
});
