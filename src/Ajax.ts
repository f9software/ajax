export class Ajax {
    constructor(private method: string = 'GET', private url: string) {
    }

    send(data?: {}) {
        return new Promise(
            ((resolve, reject) => {
                const xhr = new XMLHttpRequest();;

                xhr.onreadystatechange = function(respnose) {
                    if (xhr.readyState > 3 && xhr.status === 200) {
                        resolve(xhr);
                    }
                };

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
