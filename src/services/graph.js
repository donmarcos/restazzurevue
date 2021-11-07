// ----------------------------------------------------------------------------
// Copyright (c) Ben Coleman, 2020
// Licensed under the MIT License.
//
// Set of methods to call the beta Microsoft Graph API, using REST and fetch
// Requires auth.js
// ----------------------------------------------------------------------------

import auth from './auth';

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';
// const GRAPH_SCOPES = ['user.read', 'user.readbasic.all']
const GRAPH_SCOPES = [];
const TEAM_ID =  '2530e6b5-d50e-4947-80a6-9c62800962ab';
const CHANNEL_ID = '19:84fdb00fdd194b008b534e70ff60b571@thread.tacv2' ;


let accessToken

export default {
  //
  // Get details of user, and return as JSON
  // https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http#response-1
  //
  async getSelf() {
    console.log('inside graph getSelf call')
    let resp = await callGraph('/me')
    if (resp) {
      let data = await resp.json()
      console.log(data);
      return data
    }
  },

  //
  // Get user's photo and return as a blob object URL
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  //
  async getPhoto() {
    let resp = await callGraph('/me/photos/240x240/$value')
    if (resp) {
      let blob = await resp.blob()
      return URL.createObjectURL(blob)
    }
  },

  //
  // Search for users
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  //
  async searchUsers(searchString, max = 50) {
    let resp = await callGraph(
      `/users?$filter=startswith(displayName, '${searchString}') or startswith(userPrincipalName, '${searchString}')&$top=${max}`
    )
    if (resp) {
      let data = await resp.json()
      return data
    }
  },


  async postMessageChannel(inMessage) {
    let resp = await callGraphPost(
      `/teams/${TEAM_ID}/channels/${CHANNEL_ID}/messages`,
      'Sending request for Service line ' + inMessage
    );

    if (resp) {
        let data = await resp.json()
        console.log(data);
        return data
     }

  },
  

  getAccessToken() {
    return accessToken
  }
}

//
// Common fetch wrapper (private)
//
async function callGraph(apiPath) {
  // Acquire an access token to call APIs (like Graph)
  // Safe to call repeatedly as MSAL caches tokens locally
  console.log('callGraph call get accesstoken')
  accessToken = await auth.acquireToken(GRAPH_SCOPES)
  console.log('acces token ')
  console.log(accessToken);
  let resp = await fetch(`${GRAPH_BASE}${apiPath}`, {
    headers: { authorization: `bearer ${accessToken}` }
  })

  if (!resp.ok) {
    throw new Error(`Call to ${GRAPH_BASE}${apiPath} failed: ${resp.statusText}`)
  }

  return resp
}

async function callGraphPost(apiPath, bodyMessage) {
  // Acquire an access token to call APIs (like Graph)
  // Safe to call repeatedly as MSAL caches tokens locally
  var messageSend = {
    "body": {
      content: bodyMessage,
      contentType: "text"
    }
  };
  console.log('callGraph call get accesstoken')
  accessToken = await auth.acquireToken(GRAPH_SCOPES)
  console.log('acces token callGrahpPost ')
  console.log(accessToken);
  console.log('body message is ---> ', JSON.stringify(messageSend));
  let resp = await fetch(`${GRAPH_BASE}${apiPath}`, {
    headers: {
      'authorization': `bearer ${accessToken}`,
      'Content-type': 'application/json',
    },
    "body": JSON.stringify(messageSend),
    method: 'POST',
  })

  if (!resp.ok) {
    throw new Error(`Call to ${GRAPH_BASE}${apiPath} failed: ${resp.statusText}`)
  }

  return resp
}
