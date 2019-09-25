

// -------------------------------------------------
function Human(_name, _age) {
    this.name = _name;
    this.age = _age;
}

Human.prototype.showName = function() {
    console.log(this.name);
}

Human.prototype.showAge = function() {
    console.log(this.age);
}

// Human.prototype.name = "Bruce Wayne";
// Human.prototype.age = 40;

function HeroMan(_career) {
    this.career = _career;
}

HeroMan.prototype = new Human();

HeroMan.prototype.showJob = function() {
    console.log(this.career);
}

const Batman = new HeroMan('CEO');

console.log(HeroMan.prototype === Batman.__proto__);

HeroMan.prototype.name = "Bruce Wayne";
HeroMan.prototype.age = 40;

console.log(typeof HeroMan.__proto__.name);

// __proto__ points to constructor of Object parent

console.log(Batman.__proto__.name);
console.log(Batman.__proto__.age);
console.log(Batman.__proto__.career); // undefined, cause it is not prototype attribute which was added
// Batman.name = "Clark Kent";
// Batman.age = 35;
Batman.showName();
Batman.showAge();
Batman.showJob();

// -------------------------------------------------
