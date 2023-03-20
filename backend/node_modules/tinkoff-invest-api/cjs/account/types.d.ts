import { RealAccount } from './real.js';
export declare type OmitAccount<T> = Omit<T, 'accountId'>;
export declare type CommonAccountMethods = Pick<RealAccount, 'accountId' | 'api' | 'isSandbox' | 'getInfo' | 'getPortfolio' | 'getOperations' | 'getPositions' | 'getOrders' | 'getOrderState' | 'postOrder' | 'cancelOrder'>;
//# sourceMappingURL=types.d.ts.map