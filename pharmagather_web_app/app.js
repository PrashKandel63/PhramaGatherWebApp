const recivedPrescriptionList = document.querySelector(
    "#recieved-prescription-list"
);
const loadedPrescriptionList = document.querySelector(
    "#loaded-prescription-list"
);
const pickedPrescriptionList = document.querySelector(
    "#picked-prescription-list"
);
const tabRecived = document.querySelector("#recieved");
const tabLoaded = document.querySelector("#loaded");
const tabPicked = document.querySelector("#picked");
// modals elements ref
const priscriptionId = document.querySelector("#pId");
const priscriptionName = document.querySelector("#pName");
const priscriptionPhone = document.querySelector("#pPhone");
const priscriptionAddress = document.querySelector("#pAddress");
const priscriptionDOB = document.querySelector("#pDOB");
const priscriptionDoctor = document.querySelector("#pDocName");
const priscriptionIssue = document.querySelector("#pIssueDate");
const priscriptionMedList = document.querySelector("#medList");
const priscriptionStatus = document.querySelector("#pStatus");

const printButton = document.querySelector("#printButton");
printButton.onclick = function() {
    window.print();
};
// tab click handled
recivedPrescriptionList.style.display = "none";
loadedPrescriptionList.style.display = "none";
pickedPrescriptionList.style.display = "none";
recivedPrescriptionList.style.display = "block";

tabRecived.addEventListener("click", (e) => {
    console.log("tab recieved is clicked!");
    tabRecived.classList.remove("disabled");
    tabLoaded.classList.add("disabled");
    tabPicked.classList.add("disabled");

    recivedPrescriptionList.style.display = "none";
    loadedPrescriptionList.style.display = "none";
    pickedPrescriptionList.style.display = "none";
    recivedPrescriptionList.style.display = "block";
});
tabLoaded.addEventListener("click", (e) => {
    console.log("tab loaded is clicked!");
    tabLoaded.classList.remove("disabled");
    tabRecived.classList.add("disabled");
    tabPicked.classList.add("disabled");

    recivedPrescriptionList.style.display = "none";
    loadedPrescriptionList.style.display = "none";
    pickedPrescriptionList.style.display = "none";
    loadedPrescriptionList.style.display = "block";
});
tabPicked.addEventListener("click", (e) => {
    console.log("tab picked is clicked!");
    tabPicked.classList.remove("disabled");
    tabLoaded.classList.add("disabled");
    tabRecived.classList.add("disabled");

    recivedPrescriptionList.style.display = "none";
    loadedPrescriptionList.style.display = "none";
    pickedPrescriptionList.style.display = "none";
    pickedPrescriptionList.style.display = "block";
});
// format phone number
function formatPhone(phone) {
    let result = "(";
    result += phone.substring(0, 3);
    result += ") " + phone.substring(3, 6);
    result += "-" + phone.substring(6);
    return result;
}
// render data to the modal
function renderModal(doc) {
    priscriptionId.textContent = doc.id;
    priscriptionName.textContent =
        doc.data().FirstName + " " + doc.data().LastName;
    priscriptionPhone.textContent = formatPhone(doc.data().Phone);
    priscriptionAddress.textContent = doc.data().Address;
    priscriptionDOB.textContent = doc.data().DOB;
    priscriptionDoctor.textContent = doc.data().Doctor;
    priscriptionIssue.textContent = "4/19/2020";
    priscriptionMedList.textContent = doc.data().MedList;
    priscriptionStatus.textContent = doc.data().Status;
}

// render data to the prescription
function renderPrescription(doc) {
    let li = document.createElement("li");
    let name = document.createElement("span");
    let phone = document.createElement("span");

    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().FirstName + " " + doc.data().LastName;
    phone.textContent = doc.id;
    let status = doc.data().Status;

    li.appendChild(name);
    li.appendChild(phone);
    if (status == "new") {
        recivedPrescriptionList.appendChild(li);
    }
    if (status == "loaded") {
        loadedPrescriptionList.appendChild(li);
    }
    if (status == "pickedUp") {
        pickedPrescriptionList.appendChild(li);
    }

    li.addEventListener("click", (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("Prescription")
            .doc(id)
            .get()
            .then((curDoc) => {
                console.log(curDoc.data().FirstName);
                renderModal(curDoc);
            });

        JsBarcode("#barcode", id);
        modal.style.display = "block";
    });
}
// dleter all childs from an ul
function deleteChild(e) {
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
// get data
function getData() {
    db.collection("Prescription")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                //console.log(doc.data());
                renderPrescription(doc);
            });
        });
}
// change listener
db.collection("Prescription").onSnapshot((snapshot) => {
    // delete every thing
    deleteChild(recivedPrescriptionList);
    deleteChild(loadedPrescriptionList);
    deleteChild(pickedPrescriptionList);
    // render data again
    getData();
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

JsBarcode("#barcode", "Hi!");