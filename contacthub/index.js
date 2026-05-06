var profileImageInput = document.getElementById("profileImage");
var contactNameField = document.getElementById("fullName");
var contactPhoneField = document.getElementById("PhoneNumber");
var contactEmailField = document.getElementById("Email");
var contactAddressField = document.getElementById("Address");
var contactGroupSelect = document.getElementById("contactGroup");
var contactNotesField = document.getElementById("Notes");
var favoriteCheckbox = document.getElementById("favorite");
var emergencyCheckbox = document.getElementById("emergency");
var imagePreviewContainer = document.getElementById("liveImagePreview");
var saveBtn = document.getElementById("saveContactBtn");
var modifyBtn = document.getElementById("updateContactBtn");
var contactsDatabase = JSON.parse(localStorage.getItem("all contacts")) || [];
var selectedContactForUpdate;
var nameError = document.getElementById("nameErrorMsg");
var phoneError = document.getElementById("phoneErrorMsg");
var emailError = document.getElementById("emailErrorMsg");

displayAllContacts();

// ========== Main Display Function ==========
function displayAllContacts(contactsArray = contactsDatabase) {
  var finalMarkup = "";
  
  if (contactsArray.length === 0) {
    finalMarkup += `
      <div class="text-center emptyStateWrapper">
        <div class="d-flex emptyStateIcon align-items-center justify-content-center m-auto mb-3">
          <i class="fa-solid fa-address-book"></i>
        </div>
        <p class="m-0 fw-bold text-secondary-muted">No contacts found</p>
        <p class="m-0 text-secondary-muted">Click "Add Contact" to get started</p>
      </div>
    `;
  }
  
  for (var i = 0; i < contactsArray.length; i++) {
    var groupBadge = "";
    var contactAvatar = "";
    var contactEmailDisplay = "";
    var contactAddressDisplay = "";
    var emailActionBtn = "";
    var badgesContainer = "";
    
    // Avatar setup
    var badgesMarkup = "";
    if (contactsArray[i].favorite) {
      badgesMarkup += `<div class="position-absolute top-0 end-0 bg-warning rounded-circle d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; border: 1px solid white;"><i class="fa-solid fa-star text-white" style="font-size: 8px;"></i></div>`;
    }
    if (contactsArray[i].emergency) {
      badgesMarkup += `<div class="position-absolute bottom-0 end-0 bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; border: 1px solid white;"><i class="fa-solid fa-heart-pulse text-white" style="font-size: 8px;"></i></div>`;
    }
    
    if (contactsArray[i].image) {
      contactAvatar = `<div class="cardImage position-relative">
        <div class="contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
          <img src="${contactsArray[i].image}" alt="" class="w-100">
        </div>
        ${badgesMarkup}
      </div>`;
    } else {
      contactAvatar = `<div id="cardImage" class="position-relative">
        <div class="default-avatar contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
          ${getNameInitials(contactsArray[i].fullName)}
        </div>
        ${badgesMarkup}
      </div>`;
    }
    
    // Email display
    if (contactsArray[i].emailAdress) {
      contactEmailDisplay = `
        <div class="d-flex gap-2 align-items-center">
          <div class="email-icon d-flex align-items-center justify-content-center rounded-3">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <span class="text-secondary-muted">${contactsArray[i].emailAdress}</span>
        </div>`;
    }
    
    // Email button
    if (contactsArray[i].emailAdress) {
      emailActionBtn = `
        <a href="mailto:${contactsArray[i].emailAdress}" class="email-icon d-flex align-items-center justify-content-center rounded-3 border-0">
          <i class="fa-solid fa-envelope"></i>
        </a>`;
    }
    
    // Address display
    if (contactsArray[i].address) {
      contactAddressDisplay = `
        <div class="d-flex gap-2 align-items-center">
          <div class="location-icon d-flex align-items-center justify-content-center rounded-3">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <span class="text-secondary-muted">${contactsArray[i].address}</span>
        </div>`;
    }
    
    // Group badge
    switch (contactsArray[i].group) {
      case "family":
        groupBadge = `<span class="family-badge group-badge">${contactsArray[i].group}</span>`;
        break;
      case "work":
        groupBadge = `<span class="work-badge group-badge">${contactsArray[i].group}</span>`;
        break;
      case "friends":
        groupBadge = `<span class="friend-badge group-badge">${contactsArray[i].group}</span>`;
        break;
      case "school":
        groupBadge = `<span class="school-badge group-badge">${contactsArray[i].group}</span>`;
        break;
      case "other":
        groupBadge = `<span class="other-badge group-badge">${contactsArray[i].group}</span>`;
        break;
    }
    
    if (contactsArray[i].emergency) {
      groupBadge += `<span class="ms-2 d-flex align-items-center gap-1" style="color: #ff2056; background-color:#FFF1F2; padding:4px 8px; font-size:11px; border-radius:6px;"><i class="fa-solid fa-heart-pulse"></i> emergency</span>`;
    }
    
    // Sidebar item avatar
    var sidebarAvatar = contactsArray[i].image ? 
      `<div class="flex-shrink-0 contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
        <img src="${contactsArray[i].image}" alt="" class="w-100 h-100" />
      </div>` :
      `<div class="flex-shrink-0 default-avatar contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
        ${getNameInitials(contactsArray[i].fullName)}
      </div>`;
    
    var starIconHtml = contactsArray[i].favorite ? 
      '<i class="fa-solid fa-star" style="color: #ffb900;"></i>' : 
      '<i class="fa-regular fa-star text-secondary-muted"></i>';
    
    var heartIconHtml = contactsArray[i].emergency ? 
      '<i class="fa-solid fa-heart-pulse" style="color: #ff2056;"></i>' : 
      '<i class="fa-regular fa-heart text-secondary-muted"></i>';
    
    finalMarkup += `
      <div class="col-md-6">
        <div class="d-flex flex-column contact-card overflow-hidden">
          <div class="p-3">
            <div>
              <div class="d-flex column-gap-3 align-items-center">
                ${contactAvatar}
                <div>
                  <h3 class="fs-6 fw-bold">${contactsArray[i].fullName}</h3>
                  <div class="d-flex gap-2 align-items-center">
                    <div class="phone-icon d-flex justify-content-center align-items-center rounded-3">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                    <span class="text-secondary-muted">${contactsArray[i].phoneNumber}</span>
                  </div>
                </div>
              </div>
              <div class="mt-3">${contactEmailDisplay}</div>
              <div class="mt-2">${contactAddressDisplay}</div>
              <div class="mt-2 d-flex">${groupBadge}</div>
            </div>
          </div>
          <div class="p-3 card-footer">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex gap-2">
                <a href="tel:${contactsArray[i].phoneNumber}" class="phone-icon d-flex justify-content-center align-items-center rounded-3 border-0">
                  <i class="fa-solid fa-phone"></i>
                </a>
                ${emailActionBtn}
              </div>
              <div class="d-flex gap-2 text-secondary-muted">
                <button class="border-0 rounded-1 transition-effect" onclick="toggleFavoriteStatus(${i})">${starIconHtml}</button>
                <button class="border-0 rounded-1 transition-effect" onclick="toggleEmergencyStatus(${i})">${heartIconHtml}</button>
                <button class="border-0 rounded-1 transition-effect" onclick="prepareFormForUpdate(${contactsArray[i].id})" data-bs-toggle="modal" data-bs-target="#scrollModal">
                  <i class="fa-solid fa-pen text-secondary-muted"></i>
                </button>
                <button class="border-0 rounded-1 transition-effect" onclick="removeContact('${contactsArray[i].id}')">
                  <i class="fa-solid fa-trash text-secondary-muted"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  document.getElementById("contactsContainer").innerHTML = finalMarkup;
  document.getElementById("totalCount").innerHTML = contactsDatabase.length;
  document.getElementById("contactsCountText").innerHTML = `Manage and organize your ${contactsDatabase.length} contacts`;
  displayFavoriteContacts();
  displayEmergencyContacts();
}

// ========== Toggle Functions ==========
function toggleFavoriteStatus(index) {
  contactsDatabase[index].favorite = !contactsDatabase[index].favorite;
  displayAllContacts();
  saveToLocalStorage();
}

function toggleEmergencyStatus(index) {
  contactsDatabase[index].emergency = !contactsDatabase[index].emergency;
  displayAllContacts();
  saveToLocalStorage();
}

// ========== Sidebar Display Functions ==========
function displayFavoriteContacts() {
  var favList = contactsDatabase.filter(function(contact) {
    return contact.favorite;
  });
  var favCount = favList.length;
  var favMarkup = "";
  
  for (var i = 0; i < favList.length; i++) {
    var avatarHtml = favList[i].image ?
      `<div class="flex-shrink-0 contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
        <img src="${favList[i].image}" alt="" class="w-100 h-100" />
      </div>` :
      `<div class="flex-shrink-0 default-avatar contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
        ${getNameInitials(favList[i].fullName)}
      </div>`;
    
    favMarkup += `
      <div class="d-flex gap-2 fav-item align-items-center mb-3">
        ${avatarHtml}
        <div class="flex-grow-1">
          <h4 class="m-0 fs-6">${favList[i].fullName}</h4>
          <p class="m-0 phone-number">${favList[i].phoneNumber}</p>
        </div>
        <a href="tel:${favList[i].phoneNumber}" class="d-flex phone-icon align-items-center justify-content-center flex-shrink-0">
          <i class="fa-solid fa-phone"></i>
        </a>
      </div>
    `;
  }
  
  if (favCount === 0) {
    favMarkup = `<div class="emptyStateMsg text-center"><p class="text-secondary-muted fw-bold">No favorites yet</p></div>`;
  }
  
  document.getElementById("favoritesList").innerHTML = favMarkup;
  document.getElementById("favCount").innerHTML = favCount;
}

function displayEmergencyContacts() {
  var emergencyList = contactsDatabase.filter(function(contact) {
    return contact.emergency;
  });
  var emergencyCount = emergencyList.length;
  var emergencyMarkup = "";
  
  for (var i = 0; i < emergencyList.length; i++) {
    var avatarHtml = emergencyList[i].image ?
      `<div class="flex-shrink-0 contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
        <img src="${emergencyList[i].image}" alt="" class="w-100 h-100" />
      </div>` :
      `<div class="flex-shrink-0 default-avatar contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
        ${getNameInitials(emergencyList[i].fullName)}
      </div>`;
    
    emergencyMarkup += `
      <div class="d-flex gap-2 emergency-item align-items-center mb-3">
        ${avatarHtml}
        <div class="flex-grow-1">
          <h4 class="m-0 fs-6">${emergencyList[i].fullName}</h4>
          <p class="m-0 phone-number">${emergencyList[i].phoneNumber}</p>
        </div>
        <a href="tel:${emergencyList[i].phoneNumber}" class="d-flex phone-icon align-items-center justify-content-center flex-shrink-0">
          <i class="fa-solid fa-phone"></i>
        </a>
      </div>
    `;
  }
  
  if (emergencyCount === 0) {
    emergencyMarkup = `<div class="emptyStateMsg text-center"><p class="text-secondary-muted fw-bold">No emergency contacts</p></div>`;
  }
  
  document.getElementById("emergencyList").innerHTML = emergencyMarkup;
  document.getElementById("emergencyCount").innerHTML = emergencyCount;
}

// ========== Helper Functions ==========
function isFavoriteChecked() {
  return favoriteCheckbox.checked;
}

function isEmergencyChecked() {
  return emergencyCheckbox.checked;
}

// ========== Create Contact ==========
function createContact() {
  if (isDuplicatePhoneNumber()) {
    swal("Error", "This phone number already exists in your contacts.", "error");
    return;
  }
  
  if (validateFormFields()) {
    if (profileImageInput.files[0]) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(profileImageInput.files[0]);
      
      fileReader.onload = function() {
        var newContact = {
          id: Date.now(),
          fullName: contactNameField.value,
          phoneNumber: contactPhoneField.value,
          emailAdress: contactEmailField.value,
          address: contactAddressField.value,
          group: contactGroupSelect.value,
          note: contactNotesField.value,
          image: fileReader.result,
          emergency: isEmergencyChecked(),
          favorite: isFavoriteChecked(),
        };
        contactsDatabase.push(newContact);
        resetFormFields();
        displayAllContacts();
        saveToLocalStorage();
        swal({
          title: "Success",
          text: "Contact added successfully!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      };
    } else {
      var newContact = {
        id: Date.now(),
        fullName: contactNameField.value,
        phoneNumber: contactPhoneField.value,
        emailAdress: contactEmailField.value,
        address: contactAddressField.value,
        group: contactGroupSelect.value,
        note: contactNotesField.value,
        image: null,
        emergency: isEmergencyChecked(),
        favorite: isFavoriteChecked(),
      };
      contactsDatabase.push(newContact);
      resetFormFields();
      displayAllContacts();
      saveToLocalStorage();
      swal({
        title: "Success",
        text: "Contact added successfully!",
        icon: "success",
        timer: 1000,
        buttons: false,
      });
    }
  } else {
    swal("Error", "Please fix the errors in the form before saving.", "error");
  }
}

// ========== Reset Form ==========
function resetFormFields() {
  profileImageInput.value = null;
  contactNameField.value = null;
  contactPhoneField.value = null;
  contactEmailField.value = null;
  contactGroupSelect.value = null;
  contactAddressField.value = null;
  contactNotesField.value = null;
  favoriteCheckbox.checked = false;
  emergencyCheckbox.checked = false;
  imagePreviewContainer.innerHTML = `
    <div class="default-avatar rounded-circle d-flex align-items-center justify-content-center h-100 overflow-hidden">
      <i class="fa-solid fa-user text-white fs-2"></i>
    </div>
  `;
  saveBtn.classList.replace("d-none", "d-block");
  modifyBtn.classList.replace("d-block", "d-none");
  contactNameField.classList.remove("is-invalid");
  nameError.classList.add("d-none");
  contactEmailField.classList.remove("is-invalid");
  emailError.classList.add("d-none");
  contactPhoneField.classList.remove("is-invalid");
  phoneError.classList.add("d-none");
}

// ========== Image Preview ==========
profileImageInput.onchange = function() {
  var fileReader = new FileReader();
  fileReader.readAsDataURL(profileImageInput.files[0]);
  fileReader.onload = function() {
    imagePreviewContainer.innerHTML = `
      <div class="default-avatar rounded-circle d-flex align-items-center justify-content-center h-100 overflow-hidden">
        <img src="${fileReader.result}" alt="" class="position-absolute w-100 h-100 top-0 start-0 bottom-0 end-0 rounded-24px object-fit-cover" />
      </div>
    `;
  };
};

// ========== Local Storage ==========
function saveToLocalStorage() {
  localStorage.setItem("all contacts", JSON.stringify(contactsDatabase));
}

// ========== Remove Contact ==========
function removeContact(id) {
  var contactToDelete = contactsDatabase.find(function(contact) {
    return contact.id == id;
  });
  
  swal({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactToDelete.fullName}? This action cannot be undone.`,
    icon: "warning",
    buttons: ["Cancel", "Yes, delete it!"],
    dangerMode: true,
  }).then(function(willDelete) {
    if (willDelete) {
      contactsDatabase = contactsDatabase.filter(function(contact) {
        return contact.id != id;
      });
      saveToLocalStorage();
      displayAllContacts();
      
      swal({
        title: "Deleted",
        text: "Contact deleted successfully",
        icon: "success",
        timer: 1000,
        buttons: false,
      });
    }
  });
}

