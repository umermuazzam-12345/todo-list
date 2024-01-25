// VARIABLES

let todoArray = [];

let todoList = {};
let id = -1;
let i = 0;
let currentTodo = "";
let filterName;
let filterDate;
let filterIds;
let filterIdsByDate;
console.log("filterIds :", filterIds, "filterIdsByDate :", filterIdsByDate);

// GRAB THE IDS
const name = document.getElementById("name");
const desig = document.getElementById("designation");
const loc = document.getElementById("location");
const date = document.getElementById("date");
const submit_todo = document.getElementById("submit-todo");
const tbody = document.getElementById("tbody");
const edit_todo = document.getElementById("edit-todo");
const dlt_todo = document.getElementById("dlt-todo");

// INPUTS VALIDATIONS
const validation = () => {
  if (name.value >= 0 || name.value <= 9) {
    alert("Name must be string");
    return 0;
  }
  if (
    name.value.length < 3 ||
    desig.value.length < 3 ||
    loc.value.length < 3 ||
    date.value.length < 3
  ) {
    alert("Please provide valid input");
    return false;
  } else {
    return true;
  }
};

// FORM RESET
const formReset = () => {
  name.value = "";
  desig.value = "";
  loc.value = "";
  date.value = "";
};

// ADD TO DO LIST TO  ARRAY

const addTodo = () => {
  if (validation()) {
    todoList = {
      id: currentTodo ? currentTodo.id : ++id,
      name: name.value,
      desig: desig.value,
      loc: loc.value,
      date: date.value,
    };
    if (currentTodo) {
      const currentIndex = todoArray.indexOf(currentTodo);
      currentTodo = "";
      todoArray[currentIndex] = todoList;
      formReset();
      return 0;
    }
    todoArray.push(todoList);

    // FORM RESET
    formReset();
  }
};

// DISPLAYING DATA TO BELOW TABLE

const displayInTable = () => {
  const html = todoArray.map((items, ind) => {
    return `<tr key= ${ind} id= row-${ind}  ${
      ind % 2 == 0 && "style=background-color:white"
    }

    class=${
      filterIds &&
      filterIds.filter((item) => filterIdsByDate?.includes(item))[0] == items.id
        ? "highlight"
        : ""
    } 
    >
          <th scope="row"
          class=${filterIds && filterIds.includes(items.id) && "highlight"} 
          >${items.name}</th>
          <td>${items.desig}</td>
          <td>${items.loc}</td>
          <td 

          
          
          >${items.date}</td>
          <td class="modify-btn">
            <button class="edit" id="edit-todo" onClick=editFunction(${
              items.id
            })>Edit</button>
            <button class="dlt" id="dlt-todo" onClick=dltFunction(${
              items.id
            })>Delete</button>
          </td>
        </tr>`;
  });

  tbody.innerHTML = html;

  // IF HAVE ANY DATA TO DISPLAY IN TABLE THEN SHOW SEARCH FILTERS

  todoArray.length ? (search_form.style.visibility = "visible") : "";
};

// SUBMIT EVENT HANDLER
submit_todo.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
  displayInTable();
});

// EDIT TO DO LIST

const editFunction = (edit_id) => {
  [currentTodo] = todoArray.filter((item) => item.id === edit_id);
  name.value = currentTodo.name;
  desig.value = currentTodo.desig;
  loc.value = currentTodo.loc;
  date.value = currentTodo.date;
};

// DELETE TO DO LIST

const dltFunction = (dlt_id) => {
  todoArray = todoArray.filter((item) => item.id !== dlt_id);
  displayInTable();
};

// ****************************************************************************************************

// FILTER METHODS

const search_form = document.getElementById("search_form");
const search_reacord = document.getElementById("search-reacord");
let select_opt = document.getElementById("select_opt");

// SHOW THE FILTER INPUT BY SELECTING FILTER FORM
const selected = () => {
  // BY CLICKING THE SEARCH FORM VISIBLE INPUT SEARCH
  search_reacord.style.visibility = "visible";
  reset_filter.style.visibility = "visible";
  // console.log(select_opt.value);
  if (select_opt.value == "date") {
    search_reacord.type = "date";
  } else {
    search_reacord.type = "text";
  }
};

// FILTER THE RECORDS

function filterRecords() {
  if (select_opt.value == "name") {
    setTimeout(() => {
      filterName = todoArray.filter((item) => {
        return item.name.includes(search_reacord.value);
      });
      // console.log("filter by name :", filterName);

      // FILTER IDS OF THE SEARCH FILTER ITEMS
      filterIds = filterName.map((item) => item.id);
      // console.log("filter ids :", filterIds);
      displayInTable();

      // POPULATING THE FILTERED DATA WHICH IS FILTERED BY NAME FILED
      // const html = filterName.map((items, ind) => {
      //   return `<tr key= ${ind} id= row-${ind}  >
      //         <th scope="row" ${"style=background-color:lightgreen"}>${
      //     items.name
      //   }</th>
      //         <td>${items.desig}</td>
      //         <td>${items.loc}</td>
      //         <td>${items.date}</td>
      //         <td class="modify-btn">
      //           <button class="edit" id="edit-todo" onClick=editFunction(${
      //             items.id
      //           })>Edit</button>
      //           <button class="dlt" id="dlt-todo" onClick=dltFunction(${
      //             items.id
      //           })>Delete</button>
      //         </td>
      //       </tr>`;
      // });
      // tbody.innerHTML = html;
      // console.log(search_reacord.value.length);
      // if (search_reacord.value.length <= 1) {
      //   displayInTable();
      // }
    });
  } else {
    setTimeout(() => {
      filterDate = todoArray.filter((item) => {
        return item.date.includes(search_reacord.value);
      });
      filterIdsByDate = filterDate.map((item) => item.id);
      // console.log("filter ids by date:", filterIdsByDate);
      displayInTable();
      // console.log("filter by date :", filterDate);

      // POPULATING THE FILTERED DATA WHICH IS FILTERED BY DATE FILED

      // const html = filterDate.map((items, ind) => {
      //   return `<tr key= ${ind} id= row-${ind}  ${
      //     ind % 2 == 0 && "style=background-color:white"
      //   }>
      //         <th scope="row">${items.name}</th>
      //         <td>${items.desig}</td>
      //         <td>${items.loc}</td>
      //         <td ${"style=background-color:lightgreen"}>${items.date}</td>
      //         <td class="modify-btn">
      //           <button class="edit" id="edit-todo" onClick=editFunction(${
      //             items.id
      //           })>Edit</button>
      //           <button class="dlt" id="dlt-todo" onClick=dltFunction(${
      //             items.id
      //           })>Delete</button>
      //         </td>
      //       </tr>`;
      // });
      // tbody.innerHTML = html;
    });
  }
}

// RESET INPUT SEARCH BAR
reset_filter.addEventListener("click", () => {
  // console.log("clear click");
  search_reacord.value = "";
  filterIds = "";
  filterIdsByDate = "";
  displayInTable();
});
