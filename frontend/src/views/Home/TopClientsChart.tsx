import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import {
   TooltipComponent,
   TooltipComponentOption,
   LegendComponent,
   LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { Peer, usePeerStore } from '@/store/peerStore';
import { FaSquare } from 'react-icons/fa6';
import clsx from 'clsx';

type EChartsOption = echarts.ComposeOption<
   TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

echarts.use([
   TooltipComponent,
   LegendComponent,
   PieChart,
   CanvasRenderer,
   LabelLayout
]);

export default function TopClientsChart() {

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [chart, setChart] = useState<echarts.ECharts>();
   const chartRef = useRef<HTMLDivElement>(null);
   const [mostCommonClients, setMostCommonClients] = useState<Map<string, number>>(new Map());

   const peerStore = usePeerStore();

   const colors = [
      "#9e0142",
      "#d53e4f",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#e6f598",
      "#abdda4",
      "#66c2a5",
      "#3288bd",
      "#5e4fa2"
   ];

   const options: EChartsOption = {
      replaceMerge: ['series'],
      tooltip: {
         trigger: 'item'
      },
      legend: {
         show: false
      },
      color: colors,
      radius: '100%',
      series: [
         {
            name: 'Peers',
            type: 'pie',
            radius: ['50%', '100%'],
            itemStyle: {
               borderRadius: 10,
               borderColor: '#fff',
               borderWidth: 2
            },
            label: {
               show: false
            },
            data: Array.from(mostCommonClients).map(([client, count]) => ({ value: count, name: client }))
         }
      ]
   };

   useEffect(() => {
      peerStore.fetch();
   }, []);

   useEffect(() => {
      const chart = echarts.init(chartRef.current);
      chart.setOption({ ...options, resizeObserver });
      setChart(chart);
      if (resizeObserver) resizeObserver.observe(chartRef.current as HTMLElement);

      return () => {
         chart?.dispose();
      }
   }, [mostCommonClients]);

   useEffect(() => {
      setMostCommonClients(getMostCommonClient(peerStore.peers));
   }, [peerStore.peers]);

   return (
      <div className='grid grid-cols-2'>
         <div ref={chartRef} style={{ height: '300px' }} />
         <ul>
            {
               Array.from(mostCommonClients).map(([client, count], index) => {
                  const total = peerStore.peers.length;
                  const percentage = ((count / total) * 100).toFixed(0);
                  return (
                     <li key={client} className={clsx("flex justify-between items-center h-[10%]", {
                        'bg-gray-200': index % 2 === 0
                     })}>
                        <span className="flex items-center">
                           <FaSquare style={{ color: colors[index] }} />
                           {` ${index + 1}. ${client}`}
                        </span>
                        <span>{percentage}%</span>
                     </li>
                  )
               })
            }
         </ul>
     </div>
   );

}

const resizeObserver = new window.ResizeObserver((entries) => {
   entries.map(({ target }) => {
      const instance = echarts.getInstanceByDom(target as HTMLElement);
      if (instance) {
         instance.resize();
      }
   });
});

const getMostCommonClient = (peers: Peer[]) => {
   const clients: Map<string, number> = new Map();

   peers.forEach(peer => {
      if (peer.subversion) {
         peer.subversion = peer.subversion.replaceAll(':', ' ').replaceAll('/', ' / ')
         clients.set(peer.subversion, (clients.get(peer.subversion) || 0) + 1);
      }
   });

   const sortedClients = Array.from(clients.entries()).sort((a, b) => b[1] - a[1]);
   const mostCommonClients = new Map(sortedClients.slice(0, 9));
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const other = sortedClients.slice(9).reduce((acc, [client, count]) => acc + count, 0);
   mostCommonClients.set('Other', other);
   return mostCommonClients;
}