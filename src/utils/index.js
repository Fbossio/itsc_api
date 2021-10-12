//const Random = require('expo-random');
const solanaWeb3 = require('@solana/web3.js');
const crypto = require('crypto');

const { ethers } = require('ethers');
const { Buffer } = require('buffer');
const ed25519 = require('ed25519-hd-key');
const nacl = require('tweetnacl');

const DERIVATION_PATH = {
    bip44Change: 'bip44Change'
}

const generateMnemonic = () => {
    //const randomBytes = await Random.getRandomBytesAsync(32);
    const randomBytes = crypto.randomBytes(32);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    return mnemonic;
}

const mnemonicToSeed = async (mnemonic) => {
    const bip39 = await require('bip39');
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return Buffer.from(seed).toString('hex');
    
}

const accountFromSeed = (seed, walletIndex, derivationPath, accountIndex=0) => {
    const derivedSeed = deriveSeed(seed, walletIndex, derivationPath, accountIndex);
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);  
    const acc = new solanaWeb3.Keypair(keyPair);    
    return acc;
    
}

const maskedAddress = (address) => {
    if (!address) return;
    return `${address.slice(0,8)}...${address.slice(address.length - 8)}`
}

const deriveSeed = (seed, walletIndex, derivationPath, accountIndex) => {
    const path44Change = `m/44'/501'/${walletIndex}'/0'`;
    return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
}

exports.DERIVATION_PATH = DERIVATION_PATH;
exports.generateMnemonic = generateMnemonic;
exports.mnemonicToSeed = mnemonicToSeed;
exports.accountFromSeed = accountFromSeed;
exports.maskedAddress = maskedAddress;
exports.deriveSeed = deriveSeed;
