var bookmarkName = document.getElementById("bookmark-name"),
    bookmarkURL = document.getElementById("bookmark-url"),
    bookmarkDisplayName = document.getElementById("bookmark-display-name"),
    addBtn = document.getElementById("add-btn"),
    emptyInputAlert = document.getElementById("empty-input-alert"),
    bookmarkCardContainer = document.getElementById("bookmark-card-container"),
    formInputs = document.getElementsByClassName("form-control"),
    searchInput = document.getElementById("search-input"),
    bookmarkCardHref = document.getElementById("bookmark-card-href"),
    bookmarkNameAlert = document.getElementById("bookmarkNameAlert"),
    bookmarkURLAlert = document.getElementById("bookmarkURLAlert"),
    bookmarkArray = [],
    currnetIndex;


//Get data from LocalStorage after refresh:
if(localStorage.getItem("bookmarkList") == null) {
    bookmarkArray = [];
} else {
    bookmarkArray = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBookmark();
};

//Add Bookmark to Table & LocalStorage;:
addBtn.onclick = function() {

    if(bookmarkName.value == '' || bookmarkURL.value == '') {
        
        bookmarkCardHref.removeAttribute("href");
        emptyInputAlert.innerHTML = "Please fill in required data !";
    
    } else if(addBtn.innerHTML == "Add Bookmark") {
            bookmarkCardHref.setAttribute("href", "#bookmark-card");
            emptyInputAlert.innerHTML = "";
            addBookmark();
        
        } else { 
            bookmarkCardHref.setAttribute("href", "#bookmark-card");
            emptyInputAlert.innerHTML = "";
            submitEdit(currnetIndex);
    }
    
    localStorage.setItem("bookmarkList" , JSON.stringify(bookmarkArray));
    displayBookmark();
    resetForm();
};

//Add Bookmark to Array:
function addBookmark() {
    if(validateBookMarkName() == true && validateBookMarkURL() == true)
    {
        var bookmark =
        {
        name: bookmarkName.value,
        url : bookmarkURL.value
        }
        bookmarkArray.push(bookmark);
    }
};

//Display Bookmark Card Function:
function displayBookmark() {

    var bookmarkContainer = "";

    for(var i=0; i < bookmarkArray.length; i++)
    {
        bookmarkContainer += 
                `<div class="bookmark-card" id="bookmark-card">
                    <div class="bookmark-card-name float-left">
                        <h3 class="bookmark-display-name">${bookmarkArray[i].name}</h3>
                    </div>

                    <div class="card-btn float-right">
                        <button class="btn pink-btn">
                            <a href="https://${bookmarkArray[i].url}" target="_blank" class="visit-btn text-decoration-none">Visit</a> 
                        </button>
                        <button class="btn gray-btn" onclick="editBookmark(${i})">
                            <a class="edit-btn text-decoration-none" href="#to-top">Edit</a> 
                        </button>
                        <button class="btn black-btn" onclick="deleteBookmark(${i})">Delete</button>
                    </div>

                    <div class="clearfix"></div>
                </div>`
    }
    
    bookmarkCardContainer.innerHTML = bookmarkContainer;
};

//Reset Form After Adding:
function resetForm() {
    for(var i = 0; i < formInputs.length; i++)
    {
        formInputs[i].value = ''
    }

    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");

    bookmarkURL.classList.remove("is-invalid");
    bookmarkURL.classList.remove("is-valid");
};

//Edit Bookmark Function:
function editBookmark(index) {

    addBtn.innerHTML = "Update Bookmark";
    bookmarkName.value = bookmarkArray[index].name;
    bookmarkURL.value = bookmarkArray[index].url;
    currnetIndex = index;
};

//Submit Edit Function:
function submitEdit(currnetIndex) {

    bookmarkArray[currnetIndex].name = bookmarkName.value;
    bookmarkArray[currnetIndex].url = bookmarkURL.value;

    addBtn.innerHTML = "Add Bookmark";
};


//Delete Bookmark Function:
function deleteBookmark(index) {

    bookmarkArray.splice(index,1);
    localStorage.setItem("bookmarkList" , JSON.stringify(bookmarkArray));
    displayBookmark();
};

//Search BookmarkFunction:
searchInput.onkeyup = function() {
    var selectedBookmark = searchInput.value;

    var bookmarkContainer = "";

    for(var i=0; i < bookmarkArray.length; i++)
    {
        if(bookmarkArray[i].name.toLowerCase().includes(selectedBookmark.toLowerCase()))
        {
            bookmarkContainer += 
                `<div class="bookmark-card">
                    <div class="bookmark-card-name float-left">
                        <h3>${bookmarkArray[i].name}</h3>
                    </div>

                    <div class="card-btn float-right">
                        <button class="btn pink-btn">
                            <a href="https://${bookmarkArray[i].url}" target="_blank" class="visit-btn text-decoration-none">Visit</a> 
                        </button>
                        <button class="btn gray-btn">
                            <a class="edit-btn text-decoration-none" href="#to-top">Edit</a> 
                        </button>
                        <button class="btn black-btn" onclick="deleteBookmark(${i})">Delete</button>
                    </div>

                    <div class="clearfix"></div>
                </div>`
        
            } 
    }
    
    bookmarkCardContainer.innerHTML = bookmarkContainer;
};


//Validate Bookmark Name Function:
function validateBookMarkName() {
    var regex = /^[A-Z][a-z A-z 0-9]{3,9}$/;

    if(regex.test(bookmarkName.value) == true)
    {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");

        bookmarkNameAlert.classList.add("d-none");
        bookmarkNameAlert.classList.remove("d-block");

        addBtn.disabled = false;

        return true;
    
    } else {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        bookmarkNameAlert.classList.add("d-block");
        bookmarkNameAlert.classList.remove("d-none");

        addBtn.disabled = true;

        return false;
    };
};

//Check Duplicated Bookmark Name
function checkDuplicatedNames() {

    for(var i = 0; i < bookmarkArray.length; i++)
        {
          if(bookmarkName.value == bookmarkArray[i].name) 
          {
            bookmarkName.classList.add("is-invalid");
            bookmarkName.classList.remove("is-valid");

            bookmarkNameAlert.classList.add("d-block");
            bookmarkNameAlert.classList.remove("d-none");
  
            bookmarkNameAlert.innerHTML = "Bookmark Name Already Exists";
  
            addBtn.disabled = true;
          } 
        }
  };

bookmarkName.addEventListener("keyup", validateBookMarkName);
bookmarkName.addEventListener("blur", checkDuplicatedNames);


//Validate Bookmark URLFunction:
function validateBookMarkURL() {
    var regex = /^(www)\.[a-z0-9\-\.]+\.(com|net|org)$/i;

    if(regex.test(bookmarkURL.value) == true)
    {
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");

        bookmarkURLAlert.classList.add("d-none");
        bookmarkURLAlert.classList.remove("d-block");

        addBtn.disabled = false;

        return true;
   
    } else {
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");

        bookmarkURLAlert.classList.add("d-block");
        bookmarkURLAlert.classList.remove("d-none");

        addBtn.disabled = true;

        return false;
    }

};

bookmarkURL.addEventListener("keyup" , validateBookMarkURL);