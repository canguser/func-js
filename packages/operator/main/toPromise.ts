export interface toPromiseParams {
    callbackProperty?: string
    errorProperty?: string
    errorMessageProperty?: string
    resultProperty?: string
}

export function toPromise(callbackIndex, errorIndex) {
    return (instance) => instance.surround({
        before({ args, trans }) {
            let callback;
            trans.promiseResult = new Promise((resolve, reject) => {
                callback = function(...argumentList) {
                    const [error] = argumentList.splice(errorIndex, 1);
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(argumentList);
                };
            });
            if (args.length < callbackIndex) {
                args.length = callbackIndex;
            }
            args.splice(callbackIndex, 0, callback);
        },
        after({ trans }) {
            return trans.promiseResult;
        }
    });
}