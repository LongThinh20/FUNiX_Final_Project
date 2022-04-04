const arr = [
  { name: "AN ", age: 12, grade: 7 },
  { name: "Bao ", age: 32, grade: 5 },
  { name: "ha ", age: 20, grade: 9 }
];

const condition = {
  aeg: 15,
  grade: ""
};

const test = arr.filter(
  (i) => i.age < condition.aeg && i.grade < condition.grade
);

const tt = new Date("2021-12-1");
const dd = new Date("2022-2-1");

console.log(Boolean(tt.getTime() >= dd.getTime()));

console.log(test);
