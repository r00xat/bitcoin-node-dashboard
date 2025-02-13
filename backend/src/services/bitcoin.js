import bitcoinRPC from 'bitcoin-core';
import path from 'path';
import fs from 'fs';

const BTC_PORT = process.env.BTC_PORT || 8332;
const BTC_HOST = process.env.BTC_HOST || "localhost";
var BTC_USERNAME = process.env.BTC_USERNAME;
var BTC_PASSWORD = process.env.BTC_PASSWORD;
const BITCOIND_DIR = process.env.BITCOIND_DIR;

if (BITCOIND_DIR) {
   var auth = getAuthFromCookieFile(BITCOIND_DIR);
   BTC_USERNAME = auth[0];
   BTC_PASSWORD = auth[1];
}

function getAuthFromCookieFile(btcDir) {
   const cookiePath = path.join(btcDir, ".cookie");
   if (fs.existsSync(cookiePath)) {
      try {
         var cookie = fs.readFileSync(cookiePath, "utf8");
         var auth = cookie.split(':');
         if (auth.length != 2) throw new Error("Error: auth cookie doesn't contain colon");
         return auth;
      } catch (e) {
         throw new Error(e);
      }
   } else {
      throw new Error("Cookie file not found");
   }
}

export const client = new bitcoinRPC({
   host: BTC_HOST,
   port: BTC_PORT,
   username: BTC_USERNAME,
   password: BTC_PASSWORD,
   timeout: 120000,
});

async function home() {
   const batch = [
      { method: 'getnettotals', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
      { method: 'getmempoolinfo', parameters: [] },
      { method: 'uptime', parameters: [] },
      { method: 'getblockchaininfo', parameters: [] },
      { method: 'getmininginfo', parameters: [] },
      { method: 'getpeerinfo', parameters: [] },
   ];

   const [
      netTotals,
      networkInfo, 
      mempoolInfo, 
      uptime, 
      blockchainInfo, 
      miningInfo, 
      peers
   ] = await client.command(batch);

   return {
      netTotals,
      networkInfo, 
      mempoolInfo, 
      uptime, 
      blockchainInfo, 
      miningInfo, 
      peers
   }
}

async function peers() {
   const batch = [
      { method: 'getpeerinfo', parameters: [] },
      { method: 'listbanned', parameters: [] },
   ];

   const [peers, banned] = await client.command(batch);

   return {
      peers,
      banned
   };
}

export default {
   home,
   peers
};