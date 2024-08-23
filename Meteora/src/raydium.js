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
var raydium_sdk_1 = require("@raydium-io/raydium-sdk"); // Replace with the actual path to the layout
var connection = new web3_js_1.Connection('https://mainnet.helius-rpc.com/?api-key=8e4f5e6e-24e3-4b85-ab12-9ccf973f00d7');
var getLpMintInfo = function (lpPool) { return __awaiter(void 0, void 0, void 0, function () {
    var info, poolState, lpMint, parsedAccInfo, mintInfo;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, connection.getAccountInfo(new web3_js_1.PublicKey(lpPool))];
            case 1:
                info = _d.sent();
                if (!info)
                    throw new Error('Failed to fetch account info');
                poolState = raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4.decode(info.data);
                lpMint = poolState.lpMint.toBase58();
                return [4 /*yield*/, connection.getParsedAccountInfo(new web3_js_1.PublicKey(lpMint))];
            case 2:
                parsedAccInfo = _d.sent();
                mintInfo = (_c = (_b = (_a = parsedAccInfo === null || parsedAccInfo === void 0 ? void 0 : parsedAccInfo.value) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.parsed) === null || _c === void 0 ? void 0 : _c.info;
                if (!mintInfo)
                    throw new Error('Failed to parse account info');
                return [2 /*return*/, { poolState: poolState, mintInfo: mintInfo }];
        }
    });
}); };
var calculateLpSupply = function (poolState, mintInfo) {
    var lpReserve = poolState.lpReserve.toNumber() / Math.pow(10, mintInfo === null || mintInfo === void 0 ? void 0 : mintInfo.decimals);
    var actualSupply = (mintInfo === null || mintInfo === void 0 ? void 0 : mintInfo.supply) / Math.pow(10, mintInfo === null || mintInfo === void 0 ? void 0 : mintInfo.decimals);
    var maxLpSupply = Math.max(actualSupply, lpReserve - 1);
    var burnAmt = maxLpSupply - actualSupply;
    return { burnAmt: burnAmt, maxLpSupply: maxLpSupply };
};
var lpPromises = function (lpPool) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, poolState, mintInfo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getLpMintInfo(lpPool)];
            case 1:
                _a = _b.sent(), poolState = _a.poolState, mintInfo = _a.mintInfo;
                return [2 /*return*/, calculateLpSupply(poolState, mintInfo)];
            case 2:
                error_1 = _b.sent();
                console.error("Failed to process liquidity pool: ".concat(lpPool), error_1);
                return [2 /*return*/, { burnAmt: 0, maxLpSupply: 0 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Test the function
lpPromises('FRhB8L7Y9Qq41qZXYLtC2nw8An1RJfLLxRF2x9RwLLMo').then(function (result) { return console.log(result); });
