import { client } from "./bitcoin.js";
import { insertOrUpdateStat, getStat } from "../database/db.js";

export async function storeStats() {
   try {
      console.log(new Date().toISOString() + " Storing stats...");

      const netTotals = await client.command("getnettotals");
      const uptime = await client.command("uptime");

      const allTimeBytesRecvDB = await getStat("allTimeBytesRecv") || 0;
      const allTimeBytesSentDB = await getStat("allTimeBytesSent") || 0;
      const lastUptimeDB = await getStat("uptime") || 0;

      let currentBytesRecv = netTotals.totalbytesrecv;
      let currentBytesSent = netTotals.totalbytessent;

      let updatedTotalBytesRecv = allTimeBytesRecvDB;
      let updatedTotalBytesSent = allTimeBytesSentDB;

      if (uptime < lastUptimeDB) {
         updatedTotalBytesRecv += currentBytesRecv;
         updatedTotalBytesSent += currentBytesSent;
      } else {
         updatedTotalBytesRecv += (currentBytesRecv - (await getStat("lastBytesRecv") || 0));
         updatedTotalBytesSent += (currentBytesSent - (await getStat("lastBytesSent") || 0));
      }

      insertOrUpdateStat("allTimeBytesRecv", updatedTotalBytesRecv);
      insertOrUpdateStat("allTimeBytesSent", updatedTotalBytesSent);
      insertOrUpdateStat("uptime", uptime);
      insertOrUpdateStat("lastBytesRecv", currentBytesRecv);
      insertOrUpdateStat("lastBytesSent", currentBytesSent);

      console.log(new Date().toISOString() + " Stored stats successfully");
   } catch (error) {
      console.error(new Date().toISOString() + " Error storing stats: ", error);
   }
}
