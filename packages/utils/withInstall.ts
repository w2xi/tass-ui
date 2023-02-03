/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-01-21 11:35:20
 * @LastEditors: Huccct
 * @LastEditTime: 2023-01-21 11:52:00
 */
import type { Plugin } from 'vue';

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
): T => {
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};

export type SFCWithInstall<T> = T & Plugin;
