
export default class StringOperate {
    str: String
    constructor (initializer: String) {
      this.str = initializer
    }

    /**
     * it converts String to Array
     * @returns String[]
     */
    protected toArray (): String[] {
      return this.str.split('')
    }

    /**
     * It Reverse the array
     * @returns Strinh[]
     */
    protected arrayReverse (): String[] {
      return this.toArray().reverse()
    }

    /**
     * It Returns the reverse String of the input
     * @returns String
     */
    public reverseString (): String {
      return this.arrayReverse().join('')
    }

    /**
     * It returns the reverse string
     * @returns String
     */
    public inOneLine () {
      return this.str.split('').reverse().join('')
    }
}
