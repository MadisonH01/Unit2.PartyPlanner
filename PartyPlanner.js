const createParty = (dataEvent) => {
    return {
        id: dataEvent.id,
        name: dataEvent.name,
        description: dataEvent.description,
        date: dataEvent.date,
        location: dataEvent.location,
    }
}

const state = {
    parties: []
}
const cohortName = '2310-fsa-et-web-pt-sf-b-madison';
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}/events`;

const render = function(template, node) {
    node.innerHTML = template;
};

async function pullingInfo() {
    const result = await fetch(API_URL);
    const data = await result.json();
    // checking errors..

    // Transforming Data -> Taking information/data from an API and converting it to a APP friendly format.
    // iterate over data array [{event}, {}]
        // for each event, create a new party
            // const party = createParty(dataEvent)
            // push party into state.parties     
    data.forEach(element => {
        const party = createParty(element);
        console.log(element);
        state.push(party);
    });
    const template = `<li>${data.statusText}</li>`;
    render(template, document.getElementById('eventslist'));
}
pullingInfo();
