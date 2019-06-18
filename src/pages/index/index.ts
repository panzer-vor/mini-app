import { sum } from 'ramda'

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad () {
    console.log(sum([1,2]))
  },
})
