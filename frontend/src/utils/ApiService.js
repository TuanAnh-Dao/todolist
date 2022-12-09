function ApiService(url) {
  const methods = {
    getData() {
      return fetch(url + `/State`)
        .then((response) => {
          if (!response.ok) {
            this.handleResponseError(response);
          }
          return response.json();
        })

        .then((json) => {
          return json;
        })

        .catch((error) => {
          this.handleError(error);
        });
    },

    createItem(newitem) {
      return fetch(url, {
        method: "POST",

        mode: "cors",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newitem),
      })
        .then((response) => {
          if (!response.ok) {
            this.handleResponseError(response);
          }

          return response.json();
        })

        .catch((error) => {
          this.handleError(error);
        });
    },

    deleteItem(taskID) {
      return fetch(`${url}/${taskID}`, {
        method: "DELETE",

        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) {
            this.handleResponseError(response);
          }
        })

        .catch((error) => {
          this.handleError(error);
        });
    },

    changeStatus(task) {
      return fetch(url + `/${task.id}`, {
        method: "PUT",

        mode: "cors",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(task),
      })
        .then((response) => {
          if (!response.ok) {
            this.handleResponseError(response);
          }

          return response.json();
        })

        .catch((error) => {
          this.handleError(error);
        });
    },

    handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
    },

    handleError(error) {
      console.log(error.message);
    },
  };
  return methods;
}

export default ApiService;
