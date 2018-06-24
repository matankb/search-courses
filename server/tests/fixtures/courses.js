const courses = [
    {
        title: "Learn angular",
        description: "this course is from test data. Angular",
        price: "300",
        duration: "",
        urlToCourse: "some_url",
        platform: "udacity",
        numberOfKeywordsMatched: expect.anything(),
        uid: 1
    },
    {
        title: "Advanced Java",
        description: "some description",
        price: "50",
        duration: "",
        urlToCourse: "some_url",
        platform: "udemy",
        numberOfKeywordsMatched: expect.anything(),
        uid: 2
    },
    {
        title: "Angular.js",
        description: "some description",
        price: "100",
        duration: "",
        urlToCourse: "some_url",
        platform: "khan academy",
        numberOfKeywordsMatched: expect.anything(),
        uid: 3
    }
];

module.exports = { courses };