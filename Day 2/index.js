const fs = require("fs");

const plannedCourseArray = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n");

console.log("length of total array:", plannedCourseArray.length);

const buildCourseObject = (plannedCourse) => {
  const aggregatedCourse = {
    hPosition: 0,
    depth: 0,
    aim: 0,
  };

  for (let i = 0; i < plannedCourse.length; i++) {
    const command = plannedCourse[i];

    const [direction, distance] = command.split(" ");

    switch (direction) {
      case "forward":
        aggregatedCourse["hPosition"] += Number(distance);
        const depthIncrease = aggregatedCourse["aim"] * Number(distance);
        aggregatedCourse["depth"] += depthIncrease;
        break;
      case "down":
        aggregatedCourse["aim"] += Number(distance);
        break;
      case "up":
        aggregatedCourse["aim"] -= Number(distance);
        break;
    }
  }

  return aggregatedCourse;
};

const { hPosition, depth, aim } = buildCourseObject(plannedCourseArray);

console.log({ hPosition, depth, aim });

console.log(hPosition * depth);
