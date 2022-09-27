const object1 = {
    a: 1,
    b: 2,
    c: 3
};

const object2 = {
    c: 4,
    d: 5
}
const object3 = Object.assign({c:5, e:7},object2, object1);

console.log(object1 ,object2, object3)