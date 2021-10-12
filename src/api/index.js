const solanaWeb3 = require("@solana/web3.js");
const config = require("config");
const { PublicKey } = require("@solana/web3.js");
const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { accountFromSeed } = require("../utils");

const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL;
const SPL_TOKEN = "FyUYPbYiEFjC5LG4oYqdBfiA6PwgC78kbVyWAoYkwMTC";

const createConnection = () => {
  return new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl(config.get("clusterApiUrl"))
  );
};

const getBalance = async (publicKey) => {
  const connection = createConnection();
  const _publickey = publicKeyFromString(publicKey);

  const lamports = await connection.getBalance(_publickey).catch((err) => {
    console.error(`Error: ${err}`);
  });

  const sol = lamports / LAMPORTS_PER_SOL;
  return sol;
};

const getHistory = async (publicKeyString, options = { limit: 20 }) => {
  const connection = createConnection();
  const history = await connection.getConfirmedSignaturesForAddress2(
    publicKeyFromString(publicKeyString),
    options
  );

  return history;
};

const getSolanaPrice = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data.solana.usd;
};

const requestAirDrop = async (publicKeyString) => {
  const connection = createConnection();
  const airdropSignature = await connection.requestAirdrop(
    publicKeyFromString(publicKeyString),
    LAMPORTS_PER_SOL
  );
  const signature = await connection.confirmTransaction(airdropSignature);
  return signature;
};

const publicKeyFromString = (publicKeyString) => {
  return new solanaWeb3.PublicKey(publicKeyString);
};

const transaction = async (from, to, amount) => {
  console.log("Executing transaction...");
  console.log(amount);

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: publicKeyFromString(from.keyPair.publicKey.toString()),
      toPubkey: publicKeyFromString(to),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  // Sign transaction, broadcast, and confirm
  const connection = createConnection();
  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from.keyPair]
  );
  console.log("SIGNATURE", signature);
};

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const findAssociatedTokenAddress = async (walletAddress, tokenMintAddress) => {
  return (
    await solanaWeb3.publicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
};

const getBalance = async (publicKey, splToken) => {
  const connection = createConnection();
  const account = await findAssociatedTokenAddress(
    publicKeyFromString(publicKey),
    publicKeyFromString(splToken)
  );

  try {
    const balance = await connection.getTokenAccountBalance(
      publicKeyFromString(account.toString())
    );
    return balance.value.amount / LAMPORTS_PER_SOL;
  } catch (e) {
    return 0;
  }
};

exports.LAMPORTS_PER_SOL = LAMPORTS_PER_SOL
exports.SPL_TOKEN = SPL_TOKEN
exports.createConnection = createConnection
exports.getBalance = getBalance
exports.getHistory = getHistory
exports.getSolanaPrice = getSolanaPrice
exports.publicKeyFromString = publicKeyFromString
exports.requestAirDrop = requestAirDrop
exports.transaction = transaction
exports.getTokenBalance = getTokenBalance