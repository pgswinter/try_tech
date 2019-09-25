// thinking 3 pattern
const countriesPeople = [
    {
        name: "Donal Trump",
        country: "US"
    },
    {
        name: "Kim Jong Un",
        country: "North Korea"
    },
    {
        name: "Vladimir Putin",
        country: "Russia"
    },
    {
        name: "Yin Xiping",
        country: "China"
    },
    {
        name: "Handsome Robert Nguyen",
        country: "Vietnam"
    }
];

// FIRST pattern is the OBJECT:
// Find the people suitable to country input

// function printPeople(people, country) {
//     for (let i = 0; i < people.length; i++) {
//         const thisPerson = people[i];

//         if (thisPerson.country === country)
//             console.log(thisPerson.name);
//     }
// }

// printPeople(countriesPeople, "Vietnam"); // There is HIGHT ORDER FUNCTION LEVEL 1

// ******************** ------------------------------------------------------------------------
// SECOND pattern: Create an ACTION

// function printPeople(people, country, action) {
//     for (let i = 0; i < people.length; i++) {
//         action(people[i])
//     }
// }

// function action(person) {
//     if(person.country === "Vietnam") {
//         console.log(person.name);
//     }
// }

// printPeople(countriesPeople, "Vietnam", action); // There is HIGHT ORDER FUNCTION LEVEL 2

// ******************** ------------------------------------------------------------------------
// THIRD pattern: Create an SELECTOR

// function printPeople(people, selector, action) {
//     people.forEach(person => {
//         if (selector(person)) {
//             action(person)
//         }
//     })
// }

// const inVietnam = person => person.country === 'Vietnam';

// const consoleLogPerson = person => console.log(person);

// printPeople(countriesPeople, inVietnam, consoleLogPerson);  // There is HIGHT ORDER FUNCTION LEVEL 3

// ******************** ------------------------------------------------------------------------
// Make it shorter: ES6

const printPeople = (people, selector, action) => people.filter(person => selector(person)).map(person => action(person)) // There is HIGHT ORDER FUNCTION LEVEL 4
const inVietnam = person => person.country === 'Vietnam';
const consoleLogPerson = person => console.log(person);

printPeople(countriesPeople, inVietnam, consoleLogPerson);
 