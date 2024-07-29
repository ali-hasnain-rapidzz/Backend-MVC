// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require("node-fetch");

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpRequestOptions {
  body?: any;
  headers?: HeadersInit;
}

class HttpServiceClass {
  private async request(endpoint: string, method: HttpMethod, options?: HttpRequestOptions) {
    const url = endpoint;
    const headers = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    const config: RequestInit = {
      method: method,
      headers: headers,
      body: options?.body ? JSON.stringify(options.body) : null,
    };

    try {
      return await (await fetch(url, config)).json();
    } catch (error) {
      console.error("HTTP Request Failed: ", error);
      throw error;
    }
  }

  public get(endpoint: string, options?: HttpRequestOptions) {
    return this.request(endpoint, "GET", options);
  }

  public post(endpoint: string, body: any, options?: HttpRequestOptions) {
    return this.request(endpoint, "POST", { ...options, body });
  }

  public put(endpoint: string, body: any, options?: HttpRequestOptions) {
    return this.request(endpoint, "PUT", { ...options, body });
  }

  public delete(endpoint: string, options?: HttpRequestOptions) {
    return this.request(endpoint, "DELETE", options);
  }
}

export const HttpService = new HttpServiceClass();
