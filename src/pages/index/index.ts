import { interval, pipe, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators';

Page({
  data: {
    a: 0,
    b: 0,
    sum: 0,
  },
  onLoad() {
    wx.wxRx.login().subscribe(console.log)
    
    const pipeL$ = pipe(
      interval,
    )(1000)
    pipeL$.subscribe(num => this.setData({a: num}))

    const pipeR$ = pipe(
      interval,
      map(num => num * 2)
    )(2000)
    pipeR$.subscribe(num => this.setData({b: num}))

    const sum$ = combineLatest(pipeL$, pipeR$, (a, b) => a + b)
    sum$.subscribe(total => this.setData({
      sum: total
    }))
  },
})
