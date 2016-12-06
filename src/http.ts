import * as http_u from "http";
import * as http_s from "https";
import * as url from "url";

export class Http {
    public static get(uri: string, callback: (response: HttpResponse) => void): void {
        let http: IHttpLib = http_u;
        const urlObj = url.parse(uri);
        if (urlObj.protocol === "https:")
            http = http_s;
        let body: string;
        const opts: http_u.RequestOptions = {
            host: urlObj.hostname,
            path: urlObj.path
        };
        let req = http.get(opts, (res) => {
            if (res.statusCode === 302) {
                return this.get(res.headers.location, callback);
            }
            res.on("data", (chunk: Buffer) => {
                body += chunk.toString();
            });
            res.on("end", () => {
                let response = new HttpResponse(res);
                response.body = body;
                callback(response);
            });
            res.on("error", (e: any) => { throw e; });
        });
        req.on("error", (e: any) => { throw e; });
    }
}

export class HttpResponse {
    public readonly statusCode: number;
    public readonly headers: any;
    public body: string;

    constructor(res: http_u.IncomingMessage) {
        this.statusCode = res.statusCode;
        this.headers = res.headers;
    }
}

interface IHttpLib {
    readonly request: (options: http_u.RequestOptions,
        callback?: (res: http_u.IncomingMessage) => void) => http_u.ClientRequest;
    readonly get: (options: http_u.RequestOptions,
        callback?: (res: http_u.IncomingMessage) => void) => http_u.ClientRequest;
}
