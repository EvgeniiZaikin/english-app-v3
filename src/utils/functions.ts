import { IncomingMessage } from 'http';

export function getHost(req: IncomingMessage | undefined): string {
  let host: string = '';

  if (process.browser) host = window.location.origin;
  else if (req) host = `http://${req.headers.host}`;
  else {
    throw new Error(`Can not get request object!`);
  }

  return host;
}

export async function sleep(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}
