import express from 'express';
import bitcoinRPC from 'bitcoin-core';

const client = new bitcoinRPC({
   host: process.env.BTC_HOST,
   port: process.env.BTC_PORT,
   username: process.env.BTC_USERNAME,
   password: process.env.BTC_PASSWORD,
   timeout: 20000,
});

const router = express.Router();

router.get('/main', async function (req, res, next) {
   const batch = [
      { method: 'getnettotals', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
      { method: 'getmempoolinfo', parameters: [] },
   ];

   let netTotals, networkInfo, mempoolInfo;

   try {
      [netTotals, networkInfo, mempoolInfo] = await client.command(batch);
   } catch (error) {
      return next(error);
   }

   res.json({
      sent: netTotals.totalbytessent,
      received: netTotals.totalbytesrecv,
      connections: networkInfo.connections,
      mempool: mempoolInfo.size,
   });
});

router.get('/node', async function (req, res, next) {
   const batch = [
      { method: 'uptime', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
   ];

   let uptime, networkInfo;

   try {
      [uptime, networkInfo] = await client.command(batch);
   } catch (error) {
      return next(error);
   }

   res.json({
      client: networkInfo.subversion.replace(/^\/+/, '').replace(/\/+$/, ''),
      protocolVersion: networkInfo.protocolversion,
      port: process.env.BTC_PORT,
      services: networkInfo.localservicesnames,
      uptime,
   });
});

router.get('/blockchain', async function (req, res, next) {

   const batch = [
      { method: 'getblockchaininfo', parameters: [] },
      { method: 'getmininginfo', parameters: [] },
   ];

   let blockchainInfo, miningInfo;

   try {
      [blockchainInfo, miningInfo] = await client.command(batch);
   } catch (error) {
      return next(error);
   }

   res.json({
      chain: miningInfo.chain,
      size: blockchainInfo.size_on_disk,
      difficulty: miningInfo.difficulty,
      hashRate: miningInfo.networkhashps,
      lastBlock: blockchainInfo.blocks,
      lastBlockTime: blockchainInfo.time
   })
});

router.get('/network', async function (req, res, next) {
   const batch = [
      { method: 'getnettotals', parameters: [] },
      { method: 'getnetworkinfo', parameters: [] },
   ];

   let getnettotals, networkInfo;
   try {
      [getnettotals, networkInfo] = await client.command(batch);
   } catch (error) {
      return next(error);
   }

   const networks = {
      ipv4: networkInfo.networks.find(network => network.name === 'ipv4'),
      ipv6: networkInfo.networks.find(network => network.name === 'ipv6'),
      onion: networkInfo.networks.find(network => network.name === 'onion'),
      i2p: networkInfo.networks.find(network => network.name === 'i2p'),
      cjdns: networkInfo.networks.find(network => network.name === 'cjdns'),
   }

   const addresses = {
      ipv4: undefined,
      ipv6: undefined,
      tor: undefined,
      i2p: undefined,
      cjdns: undefined,
   };

   const ipv4Regex = '^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$';
   const ipv6Regex = '(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))';
   const torV2Regex = '^[0-9a-z]{16}\.onion$';
   const torV3Regex = '^[0-9a-z]{56}\.onion$';
   const i2pRegex = '*\.i2p$/';

   networkInfo.localaddresses.forEach(addObj => {
      if (addObj.address.match(ipv4Regex)) {
         addresses.ipv4 = addObj.address;
      } else if (addObj.address.match(ipv6Regex)) {
         addresses.ipv6 = addObj.address;
      } else if (addObj.address.match(torV2Regex) || addObj.address.match(torV3Regex)) {
         addresses.tor = addObj.address;
      } else if (addObj.address.match(i2pRegex)) {
         addresses.i2p = addObj.address;
      }
   });

   res.json({
      totalbytessent: getnettotals.totalbytessent,
      uploadtarget: {
         target: getnettotals.uploadtarget.target,
         target_reached: getnettotals.uploadtarget.target_reached,
      },
      networks: {
         ipv4: {
            available: networks.ipv4 ? networks.ipv4.reachable : false,
            address: addresses.ipv4,
         },
         ipv6: {
            available: networks.ipv6 ? networks.ipv6.reachable : false,
            address: addresses.ipv6,
         },
         tor: {
            available: networks.onion ? networks.onion.reachable : false,
            address: addresses.tor,
         },
         i2p: {
            available: networks.i2p ? networks.i2p.reachable : false,
            address: addresses.i2p,
         },
         cjdns: {
            available: networks.cjdns ? networks.cjdns.reachable : false,
            address: addresses.cjdns,
         }
      }
   });
});

router.get('/peers', async function (req, res, next) {
   let peers;
   try {
      peers = await client.getPeerInfo();
   } catch (error) {
      return next(error);
   }

   const returnPeers = peers.map(peer => {
      return {
         id: peer.id,
         address: peer.addr,
         services: peer.servicesnames,
         bytessent: peer.bytessent,
         bytesrecv: peer.bytesrecv,
         conectionTime: peer.conntime,
         version: peer.version,
         subversion: peer.subver.replace(/^\/+/, '').replace(/\/+$/, ''),
         connection_type: peer.connection_type,
      }
   });

   res.json(returnPeers);
});


router.use((error, req, res, next) => {
   console.error("error.message: ", error.message);
   console.error("error.code: ", error.code);

   console.error("error: ", error);

   switch (error.code) {
      case 'ECONNREFUSED':
         return res.status(504).json({ error: 'Connection refused by bitcoin host' });
      case 'ETIMEDOUT':
         return res.status(504).json({ error: 'Request Timeout' });
      case 401:
         return res.status(504).json({ error: 'Invalid RPC credentials' });
      default:
         return res.status(504).json({ error: 'Internal Server Error' });
   }
});

export default router;
