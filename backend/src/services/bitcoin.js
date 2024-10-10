import bitcoinRPC from 'bitcoin-core';

export const client = new bitcoinRPC({
   host: process.env.BTC_HOST,
   port: process.env.BTC_PORT,
   username: process.env.BTC_USERNAME,
   password: process.env.BTC_PASSWORD,
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

export default {
   home
};