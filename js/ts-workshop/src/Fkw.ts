import { FiMeta } from "orak-util-ts";

/**
 * FiKeybean Wrapper Like Class
 */
export class Fkw {

  objVal: Record<string, any>;

  constructor(objVal: Record<string, any>) {
    this.objVal = objVal;
  }

  getFimVal(fim: FiMeta) {
    return this.objVal[fim.getTxKeyNtn()];
  }


}