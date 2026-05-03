/**
 * Nuxt3에서 fetch 관련 범용적으로 사용하기 위해...
 */

import type { MultiWatchSources } from 'vue/dist/vue.js';

// TODO: userFetch에서 사용할 옵션
export interface IFetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: object;
  params?: object;
  timeout?: number;
  isProgress: boolean;
  query?: object;
  headers?: HeadersInit;
  watch?: MultiWatchSources;
  responseType?: string;
}

export interface APIResponse<T> {
  /**
   * 서버상태코드
   */
  status?: number;
  /**
   * 서버상태
   */
  statusText?: string;
  /**
   * 수신 시간
   */
  timestamp?: string;
  /**
   * 실제 WAS 에서 수신된 data
   */
  recvData: T;
}

export const RestfulService = {
  async fetch<T>(url: string, fetchOptions: IFetchOptions): Promise<APIResponse<T>> {
    //console.log(fetchOptions);
    const optionsInit = {
      ...fetchOptions,
      initialCache: false,
      headers: { ...fetchOptions.headers }
    };
    if (!optionsInit.timeout) {
      optionsInit.timeout = 10000; // milliseconds
    }

    // url = `${webConfig.apiUrl}${url}`;

    // token 설정이 필요할시....
    /*
    const getToken = useCookie("token");
    if (getToken.value) {
      optionsInit.headers = {
        ...optionsInit.headers,
        Authorization: `Bearer ${getToken.value}`
      };
    }
      */

    // // 대구/성서용.....
    // const getToken = useLoginSessionStore().loginResult.data?.token;
    // if (!utils.isEmpty(getToken)) {
    //   optionsInit.headers = {
    //     ...optionsInit.headers,
    //     Token: `${getToken}`
    //   };
    // }

    // if (optionsInit.isProgress) {
    //   EventBus.emit(EventName.LOADING, { isVisible: true });
    // }

    const res: APIResponse<T> = {} as APIResponse<T>;
    const dayjs = useDayjs();
    // useFetch사용하면 경고 메세지 떠서 $fetch 사용함
    //const { data } = await useFetch(url, {
    try {
      const data = await $fetch(url, {
        // 주석 처리함
        watch: fetchOptions.watch,
        onRequest({ options }) {
          Object.assign(options, optionsInit);

          utils.log(`Req ${optionsInit.method} ############# ${url} : ${dayjs().format('YYYY/MM/DD HH:mm:ss')}`);
          if (options.method === 'GET') {
            utils.log('Params ==>', options.query);
          } else if (options.method === 'POST') {
            utils.log('Body ==>', options.body);
          }
        },
        onRequestError({ error }) {
          utils.log(`onRequestError :: ${error.message}`);
        },
        onResponse({ response }) {
          if (response.status === 200) {
          }
          utils.log(`Res ${optionsInit.method} ############# ${url} : ${dayjs().format('YYYY/MM/DD HH:mm:ss')}`);
          utils.log(response);

          res.status = response.status;
          res.statusText = response.statusText;
        },
        onResponseError({ response }) {
          utils.log(`ResponseError_status :: ${response.status}`);
        }
      }).finally(() => {
        if (optionsInit.isProgress) {
          //   EventBus.emit(EventName.LOADING, { isVisible: false });
        }
        res.timestamp = `${dayjs().format('YYYY/MM/DD HH:mm:ss')}`;
      });

      res.recvData = data as T;
    } catch (error) {
      utils.log(error);
    }
    return res;
  },

  // GET 메서드
  async GET<T>(url: string, params?: any, timeout?: number, isProgress: boolean = true, watchData: any = null): Promise<APIResponse<T>> {
    const data = await RestfulService.fetch<T>(url, {
      method: 'GET',
      query: params,
      timeout: timeout,
      isProgress: isProgress,
      watch: [watchData]
    });

    return data;
  },

  // POST 메서드
  async POST<T>(url: string, body?: any, timeout?: number, isProgress: boolean = true, watchData: any = null): Promise<APIResponse<T>> {
    const headers: HeadersInit = {
      // 아래는 상관 없는듯
      'Content-Type': 'application/json'
      // 대구/성서에는 이렇게 설정됨
      // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    // 대구 성서는  body: qs.stringify(body, { charset: "utf-8" }) as unknown as object, 로 해야 하네..
    const data = await RestfulService.fetch<T>(url, {
      method: 'POST',
      headers: headers,
      body: body,
      //body: isStringfy ? (qs.stringify(body, { charset: "utf-8" }) as unknown as object) : body,
      // body: JSON.stringify(body) as unknown as object,
      timeout: timeout,
      isProgress: isProgress,
      watch: [watchData]
    });

    return data;
  },

  // FormData
  async PostFormData<T>(url: string, formData: FormData, timeout?: number, isProgress: boolean = true): Promise<APIResponse<T>> {
    const headers: HeadersInit = {
      //  "Content-Type": "multipart/form-data",
      //  "Response-Type":"application/json"
    };
    const data = await RestfulService.fetch<T>(url, {
      method: 'POST',
      headers: headers,
      body: formData,
      timeout: timeout,
      isProgress: isProgress,
      responseType: 'json'
    });

    return data;
  },

  // PUT 메서드
  async PUT<T>(url: string, body?: any, timeout?: number, isProgress: boolean = true, watchData: any = null): Promise<APIResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    const data = await RestfulService.fetch<T>(url, {
      method: 'PUT',
      headers: headers,
      body: body,
      timeout: timeout,
      isProgress: isProgress,
      watch: [watchData]
    });

    return data;
  },

  // DELETE 메서드
  async DELETE<T>(url: string, timeout?: number, isProgress: boolean = true): Promise<APIResponse<T>> {
    const data = await RestfulService.fetch<T>(url, {
      method: 'DELETE',
      timeout: timeout,
      isProgress: isProgress
    });

    return data;
  }
};
