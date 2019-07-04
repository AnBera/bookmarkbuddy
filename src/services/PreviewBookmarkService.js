import Configs from "../app/common/constants";
import $ from 'jquery';

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

export const convertPreviewImagesService = (requestBody) => {
  const convertImages_ENDPOINT = Configs.baseUrl + "thumbnail";
  return fetch(convertImages_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: new Headers({
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': "*"
    })
  }).then(response => { return response.json() }).then(json => { return json; });


  // const parameters = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     'Access-Control-Allow-Origin': "*"
  //   },
  //   mode: 'no-cors',
  //   body: JSON.stringify(requestBody)
  // };
  // let response = await fetch(convertImages_ENDPOINT, parameters);
  // let data = await response.json();
  // return data;

}

