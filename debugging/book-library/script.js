// Book class
class Book {
  constructor(title, author, pages, check) {
    const validated = constructorValidation(title, author, pages, check);

    this.title = validated.title;
    this.author = validated.author;
    this.pages = validated.pages;
    this.check = validated.check;
  }
}

// Checking if constructor arguments are valid
function constructorValidation(title, author, pages, check) {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Title must be a non-empty string");
  }

  if (typeof author !== "string" || author.trim() === "") {
    throw new Error("Author must be a non-empty string");
  }

  const pagesNum = Number(pages);
  if (isNaN(pagesNum) || pagesNum <= 0) {
    throw new Error("Pages must be a positive number");
  }

  if (typeof check !== "boolean") {
    throw new Error("Check must be a boolean");
  }

  return {
    title: title.trim(),
    author: author.trim(),
    pages: pagesNum,
    check,
  };
}

let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (
    title.value.trim() === "" ||
    author.value.trim() === "" ||
    pages.value.trim() === ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    render();
    title.value = "";
    author.value = "";
    pages.value = "";
    check.checked = false;
  }
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.id = i;
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    let readStatus = "";
    readStatus = myLibrary[i].check ? "Yes" : "No";
    changeBut.innerText = readStatus;

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let delButton = document.createElement("button");
    //delButton.id = i + 5;
    delButton.id = `delButton_${i}`;
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.textContent = "Delete";
    delButton.dataset.index = i;
    delButton.addEventListener("click", function (e) {
      const index = e.target.dataset.index;

      alert(`You've deleted title: ${myLibrary[index].title}`);
      myLibrary.splice(index, 1);
      render();
    });
  }
}
