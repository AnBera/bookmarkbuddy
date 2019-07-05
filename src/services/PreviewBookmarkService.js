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