const express = require('express')
const router = express.Router();
const config = require('config');
//const web3 =  require("@solana/web3.js");
const auth = require('../../middleware/auth');
const utils = require('../utils');


// @route       GET api/wallet
// @desc        Obtener dirección de wallet
// @access      ruta privada
router.get('/', auth, async (req, res) => {

    /*
    try {
        const keyPair = web3.Keypair.generate();
        const { publicKey, secretKey } = keyPair;
        
        return res.json({'Public_Key': publicKey._bn, 'Secret_Key': secretKey})
        
    } catch (error) {
        console.log(error)
    }
    */
   //return res.json({mnemonic: utils.generateMnemonic()})
   const mnemonic = await utils.generateMnemonic();
   const mnemonicToSeed = await utils.mnemonicToSeed(mnemonic);
   const accountFromSeed = await utils.accountFromSeed(mnemonicToSeed, '0');
   
   //const address = await utils.maskedAddress(accountFromSeed._keypair.publickey.toString())
   const public = accountFromSeed._keypair.publicKey;
   const { publicKey, secretKey } = accountFromSeed;
   console.log(accountFromSeed);
   //console.log(publicKey);
   return res.json({publickey: accountFromSeed._keypair.publicKey});
    
})

module.exports = router;