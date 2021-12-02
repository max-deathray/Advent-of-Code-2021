const fs = require("fs");

const plannedCourseArray = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n");

console.log("length of total array:", plannedCourseArray.length);

const buildCourseObject = (plannedCourse) => {
  const aggregatedCourse = {
    forward: 0,
    down: 0,
  };

  for (let i = 0; i < plannedCourse.length; i++) {
    const command = plannedCourse[i];

    const [direction, distance] = command.split(" ");

    switch (direction) {
      case "forward":
        aggregatedCourse["forward"] += Number(distance);
        break;
      case "down":
        aggregatedCourse["down"] += Number(distance);
        break;
      case "up":
        aggregatedCourse["down"] -= Number(distance);
        break;
    }
  }

  return aggregatedCourse;
};

const { forward, down } = buildCourseObject(plannedCourseArray);

console.log({ forward, down });

console.log(forward * down);
