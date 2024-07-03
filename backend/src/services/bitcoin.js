import bitcoinRPC from 'bitcoin-core';

const client = new bitcoinRPC({
   host: process.env.BTC_HOST,
   port: process.env.BTC_PORT,
   username: process.env.BTC_USERNAME,
   password: process.env.BTC_PASSWORD,
   timeout: 20000,
});

async function main() {
   const batch = [
      { method: 'getnettotals', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
      { method: 'getmempoolinfo', parameters: [] },
   ];

   const [netTotals, networkInfo, mempoolInfo] = await client.command(batch);

   return {
      netTotals,
      networkInfo,
      mempoolInfo
   }
}

async function node() {
   const batch = [
      { method: 'uptime', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
   ];
   const [uptime, networkInfo] = await client.command(batch);

   return {
      uptime,
      networkInfo
   }
}

async function blockchain() {
   const batch = [
      { method: 'getblockchaininfo', parameters: [] },
      { method: 'getmininginfo', parameters: [] },
   ];
   const [blockchainInfo, miningInfo] = await client.command(batch);

   return {
      blockchainInfo,
      miningInfo
   }
}

async function network() {
   const batch = [
      { method: 'getnettotals', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
   ];
   const [netTotals, networkInfo] = await client.command(batch);

   return {
      netTotals,
      networkInfo
   }
}

async function peers() {
   const peers = await client.command('getpeerinfo');

   return peers;
}

export default {
   main,
   node,
   blockchain,
   network,
   peers
};