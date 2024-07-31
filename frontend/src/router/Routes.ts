export enum RoutesEnum {
   HOME = '/',
   PEERS = '/peers'
}

export const Routes: RouteType[] = [
   {
      name: 'Home',
      path: RoutesEnum.HOME
   },
   {
      name: 'Peers',
      path: RoutesEnum.PEERS
   }
];

type RouteType = {
   name: string;
   path: RoutesEnum;
}
