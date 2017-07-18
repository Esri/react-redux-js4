import reducer from '../fullname'
import * as types from '../actions'

describe('fullname reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null)
  })

  it('should handle SET_IDENTITY', () => {
    expect(
      reducer(null, {
        type: types.SET_IDENTITY,
        fullname: 'John'
      })
    ).toEqual('John')

    expect(
      reducer('John', {
        type: types.SET_IDENTITY,
        fullname: 'Ronald'
      })
    ).toEqual('Ronald')
  })
})
