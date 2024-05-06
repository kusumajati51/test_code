import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PageDto } from "../dto/page.dto";
import { response } from "express";
export interface Response<T> {
  data: T;
  // meta: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<any> {
    return next.handle().pipe(
      map((data) => {
        var resData = data as any;
        if (resData.data) {
          return { data: resData.data, meta: resData.meta };
        } else if (resData.stream) {
            return resData;
        }
        else return { data: resData };
      })
    );
  }
}
