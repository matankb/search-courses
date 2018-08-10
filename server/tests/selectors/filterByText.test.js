const { FilterByText } = require("../../selectors/filterByText");
const { courses } = require("../fixtures/courses");

let filterByText;

beforeEach(() => {
    filterByText = new FilterByText(courses, "angular");
});

test("should split the keywords individually", () => {
    const text = "World history";

    const keywords = filterByText.keywords(text);

    expect(keywords).toEqual([
        "World", "history"
    ]);
});

test("should split the keywords individually and omit AND and OF", () => {
    const text = "History oF Art And Math";

    const keywords = filterByText.keywords(text);

    expect(keywords).toEqual([
        "History", "Art", "Math"
    ]);
});

test("should retrun only the courses with the matching words", () => {
    const keywords = ["GUACAMOLE"];
    const matchingCourses = filterByText.matchingCourses(courses, keywords);

    expect(matchingCourses).toEqual([
        courses[1],
        courses[2]
    ]);
});

test("should return how relevant the course is depending on the keword matches in the course", () => {
    const keywords = ["GUACAMOLE", "cheese"];
    //Matching keywords in the title count double.
    const courses = [{
        title: "Advanced Java and cheese",
        description: "some cheese description guacamole and nachos with cheese",
        price: "50",
        duration: "",
        urlToCourse: "some_url",
        platform: "udemy",
        uid: 2
    }, {
        title: "Java",
        description: "some description guacamole and nachos with",
        price: "50",
        duration: "",
        urlToCourse: "some_url",
        platform: "udemy",
        uid: 2
    }];

    const setRelevance = filterByText.setRelevance(courses, keywords);

    expect(setRelevance[0].numberOfKeywordsMatched).toBe(7);
});


test("should add more relevance to courses that match 2 or more keywords", () => {
    const oneMatch = [2, 0];
    const twoMatches = [2, 2];
    const threeMatches = [1, 3, 4];
    const twoOutOfThreeMatches = [0, 1, 2];

    const checkDoubleMatchOne = filterByText.multipleKeywordsMatch(oneMatch);
    const checkDoubleMatchTwo = filterByText.multipleKeywordsMatch(twoMatches);
    const checkDoubleMatchThree = filterByText.multipleKeywordsMatch(threeMatches);
    const checkDoubleMatchFour = filterByText.multipleKeywordsMatch(twoOutOfThreeMatches);

    expect(checkDoubleMatchOne).toEqual([0]);
    expect(checkDoubleMatchTwo).toEqual([2]);
    expect(checkDoubleMatchThree).toEqual([3]);
    expect(checkDoubleMatchFour).toEqual([2]);
});