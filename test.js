// external imports
import test from 'ava'
// local imports
import Matrix from './index'

test('Matrix can be created with no args', t => {
    // create an empty matrix
    const mat = new Matrix()
    // make sure that all of the
    t.deepEqual(mat.toJS(), {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
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
    t.is(mat.d, 1)
    t.is(mat.e, 0)
    t.is(mat.f, 0)
})

test('Can add two matrices together', t => {
    // create two matrices to add
    const mat1 = new Matrix({a: 1, b: 0, c: 0, d: 1, e: 5, f: 5})
    const mat2 = new Matrix({a: 1, b: 0, c: 0, d: 1, e: 10, f: 10})

    // perform the sum
    const sum = mat1.plus(mat2)

    // make sure the result matches expectation
    t.deepEqual(sum.toJS(), {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 15,
        f: 15,
    })

    // add two 90 degree rotations
    const mat3 = new Matrix({a: 0, b: 1, c: -1, d:0, e:0, f:0})
    const mat4 = new Matrix({a: 0, b: 1, c: -1, d:0, e:0, f:0})
    const rotSum = mat3.plus(mat4)

    // make sure it matches expectations
    t.deepEqual(rotSum.toJS(), {
        a: -1,
        b: 0,
        c: 0,
        d: -1,
        e: 0,
        f: 0
    })
})

test("Can compute inverse of matrix", t => {
    // create a matrix to test
    const mat = new Matrix({a: 1, b:2, c:3, d:4, e:5, f:6})

    // compute the inverse of the matrix
    const inverse = mat.inverse()

    // make sure it matches expectation
    t.deepEqual(inverse.toJS(), {
        a: -2,
        b: 1,
        c: 1.5,
        d: -0.5,
        e: 1,
        f: -2
    })
})

test("Can translate matrices", t => {
    // create a matrix to translate
    const mat = new Matrix({e: 20, f: 30})
    // perform the translatoin
    const translated = mat.translate(10, -10)

    // make sure the state after the translation matches expectation
    t.deepEqual(translated.toJS(), {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 30,
        f: 20
    })
})
