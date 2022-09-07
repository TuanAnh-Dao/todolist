import Configuration from "../Configuration";

function ApiService() {
  async function retrieveTasks() {
    return fetch(Configuration.TODOLIST_URL)
      .then((response) => {
        if (!response.ok) {
          this.handleResponseError(response);
        }

        return response.json();
      })

      .then((json) => {
        console.log("Retrieved items:");

        console.log(json);

        const items = [];

        const itemArray = json._embedded.collectionItems;

        for (var i = 0; i < itemArray.length; i++) {
          itemArray[i]["link"] = itemArray[i]._links.self.href;

          items.push(itemArray[i]);
        }

        return items;
      })

      .catch((error) => {
        this.handleError(error);
      });
  }

  const createItem = async (newitem) => {
    console.log("ItemService.createItem():");

    console.log(newitem);

    return fetch(this.config.ITEM_COLLECTION_URL, {
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
  };

  const deleteItem = async (taskID) => {
    console.log("ItemService.deleteItem():");

    console.log("item: " + taskID);

    return fetch(Configuration.TODOLIST_URL + `/${taskID}`, {
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
  };

  const changeStatus = async (task) => {
    console.log("ItemService.updateItem():");

    console.log(task);

    return fetch(Configuration.TODOLIST_URL + `/${task.id}`, {
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
  };

  const handleResponseError = (response) => {
    throw new Error("HTTP error, status = " + response.status);
  };

  function handleError(error) {
    console.log(error.message);
  }
}

export default ApiService;
