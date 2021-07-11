import ArrayHelper from '../src/class/algorithm/ArrayOperate';
import { expect } from 'chai'

describe('String Operate Test', () => {
  it('check the unique array saperate or not', () => {
    const Arr = new ArrayHelper([1,2,3,5,1,8,8,5,3,6,9,0,3,5])
    expect(Arr.uniqueArray()).to.be.equals([ 0, 1, 2, 3, 5, 6, 8, 9 ])
  })
})
