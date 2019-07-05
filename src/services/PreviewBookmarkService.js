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

export const convertPreviewImagesService = requestBody => {
  const convertImages_ENDPOINT = Configs.baseUrl + "thumbnail";
  fetch(convertImages_ENDPOINT, {
    method: "POST",
    // mode: "cors",
    headers: {
      // "Accept": "application/json',
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(["https://www.amazon.in", "https://www.google.com", "https://www.yahoo.com"])
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });

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
};
