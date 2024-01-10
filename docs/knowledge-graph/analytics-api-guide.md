---
sidebar_position: 10
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Analytics API Guide

## Introduction

To import analytics data, use the Analytics API, following these steps:

1. Connect the Google Search Console to your Knowledge Graph (Botify is also supported as an alternative to Google Search Console, [inquire with us](https://wordlift.io/contact-us/)).
1. Run the Analytics Import. 

## Authorization

:::info

Using the Analytics API requires a WordLift Key. If you're unsure which one is the WordLift Key for an account, go to [my.wordlift.io](https://my.wordlift.io) and scroll through the list of websites.

:::

## Connect Google Search Console

In order to connect the Google Search Console to your Knowledge Graph, a client needs to perform an interactive authentication and authorization process with Google by using a Web Browser.

### Create an Authorization URI

The process starts using a specially crafted URL. To get the URL use the "Build Authorization URI" API (replace `<key>` with your WordLift Key):

```sh
curl -X "POST" "https://api.wordlift.io/google-search-console/oauth2/authorize-uris" \
     -H 'Authorization: Key <key>' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "redirect_uri": "https://developers.google.com/oauthplayground"
}'
```

:::warning

The `redirect_uri` must be set to `https://developers.google.com/oauthplayground`.

:::

This will yield the following response:

```json
{
  "authorize_uri": "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground%2F&prompt=consent&response_type=code&client_id=615875160260-bsbm4u5fb2hrke3ln89n33v8rmmksth9.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters.readonly&access_type=offline"
}
```

Open the above URL in a Web Browser.

### Authenticate and Authorize with Google

When requested provide your Google e-mail address. The account must be able to access the Google Search Console for the target account:

![Authenticate with Google, by providing your email address](./images/authenticate-with-google.png)

Then provide the password and complete authentication:

![Authenticate with Google, by providing your password](./images/authenticate-with-google.png)

If requested, provide a 2-Step Verification code:

![Authenticate with Google, by providing a 2-Step Verification code](./images/authenticate-with-google.png)

Then finally click "Allow" to authorize the Analytics API to access the Google Search Console data:

![Authorize with Google](./images/authorize-with-google.png)

After clicking "Allow", the browser is redirected to a URL like this:

```
https://developers.google.com/oauthplayground/?code=<authorization-code>&scope=https://www.googleapis.com/auth/webmasters.readonly
```

Copy the value in `code=<authorization-code>` (the `<authorization-code>` part) to use it with the Exchange Authorization Code API.

### Create an Authorization Code Exchange

Send the `authorization-code` to the Exchange Authorization Code API:

```sh
curl -X "POST" "https://api.wordlift.io/google-search-console/oauth2/auth-code-exchanges" \
     -H 'Authorization: Key <key>' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "code": "<authorization-code>"
}'

```

If successful, the access token will be stored in the platform and the API will return an empty JSON object:

```json
{
  "scope": "https://www.googleapis.com/auth/webmasters.readonly",
  "access_token": "<access-token>",
  "expires_in": 3599,
  "token_type": "Bearer",
  "refresh_token": "<refresh-token>"
}
```
