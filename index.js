// extrnal imports
import { Map } from 'extendable-immutable'


class Matrix extends Map {

    constructor({a=0, b=0, c=0, d=0, e=0, f=0}={}) {
        // save those instance values in an immutable map internally
        return super({a, b, c, d, e, f})
    }

    get a() {
        return this.get('a')
    }

    get b() {
        return this.get('b')
    }

    get c() {
        return this.get('c')
    }

    get d() {
        return this.get('d')
    }

    get e() {
        return this.get('e')
    }

    get f() {
        return this.get('f')
    }
}

export default Matrix
