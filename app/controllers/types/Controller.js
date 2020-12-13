/**
 * @see https://ponyfoo.com/articles/binding-methods-to-class-instance-objects#proxies
 * 
 * @param {Controller} controller
 * 
 * @returns {Controller}
 */
const makeFnBindingMap = controller => {

    const cache = new WeakMap();

    const handler = {
      get (target, key) {

        const value = Reflect.get(target, key);

        if (typeof value !== 'function') return value;
        
        if (!cache.has(value)) cache.set(value, value.bind(target));
        
        return cache.get(value);

      }
    };

    const proxy = new Proxy(controller, handler);

    return proxy;

}

class Controller {

    constructor() {

        /** @type {this} - A proxy of the object that can return the functions with .bind() applied. */
        this.binding = makeFnBindingMap( this );

    }

}

module.exports = Controller;