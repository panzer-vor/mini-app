
import { Observable } from "rxjs";
export {}

declare global {
  interface Wx {
    wxRx: {
      [apiname: string]: (options?: any) => Observable<any>
    }
  }
}



