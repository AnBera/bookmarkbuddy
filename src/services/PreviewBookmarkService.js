const baseUrl = "https://buddybookmark.herokuapp.com/";

export const previewBookmarkService = request => {
  const preview_ENDPOINT = "thumbnail?url=" + request;

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

//   export const loginUserService = (request) => {
//     const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/v1/login';

//     const parameters = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(request.user)
//     };

//     return fetch(LOGIN_API_ENDPOINT, parameters)
//       .then(response => {
//         return response.json();
//       })
//       .then(json => {
//         return json;
//       });
//   };
