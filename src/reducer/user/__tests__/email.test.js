import reducer from '../email'
import * as types from '../actions'

describe('email reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null)
  })

  it('should handle SET_IDENTITY', () => {
    expect(
      reducer(null, {
        type: types.SET_IDENTITY,
        email: 'test@test.com'
      })
    ).toEqual('test@test.com')

    expect(
      reducer('bla@bla.com', {
        type: types.SET_IDENTITY,
        email: 'test@test.com'
      })
    ).toEqual('test@test.com')
  })
})
