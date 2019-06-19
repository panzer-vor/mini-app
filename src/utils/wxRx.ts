import { Observable, of } from 'rxjs'

const wxRx: any = {}

const cbObj2Obs = (obj: any, fn: any) => Observable.create((observe) => {
  if (typeof obj === 'object' || typeof obj === 'undefined') {
    let param = Object.assign({}, obj)
    let pro = new Promise((resolve, reject) => {
      param.success = (...arg: any[]) => {
        resolve(...arg)
      }
      param.fail = (e: any) => reject(e)
    })
    let instance = fn.call(null, param) || {}
    pro.then(res => {
      observe.next(Object.assign(instance, res))
      observe.complete()
    }, e => {
      observe.error(e, instance)
      observe.complete()
    })
  } else {
    observe.next(fn.call(null, obj))
  }
})

for (let p in wx) {
  switch (typeof wx[p]) {
    case 'object':
      wxRx[p] = {...wx[p]}
      break;
    case 'function':
      if (/Sync$/.test(p)) {
        wxRx[p] = (...arg: any[]) => of(wx[p].call(null, ...arg))
      } else {
        wxRx[p] = (obj: any) => cbObj2Obs(obj, wx[p])
      }
      break;
    default:
      wxRx[p] = wx[p]
      break;
  }
}

wx.wxRx = wxRx