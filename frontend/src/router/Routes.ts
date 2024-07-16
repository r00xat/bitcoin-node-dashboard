export enum RoutesEnum {
   HOME = '/',
   PEERS = '/peers',
   MEMPOOL = '/mempool',
   ABOUT = '/about',
}

export const Routes: RouteType[] = [
   {
      name: 'Home',
      path: RoutesEnum.HOME,
      navBar: true,
      childrens: [],
   },
   {
      name: 'Peers',
      path: RoutesEnum.PEERS,
      navBar: true,
      childrens: [],
   },
   {
      name: 'Mempool',
      path: RoutesEnum.MEMPOOL,
      navBar: true,
      childrens: [],
   },
   {
      name: 'About',
      path: RoutesEnum.ABOUT,
      navBar: true,
      childrens: [],
   },
];

type RouteType = {
   name: string;
   path: RoutesEnum;
   navBar: boolean;
   childrens: RouteType[];
};
