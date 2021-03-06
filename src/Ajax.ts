export type Headers = {[key: string]: string};

export class Ajax {
    private static defaultHeaders: Headers;

    public static setDefaultHeaders(headers: Headers) {
        Ajax.defaultHeaders = headers;
    }

    public static getDefaultHeaders(): Headers {
        return Ajax.defaultHeaders;
    }

    private headers: Headers;

    constructor(private method: string = 'GET', private url: string) {
        this.headers = this.mergeHeaders({}, Ajax.defaultHeaders);
    }

    private mergeHeaders(headers: Headers, defaultHeaders: Headers): Headers {
        const newHeaders: Headers = {};

        Object.keys(defaultHeaders)
            .forEach(header => newHeaders[header] = defaultHeaders[header]);

        Object.keys(headers)
            .forEach(header => newHeaders[header] = headers[header]);

        return newHeaders;
    }

    public setHeaders(headers: Headers) {
        this.headers = this.mergeHeaders(headers, Ajax.defaultHeaders);
    }

    public getHeaders(): Headers {
        return this.headers;
    }

    send(data?: {}): Promise<XMLHttpRequest> {
        return new Promise(
            ((resolve: (xhr: XMLHttpRequest) => any, reject: (error: string) => any) => {
                const xhr = new XMLHttpRequest();

                xhr.addEventListener('load', e => resolve(xhr));
                xhr.addEventListener('error', e => reject('An error occurred.'));
                xhr.addEventListener('abort', e => reject('The request has been cancelled by the user.'));

                xhr.open(this.method, this.url);

                Object.keys(this.headers)
                    .forEach(header => xhr.setRequestHeader(header, this.headers[header]));

                if (data) {
                    xhr.send(JSON.stringify(data));
                }
                else {
                    xhr.send();
                }
            }).bind(this)
        );
    }
}
