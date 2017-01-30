// external imports
import test from 'ava'
// local imports
import Matrix from './index'

test('Matrix can be created with no args', t => {
    // create an empty matrix
    const mat = new Matrix()
    // make sure that all of the
    t.deepEqual(mat.toJS(), {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
    })
})

test('Can retrieve individual elements', t => {
    // create an empty matrix
    const mat = new Matrix({
        a: 1,
        b: 2,
    })

    // make sure each element is accesible
    t.is(mat.a, 1)
    t.is(mat.b, 2)
    t.is(mat.c, 0)
    t.is(mat.d, 0)
    t.is(mat.e, 0)
    t.is(mat.f, 0)
})
