import {catchError, map} from "rxjs/operators";
import {Observable, of, pipe, UnaryFunction} from "rxjs";
import {TypedAction} from "@ngrx/store/src/models";
import {Action} from "@ngrx/store"

export class HandleErrorAction implements Action {
  readonly type = 'error';

  constructor(public err: any) {
  }
}


export function toActionCreatorPayload<S extends TypedAction<any>, E extends Action>(newSucceedAction: (payload: any) => S, newFailureAction: new (error: any) => E):
  UnaryFunction<any, Observable<any>> {
  return pipe(
    map(data => {
      return newSucceedAction(data);
    }),
    catchError((err: any) => {
      return of(new newFailureAction(err));
    })
  );
}
