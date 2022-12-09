

function ApiService(url) {
  console.log(url)
  const methods = {
    getData() {
      return fetch(url + `/State`,{ mode: 'no-cors'})
        .then((response) => {
          if (!response.ok) {
            this.handleResponseError(response);
          }
          debugger;
          return response.json();
        })

        .then((json) => {
          console.log("Retrieved items:");
          console.log(json);
          
          return json;
        })

        .catch((error) => {
          this.handleError(error);
        });
    },

    createItem(newitem) {
      console.log("ItemService.createItem():");

      console.log(newitem);

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
      console.log("ItemService.deleteItem():");

      console.log("item: " + taskID);

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
      console.log("ItemService.updateItem():");

      console.log(task);

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
    }

  }
  return methods;

}

export default ApiService;
