export class Ajax {
    constructor(private method: string = 'GET', private url: string) {
    }

    send(data?: {}) {
        return new Promise(
            ((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.addEventListener('load', e => resolve(xhr));
                xhr.addEventListener('error', e => reject('An error occurred.'));
                xhr.addEventListener('abort', e => reject('The request has been cancelled by the user.'));

                xhr.open(this.method, this.url);
                xhr.setRequestHeader('Content-Type', 'application/json');

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
