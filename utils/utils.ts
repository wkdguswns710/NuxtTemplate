/**
 * 범용적으로 사용하는 Utils...
 */
export const utils = {
  /**
   * console log 표시
   * @param data any[]
   * @return
   */
  log(...data: any[]) {
    // if (webConfig.isLog) {
    //   //console.log(utils.log.caller);
    //   // const caller = new Error().stack?.split("at ")[3].split(" ")[0];
    //   if (webConfig.isCallerLog) {
    //     const error = new Error();
    //     const tokens = error.stack?.split('at ');
    //     if (tokens !== undefined) {
    //       if (tokens[2]?.startsWith('Object.')) {
    //         //console.info(`caller : ${tokens[2]?.split(" ")[0]}`);
    //         console.log(`caller : ${tokens[2]?.trim()}`);
    //       } else if (tokens[3]?.includes('Proxy.')) {
    //         //console.info(`caller : ${tokens[3]?.split(" ")[1]}`);
    //         console.log(`caller : ${tokens[3]?.trim()}`);
    //       } else {
    //         console.log(`caller : ${tokens[2]?.trim()}`);
    //       }
    //     }
    //   }

    data.forEach((element) => {
      console.log(element);
    });
    // }
  },
  /**
   * string, object, array empty 체크
   * @param value any
   * @return boolean
   */
  isEmpty(value: any): boolean {
    if (value === undefined || value === null) {
      return true;
    }

    // string일때 체크
    if (typeof value === 'string' && (value === '' || value.trim() === '')) {
      return true;
    }

    // object일때 체크
    if (typeof value === 'object' && Object.keys(value).length < 1) {
      return true;
    }

    // array일때 체크
    if (Array.isArray(value) && value.length < 1) {
      return true;
    }

    return false;
  },
  /**
   * 객체 깊은 복사
   * @param obj any
   * @return obj any
   */
  deepCopy<T>(obj: T): T {
    // 방법 1
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Array) {
      const clone = [] as any[];
      for (let i = 0; i < obj.length; i++) {
        clone[i] = utils.deepCopy(obj[i]);
      }
      return clone as unknown as T;
    }

    if (obj instanceof Object) {
      const clone = {} as { [key: string]: any };
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clone[key] = utils.deepCopy((obj as { [key: string]: any })[key]);
        }
      }
      return clone as T;
    }

    // 방법 2.
    // 속도가 느리고 깊은 복사가 불가능한 타입이 꽤 많다.
    let clone = JSON.parse(JSON.stringify(obj));
    return clone as T;
  }
};
