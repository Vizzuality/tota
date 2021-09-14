export function encodeParam(params: any): string {
  return Buffer.from(JSON.stringify(params)).toString('base64');
}

export function decodeParam(paramString: string): any {
  try {
    return JSON.parse(Buffer.from(paramString, 'base64').toString('binary'));
  } catch (err) {
    return {};
  }
}
