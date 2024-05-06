import { Injectable } from "@nestjs/common";

@Injectable()
export class CollectValueItemObjArrayByKey {
  getCollect(key: string, params: any[]) {
    var collect = [];
    params.forEach((item) => {
      collect.push(item[key]);
    });
    return collect;
  }
}
