const createParty = (dataEvent) => {
  return {
    id: dataEvent.id,
    name: dataEvent.name,
    description: dataEvent.description,
    date: dataEvent.date,
    location: dataEvent.location,
  };
};

const state = {
  parties: [],
};
const cohortName = "2310-fsa-et-web-pt-sf-b-madison";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}/events`;
const createPartyForm = document.getElementById("createParty");

// functions
async function pullingInfo() {
  try {
    const result = await fetch(API_URL);
    if (!result.ok) {
      throw new Error(`Failed to fetch data. Status: ${result.status}`);
    }
    const data = await result.json();
    console.log(data.data);

    state.parties = data.data.map(createParty);
    updateUI();
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
pullingInfo();

createPartyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  const eventData = {
    name: name,
    location: location,
    date: new Date(date).toISOString(),
    description: description,
  };
  console.log(eventData);
  fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  }).then((response) => {
    console.log(response);
  });
  state.parties.push(eventData);
  updateUI();
  createPartyForm.reset();
});
function updateUI() {
  const eventsList = document.getElementById("eventslist");
  eventsList.innerHTML = "";
  state.parties.forEach(function (eventData) {
    const listItem = document.createElement("li");
    const eventDate = new Date(eventData.date);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = eventData.id;
    deleteButton.addEventListener("click", deleteParty);
    listItem.textContent = `${eventData.name} - ${
      eventData.location
    } - ${eventDate.toLocaleString()} - ${eventData.description}`;
    listItem.appendChild(deleteButton);
    eventsList.appendChild(listItem);
  });
}

function deleteParty(element) {
  const partyId = element.target.dataset.id;
  fetch(API_URL + "/" + partyId, {
    method: "DELETE",
  }).then((response) => console.log(response));
  let toBeDeletedIndex = 0;
  state.parties.forEach((party, index) => {
    if (partyId == party.id) {
      toBeDeletedIndex = index;
    }
  });
  state.parties.splice(toBeDeletedIndex, 1);
  updateUI();
}
