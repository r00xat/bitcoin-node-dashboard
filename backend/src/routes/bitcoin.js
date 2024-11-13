import express from 'express';
import bitcoinService from '../services/bitcoin.js';
import { getStat } from '../database/db.js';

const router = express.Router();

router.get('/home', async function (req, res, next) {
   try {
      const { 
         netTotals, 
         networkInfo, 
         mempoolInfo, 
         uptime, 
         blockchainInfo, 
         miningInfo, 
         peers 
      } = await bitcoinService.home();

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
         main: {
            totalConnections: networkInfo.connections,
            totalUploadTraffic: netTotals.totalbytessent,
            totalDownloadTraffic: netTotals.totalbytesrecv,
            txInMeempool: mempoolInfo.size,
         },
         node: {
            client: networkInfo.subversion.replace(/^\/+/, '').replace(/\/+$/, ''),
            protocolVersion: networkInfo.protocolversion,
            port: process.env.BTC_PORT,
            services: networkInfo.localservicesnames,
            uptime,
         },
         blockchain: {
            chain: miningInfo.chain,
            size: blockchainInfo.size_on_disk,
            difficulty: miningInfo.difficulty,
            hashRate: miningInfo.networkhashps,
            lastBlock: blockchainInfo.blocks,
            lastBlockTime: blockchainInfo.time
         },
         networkInfo: {
            uploadTarget: {
               target: netTotals.uploadtarget.target,
               targetReached: netTotals.uploadtarget.target_reached,
            },
            networks: {
               ipv4: {
                  available: networkInfo.networks.find(network => network.name === 'ipv4').reachable,
                  address: addresses.ipv4,
               },
               ipv6: {
                  available: networkInfo.networks.find(network => network.name === 'ipv6').reachable,
                  address: addresses.ipv6,
               },
               tor: {
                  available: networkInfo.networks.find(network => network.name === 'onion').reachable,
                  address: addresses.tor,
               },
               i2p: {
                  available: networkInfo.networks.find(network => network.name === 'i2p').reachable,
                  address: addresses.i2p,
               },
               cjdns: {
                  available: networkInfo.networks.find(network => network.name === 'cjdns').reachable,
                  address: addresses.cjdns,
               }
            }
         },
         peers: peers.map(peer => {
            return {
               id: peer.id,
               address: peer.addr,
               services: peer.servicesnames,
               bytessent: peer.bytessent,
               bytesrecv: peer.bytesrecv,
               totalbytes: peer.bytessent + peer.bytesrecv,
               conectionTime: peer.conntime,
               version: peer.version,
               subversion: peer.subver.replace(/^\/+/, '').replace(/\/+$/, ''),
               connection_type: peer.connection_type,
               inbound: peer.inbound,
            }
         })
      });
   } catch (error) {
      return next(error);
   }
});

router.get('/peers', async function (req, res, next) {
   try {
      const { peers, banned } = await bitcoinService.peers();

      res.json({
         allTimeUploadTraffic: await getStat("allTimeBytesSent"),
         allTimeDownloadTraffic: await getStat("allTimeBytesRecv"),
         banned: banned.length,
         peers: peers.map(peer => {
            return {
               id: peer.id,
               address: peer.addr,
               services: peer.servicesnames,
               bytessent: peer.bytessent,
               bytesrecv: peer.bytesrecv,
               totalbytes: peer.bytessent + peer.bytesrecv,
               conectionTime: peer.conntime,
               version: peer.version,
               subversion: peer.subver.replace(/^\/+/, '').replace(/\/+$/, ''),
               connection_type: peer.connection_type,
               inbound: peer.inbound,
            }
         })
      });
   } catch (error) {
      return next(error);
   }
});

router.use((error, req, res, next) => {
   console.error(error);

   switch (error.code) {
      case 'ECONNREFUSED':
         return res.status(504).json({ error: 'Connection refused by host' });
      case 'ETIMEDOUT':
         return res.status(504).json({ error: 'Request Timeout' });
      case 401:
         return res.status(504).json({ error: 'Invalid RPC credentials' });
      default:
         return res.status(504).json({ error: 'Internal Server Error' });
   }
});

export default router;
