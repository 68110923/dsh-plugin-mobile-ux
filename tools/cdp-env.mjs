/**
 * 调试脚本的目标地址（一处定义，可被环境变量覆盖）。
 *
 * 为什么不再把 `localhost:3081` 写死在各脚本里：
 *   - 别人可能用 `dsh web --port 4000`，甚至通过隧道把端口映射到别处；
 *   - 写死的话，脚本只能在那一种部署下用。
 *
 * 优先级：命令行参数 > 环境变量 > 默认值。
 *
 *   DSH_WEB_URL   完整页面地址，默认 http://localhost:3081/
 *   DSH_WEB_HOST  只换 host:port，默认 localhost:3081
 *
 * 例：`DSH_WEB_HOST=localhost:4000 node tools/cdp-probe.mjs <wsUrl> <cookie>`
 */
const DEFAULT_ORIGIN = 'http://localhost:3081';

/** 页面根地址（不带结尾斜杠）。 */
export const WEB_ORIGIN = (
  process.env.DSH_WEB_URL ??
  (process.env.DSH_WEB_HOST ? `http://${process.env.DSH_WEB_HOST}` : DEFAULT_ORIGIN)
).replace(/\/+$/, '');

/**
 * 某个页面地址对应的 cookie domain。
 *
 * Cookie 的 domain 必须和实际访问的 host 一致，否则浏览器拒收 ——
 * 所以从 URL 里取，而不是固定写 `localhost`。
 *
 * @param {string} url - 页面地址。
 * @returns {string} cookie domain。
 */
export function cookieDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return 'localhost';
  }
}