// ========== Search Function ==========
function filterContacts(searchTerm) {
  var filteredList = contactsDatabase.filter(function(contact) {
    return contact.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  displayAllContacts(filteredList);
}

// ========== Get Name Initials ==========
function getNameInitials(fullName) {
  var nameParts = fullName.split(" ");
  if (nameParts.length >= 2) {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  } else if (nameParts[0].length > 0) {
    return nameParts[0][0].toUpperCase();
  }
}

// ========== Prepare Form for Update ==========
function prepareFormForUpdate(id) {
  modifyBtn.classList.replace("d-none", "d-block");
  saveBtn.classList.replace("d-block", "d-none");
  selectedContactForUpdate = contactsDatabase.find(function(contact) {
    return contact.id == id;
  });
  
  contactNameField.value = selectedContactForUpdate.fullName;
  contactPhoneField.value = selectedContactForUpdate.phoneNumber;
  contactEmailField.value = selectedContactForUpdate.emailAdress;
  contactAddressField.value = selectedContactForUpdate.address;
  contactGroupSelect.value = selectedContactForUpdate.group;
  contactNotesField.value = selectedContactForUpdate.note;
  favoriteCheckbox.checked = selectedContactForUpdate.favorite;
  emergencyCheckbox.checked = selectedContactForUpdate.emergency;
  
  if (selectedContactForUpdate.image) {
    imagePreviewContainer.innerHTML = `
      <div class="rounded-circle d-flex align-items-center justify-content-center h-100 overflow-hidden">
        <img src="${selectedContactForUpdate.image}" alt="" class="position-absolute w-100 h-100 top-0 start-0 bottom-0 end-0 rounded-24px object-fit-cover" />
      </div>
    `;
  } else {
    imagePreviewContainer.innerHTML = `
      <div class="default-avatar rounded-circle d-flex align-items-center justify-content-center h-100 overflow-hidden">
        <span class="text-white fs-2">${selectedContactForUpdate.fullName[0].toUpperCase()}</span>
      </div>
    `;
  }
}

// ========== Modify Contact ==========
function modifyContact() {
  if (validateFormFields()) {
    selectedContactForUpdate.fullName = contactNameField.value;
    selectedContactForUpdate.phoneNumber = contactPhoneField.value;
    selectedContactForUpdate.emailAdress = contactEmailField.value;
    selectedContactForUpdate.address = contactAddressField.value;
    selectedContactForUpdate.group = contactGroupSelect.value;
    selectedContactForUpdate.note = contactNotesField.value;
    selectedContactForUpdate.favorite = favoriteCheckbox.checked;
    selectedContactForUpdate.emergency = emergencyCheckbox.checked;
    
    if (profileImageInput.files[0]) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(profileImageInput.files[0]);
      fileReader.onload = function() {
        selectedContactForUpdate.image = fileReader.result;
        displayAllContacts();
        saveToLocalStorage();
      };
    } else {
      displayAllContacts();
      saveToLocalStorage();
    }
    
    resetFormFields();
  } else {
    swal("Error", "Please fix the errors in the form before saving.", "error");
  }
}

// ========== Validation Functions ==========
function validateName() {
  var namePattern = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
  var inputValue = contactNameField.value;
  
  if (namePattern.test(inputValue)) {
    contactNameField.classList.remove("is-invalid");
    nameError.classList.add("d-none");
    return true;
  } else {
    nameError.classList.remove("d-none");
    contactNameField.classList.add("is-invalid");
    return false;
  }
}

function validatePhone() {
  var phonePattern = /^(\+20|0020|20)?0?1[0125][0-9]{8}$/;
  var inputValue = contactPhoneField.value;
  
  if (phonePattern.test(inputValue)) {
    contactPhoneField.classList.remove("is-invalid");
    phoneError.classList.add("d-none");
    return true;
  } else {
    contactPhoneField.classList.add("is-invalid");
    phoneError.classList.remove("d-none");
    return false;
  }
}

function validateEmail() {
  var emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  var inputValue = contactEmailField.value;
  
  if (inputValue === "" || emailPattern.test(inputValue)) {
    contactEmailField.classList.remove("is-invalid");
    emailError.classList.add("d-none");
    return true;
  } else {
    contactEmailField.classList.add("is-invalid");
    emailError.classList.remove("d-none");
    return false;
  }
}

function validateFormFields() {
  var isNameValid = validateName();
  var isPhoneValid = validatePhone();
  var isEmailValid = validateEmail();
  
  return isNameValid && isPhoneValid && isEmailValid;
}

// ========== Check Duplicate Phone ==========
function isDuplicatePhoneNumber() {
  for (var i = 0; i < contactsDatabase.length; i++) {
    if (contactsDatabase[i].phoneNumber === contactPhoneField.value) {
      return true;
    }
  }
  return false;
}