// src/octicons.d.ts

declare module '@primer/octicons' {
  import octiconsData from '@primer/octicons/build/data.json';

  // 1. 基于 data.json 的 key 动态生成 IconName 联合类型，并导出
  export type IconName = keyof typeof octiconsData;

  export interface IconData {
    symbol: string;
    keywords: string[];
    heights: {
      [height: string]: {
        width: number;
        path: string;
        options?: Record<string, any>;
      };
    };
    toSVG: (options?: Record<string, any>) => string;
  }

  // 2. 声明整个模块的默认导出结构
  const octicons: {
    [K in IconName]: IconData;
  };

  export default octicons;
}
