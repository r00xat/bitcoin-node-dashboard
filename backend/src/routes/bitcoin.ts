import express from 'express';
import bitcoinRPC from 'bitcoin-core';

const client = new bitcoinRPC({
   host: process.env.BTC_HOST,
   port: process.env.BTC_PORT,
   username: process.env.BTC_USERNAME,
   password: process.env.BTC_PASSWORD,
});

const router = express.Router();

router.get('/main', async function (req, res, next) {
   const batch = [
      { method: 'getnettotals', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
      { method: 'listbanned', parameters: [] },
      { method: 'getmempoolinfo', parameters: [] },
      { method: 'getblockcount', parameters: [] },
   ];

   const [netTotals, networkInfo, listBanned, mempoolInfo, blockCount] =
      await client.command(batch);

   res.json({
      sent: netTotals.totalbytessent,
      received: netTotals.totalbytesrecv,
      connections: networkInfo.connections,
      bannedPeersCount: listBanned.length,
      mempool: mempoolInfo.size,
      blocks: blockCount,
   });
});

router.get('/node', async function (req, res, next) {
   const batch = [
      { method: 'uptime', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
   ];

   const [uptime, networkInfo] = await client.command(batch);

   const networks = {
      ipv4: networkInfo.networks.find(network => network.name === 'ipv4'),
      ipv6: networkInfo.networks.find(network => network.name === 'ipv6'),
      onion: networkInfo.networks.find(network => network.name === 'onion'),
      i2p: networkInfo.networks.find(network => network.name === 'i2p'),
      cjdns: networkInfo.networks.find(network => network.name === 'cjdns'),
   }

   res.json({
      client: networkInfo.subversion.replaceAll('/', ''),
      protocolVersion: networkInfo.protocolversion,
      port: process.env.BTC_PORT,
      services: networkInfo.localservicesnames,
      uptime,
      networks: {
         ipv4: networks.ipv4 ? networks.ipv4.reachable : false,
         ipv6: networks.ipv6 ? networks.ipv6.reachable : false,
         onion: networks.onion ? networks.onion.reachable : false,
         i2p: networks.i2p ? networks.i2p.reachable : false,
         cjdns: networks.cjdns ? networks.cjdns.reachable : false
      }
   });
});

export default router;
