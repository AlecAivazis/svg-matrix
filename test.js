// external imports
import test from 'ava'
// local imports
import Matrix from './src/matrix'
import factory from './src'

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

test("Can translate matrix", t => {
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

test("Can rotate matrix", t => {
    // create a matrix to test with
    const mat = new Matrix()

    // rotate the matrix
    const rotated = mat.rotate(45, 0, 0)

    // make sure it matches expectation
    t.is(+rotated.a.toFixed(3), 0.707)
    t.is(+rotated.b.toFixed(3), 0.707)
    t.is(+rotated.c.toFixed(3), -0.707)
    t.is(+rotated.d.toFixed(3), 0.707)
    t.is(+rotated.e.toFixed(3), 0)
    t.is(+rotated.f.toFixed(3), 0)
})

test("Can scale matrix by single value", t => {
    // create a matrix we can test with
    const mat = new Matrix({e: 20, f: 30})
    // scale the original matrix
    const scaled = mat.scale(2)
    // make sure the scaled matrix matches expectations
    t.deepEqual(scaled.toJS(), {
        a: 2,
        b: 0,
        c: 0,
        d: 2,
        e: 20,
        f: 30
    })

    // shrink the matrix to its original size
    const backScaled = scaled.scale(0.5)
    // make sure the back scaled matrix matches expectation
    t.deepEqual(backScaled.toJS(), {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 20,
        f: 30
    })
})

test("Can scale matrix by two values", t => {
    // start off with a simple matrix
    const mat = new Matrix({e: 20, f: 30})

    // partially scale the matrix
    const firstScale = mat.scale(2, 3)
    // make sure it matches expectation
    t.deepEqual(firstScale.toJS(), {
        a: 2,
        b: 0,
        c: 0,
        d: 3,
        e: 20,
        f: 30
    })

    // scale the same matrix again
    const secondScale = firstScale.scale(0.5, 1)
    // make sure it matches expectation
    t.deepEqual(secondScale.toJS(), {
        a: 1,
        b: 0,
        c: 0,
        d: 3,
        e: 20,
        f: 30
    })
})

test("Can scale matrix about a given point", t => {
    // create a matrix to test with
    const mat = new Matrix({e: 20, f: 30})
    // scale the matrix about some center
    const scaled = mat.scale(2, 3, 5, -5)
    // make sure it matches expectations
    t.deepEqual(scaled.toJS(), {
        a: 2,
        b: 0,
        c: 0,
        d: 3,
        e: 15,
        f: 40
    })
})

test("Can retrieve transform string", t => {
    // create a matrix to test with
    const mat = new Matrix()
    // make sure we can compute the transform string for the given matrix
    t.is(mat.transformString, "matrix(1, 0, 0, 1, 0, 0)")
})

test("Factory creates a matrix instance", t => {
    // create a matrix from the factory
    const mat = factory()

    // make sure the matrix has the correct default values
    t.deepEqual(mat.toJS(), {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0,
    })
})

test("Can compose scale and rotate", t => {
    // the amount to scale the matrix by
    const scaleFactor = 0.9316949906249123,
    // the angle to rotate the matrix
          angle = 26.56505117707799,
          x = 50,
          y = 50,
          // create a matrix that is scaled and rotated
          mat = new Matrix()
                    .scale(scaleFactor, scaleFactor, x, y)
                    .rotate(angle, x, y)

    // make sure the matrix matches expectations
    t.deepEqual(mat.toJS(), {
        a: 0.8333333333334116,
        b: 0.41666666620085835,
        c: -0.41666666620085835,
        d: 0.8333333333334116,
        e: 29.166666643372338,
        f: -12.499999976713497
    })


})
