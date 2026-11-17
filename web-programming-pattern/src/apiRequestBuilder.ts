
// API Request Builder
// Acceptance criteria

// A request with method, URL, headers, query parameters, and a JSON body can be assembled in one chained expression
// Building a request without a URL throws an error
// Building a POST request without a body throws an error
// TypeScript reports an error when code tries to change a finished request

// Technical requirements

// A RequestBuilder class with chainable methods and a build() method (Builder pattern)
// build() is the only place that validates the parts

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// The finished request: every field is readonly, so TypeScript rejects changes.
// Why readonly?
// Once the request is built, TypeScript prevents you from changing its properties.
interface HttpRequest {
  readonly method: HttpMethod;
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, string>>;
  readonly body?: unknown;
}

// 2. Create the RequestBuilder class
// We need internal properties to store the request configuration while it is being assembled.
class RequestBuilder {
  private _method: HttpMethod = "GET";
  private _url?: string;
  private _headers: Record<string, string> = {};
  private _query: Record<string, string> = {};
  private _body?: unknown;

  
// 3. Add chainable methods
// Each setter modifies the builder and returns this.
  method(method: HttpMethod): this {
    this._method = method;
    return this;
  }

  url(url: string): this {
    this._url = url;
    return this;
  }

  header(name: string, value: string): this {
    this._headers[name] = value;
    return this;
  }

  query(name: string, value: string): this {
    this._query[name] = value;
    return this;
  }

  jsonBody(body: unknown): this {
    this._body = body;
    return this;
  }

// 4. Implement build()
// This is the most important part of the challenge.
// build() is the only method responsible for validating the request.
// The only place that validates and creates the finished request.
  build(): HttpRequest {
    if (!this._url) {
      throw new Error("Cannot build request: URL is missing");
    }
    if (this._method === "POST" && this._body === undefined) {
      throw new Error("Cannot build POST request: body is missing");
    }

    return Object.freeze({
      method: this._method,
      url: this._url,
      headers: Object.freeze({ ...this._headers }),
      query: Object.freeze({ ...this._query }),
      body: this._body,
    });
  }
}

// Demo
const getRequest = new RequestBuilder()
  .method("GET")
  .url("https://api.example.com/users")
  .header("Accept", "application/json")
  .query("page", "2")
  .query("limit", "10")
  .build();
console.log("GET:", getRequest);

const postRequest = new RequestBuilder()
  .method("POST")
  .url("https://api.example.com/users")
  .header("Content-Type", "application/json")
  .jsonBody({ name: "Ada", role: "admin" })
  .build();
console.log("POST:", postRequest);

try {
  new RequestBuilder().method("GET").build();
} catch (error) {
  console.log((error as Error).message); // URL is missing
}

try {
  new RequestBuilder().method("POST").url("https://api.example.com/users").build();
} catch (error) {
  console.log((error as Error).message); // body is missing
}

// Finished requests cannot be changed. TypeScript reports this line as an error:
// @ts-expect-error cannot assign to 'url' because it is a read-only property
getRequest.url = "https://evil.example.com";

// npx tsx src/requestBuilder.ts            # runs the code, does not check types
// npx tsc --noEmit src/requestBuilder.ts   # checks types, does not run the code