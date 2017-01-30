// extrnal imports
import { Map } from 'extendable-immutable'


class Matrix extends Map {

    constructor({a=1, b=0, c=0, d=1, e=0, f=0}={}) {
        // save those instance values in an immutable map internally
        return super({a, b, c, d, e, f})
    }

    plus(other) {
        // grab the elements from the other matrix
        const {a, b, c, d, e, f} = other

        let out = [[], [], []],
            m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x, y, z, res

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += m[x][z] * matrix[z][y];
                }
                out[x][y] = res;
            }
        }

        // batch the mutations together
        return this.withMutations(map => {
            // add ea
            map.set('a', out[0][0])
               .set('b', out[1][0])
               .set('c', out[0][1])
               .set('d', out[1][1])
               .set('e', out[0][2])
               .set('f', out[1][2])
        })
    }

    // element accessors

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
