import { IncomingMessage } from 'http';

const isBrowser = () => typeof window !== 'undefined';

export const isDevelop = () => process.env.NODE_ENV !== 'production';

export function getHost(req: IncomingMessage | undefined): string {
  let host: string = '';

  if (isBrowser()) host = window.location.origin;
  else if (req) host = `http://${req.headers.host}`;
  else {
    throw new Error(`Can not get request object!`);
  }

  return host;
}

export async function sleep(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export function printLog(message: string) {
  if (isBrowser()) window.console.log(message);
  else global.console.log(message);
}
