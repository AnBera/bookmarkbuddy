import Configs from "../app/common/constants";

export const previewBookmarkService = request => {
  const preview_ENDPOINT = Configs.baseUrl + "thumbnail?url=" + request;

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(preview_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

//export async function convertPreviewImagesService(requestBody) {
export const convertPreviewImagesService = (requestBody) => {
  const convertImages_ENDPOINT = Configs.baseUrl + "thumbnail";
  return fetch(convertImages_ENDPOINT, {
      method: "POST",
      // mode: "cors",
      headers: {
        // "Accept": "application/json',
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

export const saveUrls = (requestBody) => {
  const convertImages_ENDPOINT = Configs.baseUrl + "urlbatch";
  return fetch(convertImages_ENDPOINT, {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

export const getPopularBookmarks = async (userID) => {
  const popularImages_ENDPOINT = Configs.baseUrl + "popularbookmarks/?uniqueID=" + userID;
  return await fetch(popularImages_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
}

export const increaseHitCount = (requestBody) => {
  const increaseHitCount_ENDPOINT = Configs.baseUrl + "increment";
  return fetch(increaseHitCount_ENDPOINT, {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};