export default class ArrayHelper {
    Arr : Array<any>

    constructor (initialArr : Array<any>) {
      this.Arr = initialArr
    }

    public uniqueArray () : Array<any> {
      let arr : Array<any> = this.Arr
      if (arr.length === 0) return arr
      arr = arr.sort(function (a, b) { return a * 1 - b * 1 })
      const ret : Array<any> = [arr[0]]
      for (let i = 1; i < arr.length; i++) { // Start loop at 1: arr[0] can never be a duplicate
        if (arr[i - 1] !== arr[i]) {
          ret.push(arr[i])
        }
      }
      return ret
    }
}
