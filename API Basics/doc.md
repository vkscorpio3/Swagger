<h1> Welcome to T-Mobile API Reference! </h1>


T-Mobile US provides wireless voice, messaging, and data services in the United States, [Puerto Rico](https://en.wikipedia.org/wiki/Puerto_Rico) and the [U.S. Virgin Islands](https://en.wikipedia.org/wiki/United_States_Virgin_Islands) under the **T-Mobile**, [MetroPCS](https://en.wikipedia.org/wiki/MetroPCS) and [GoSmart Mobile]() brands.

Developers use our APIs to build T-Mobile functionality into their software products and to build integrations with T-Mobile systems.

# T-Mobile API Overview
The T-Mobile API gives you access to a set of secure customer, commerce, payment, order domain API features for use in your own app, such as manage subscriber profile, catalog info, enable auto pay, add a line. It strives to be [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) and is organized around the main resources from the T-Mobile domain interface.

Before you do anything, you should [create a free T-Mobile account](http://srijandev-tmobile.s115.srijan-sites.com/) that you can test the API against and register for an API key so that you can make API calls.

If you are building custom applications for users with a T-Mobile account, you can follow the [authentication instructions]() using OAuth 2.

# Example Requests
Sample API calls are provided next to each method using [cURL](), a standard command line tool. All you need to do is drop in your specific parameters, and you can test the calls from the command line. If the command line isn’t your preference, a great alternative is [Postman](https://www.T-Mobile.com/blog/using-postman-to-get-started-with-the-content-api-and-view-api-2/), an easy-to-use [Chrome extension](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm/) for making HTTP requests. Or you can always use one of our [SDKs](http://srijandev-tmobile.s115.srijan-sites.com/) instead of making direct API calls.

<i class="icon-code"></i> **cURL:**

    curl -X GET \
    https://sandT-Mobile.api.t-mobile.com/v1/oauth2/accesstoken?grant_type=client_credentials\
    -H "authorization: Basic [YOUR_DEVELOPER_APP_BASIC_AUTH]()"


 **JSON:**

    {
      "issued_at": "1492119111853",
      "scope": "",
      "expires_in": "3599",
      "token_type": "BearerToken",
      "access_token": "r4KHptxVij8Dkf8hkTkmMQF0xFRo",
      "refresh_token_expires_in": "0"
    }

# Input/Output Format
Both request body data and response data are formatted as [JSON](http://www.json.org/).

# Date Format
All timestamps (both those sent in requests and those returned in responses) should be formatted as shown in our examples. We support [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) timestamps. The preferred way to pass in a date is by converting the time to UTC such as this: `2013-04-17T09:12:36-00:00`.

In cases where timestamps are rounded to a given day, you may omit the time component. So instead of `2013-04-17T13:35:01+05:00` you can use `2013-04-17`. If a time (and not just a date) however, is specified in a request then the calendar date in the Pacific timezone at the moment specified is the day that is accepted.

T-Mobile supports the subset of dates after the start of the [Unix epoch](http://en.wikipedia.org/wiki/Unix_time#Encoding_time_as_a_number): `1970-01-01T00:00:00+00:00` (00:00:00 UTC on January 1, 1970).

# CORS

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), or cross-origin resource sharing, is a mechanism that allows a web page to make XMLHttpRequests to another domain (i.e. a domain different from the one it was loaded from). CORS is supported in a [specific set of modern browsers](http://caniuse.com/cors). The T-Mobile API supports CORS on an app-by-app basis. You can add a comma separated list of origins that can make CORS requests to the API, through the developer console.

**CORS-Like Errors**
Some browsers will return a CORS-like error, even when CORS is enabled for your application. In these scenarios, an HTTP response code will often be included (e.g. 400 or 401) which will provide further direction where you may want to focus troubleshooting.


# Pagination

APIs that can return large numbers of objects return the results using a paging mechanism. Some APIs use [offset based paging](#offset-based-paging) and some use marker-based paging.

## Offset based paging

APIs that use offset-based paging use the `offset` and `limit` query parameters. The API returns an object that contains the set of results in the `entries` array, as well as returning the `offset`, `limit`, and `total_count` fields.

To fetch the first set of entries, call the API with `offset = 0` and limit = `<your-limit`>.

To fetch the next set of entries, call the API with `offset = <previous-offset> + <previous-limit>`. Note that you should increment the offset by the previous `limit` -- not by the size of the `entries` array (which may be less than limit). Use the value of limit that is returned in the response object rather than the value you passed in the query parameter.

If `<previous-offset> + <previous-limit> >= total_count`, then you have retrieved all of the entries and there are no more to fetch. The total number of entries in the entire collection may be less than `total_count`. Note that the `total_count` may change between API calls, so always use the most recent value.


**Query Parameters:**

| Name     | Type | Description   |
| :------- | ----: | :--- |
| offset | integer |  The 0-based offset of the first entry to return. The default is 0.    |
| limit    | integer   |  The maximum number of entries to return. Each API has a default and maximum value. If the value exceeds the maximum, then the maximum value will be used and returned in the `limit` field in the response.   |

**Response Object:**


| Name     | Type | Description   |
| :------- | ----: | :--- |
| entries | array |  The array of objects for the current set of results. It will be an empty array if there are no results.    |
| offset    | integer   |  The 0-based `offset` of the first entry in this set. This will be the same as the offset query parameter.  |
| limit    | integer   |  The `limit` that was used for these entries. This will be the same as the limit query parameter unless that value exceeded the maximum value allowed. The maximum value varies by API.   |
| total_count    | integer   |  One greater than the offset of the last entry in the entire collection. The total number of entries in the collection may be less than `total_count`.   |


# Errors

The t-Mobile API communicates errors through [standard HTTP status codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) with details supplied in JSON objects. Generally the following pattern applies:

 - 2xx - T-Mobile received, understood, and accepted a request.
 - 3xx - The user agent must take further action in order to complete the request.
 - 4xx - An error occurred in handling the request. The most common cause of this error is an invalid parameter.
 - 5xx- T-Mobile received and accepted the request, but an error occurred in the T-Mobile service while handling it.

## HTTP Status Codes**

**Codes**

    200 success
    201 created
    202 accepted
    204 no_content
    302 redirect
    304 not_modified
    400 bad_request
    401 unauthorized
    403 forbidden
    404 not_found
    405 method_not_allowed
    409 conflict
    412 precondition_failed
    429 too_many_requests
    500 internal_server_error
    503 unavailable

**Error Code Response**

| Name     | Type | Description   |
| :------- | :---- | :--- |
| errors | array |  The array of error objects |
| error    | object   |  Error object   |
| code    | string   |  A specific T-Mobile error code listed [here](#detailed-error-codes)   |
| userMessage    | string   |  A human-readable message describing the error.   |
| systemMessage    | string   |  Backend system error message.   |


## Detailed Error Codes

The following table lists the most common error responses you are likely to see when developing T-Mobile applications. This list is not exhaustive; additional errors can occur. If your application handles all of these responses, though, then it's likely to be a robust application that gracefully handles the majority of user interactions and internet issues.

The following table lists the most common error responses you are likely to see when developing T-Mobile applications. This list is not exhaustive; additional errors can occur. If your application handles all of these responses, though, then it's likely to be a robust application that gracefully handles the majority of user interactions and internet issues.

**Customer Domain**

| Code     | Domain | Description   |
| :------- | :---- | :--- |
| CUSTOMER-1001 | CUSTOMER |  Customer Financial account not found |
| CUSTOMER-1002    | CUSTOMER  |  Customer MSISDN not found   |
| CUSTOMER-1003    | CUSTOMER  |  Port-in for MSISDN ongoing   |
| CUSTOMER-1003  | string   |  Customer line of service not found   |
| CUSTOMER-1004 | string   |  Customer line of service not found   |


**Payment Domain**

| Code     | Domain | Description   |
| :------- | :---- | :--- |
| REVENUE-000 | Payment |  System not available. Please try again |
| REVENUE-001    | Payment  |  Parameter (name) is required   |
| REVENUE-002    | Payment |  Parameter (name) exceeds max length of (value)   |
| REVENUE-003  | Payment |  Parameter (name) is not a valid (value)   |
| REVENUE-004 | Payment |  Parameter (name) is invalid. Valid values are (valid values)   |


# Authentication
<!-- ReDoc-Inject: <security-definitions> -->
