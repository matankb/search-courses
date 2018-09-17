const {englishPrepositions} = require("../utils/prepositions");

class FilterByText {
    constructor (courses = [], text = "") {
        const keywords = this.getKeywords(text);
        const matchingCourses = this.findMatchingCourses(courses, keywords);
        this.visibleCourses = this.setRelevance(matchingCourses, keywords);
    }

    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      }
    
    // Gets the search keywords and puts them into an array.
    getKeywords (text) {
        return text.split(" ").filter((keyword) => {
            const lowerCaseKeyword = keyword.toLowerCase();
            //Discards prepositions as keywords.
            const isPreposition = (keyword, prepositions) => prepositions.includes(keyword);

            return keyword.length > 0 && !isPreposition(lowerCaseKeyword, englishPrepositions);
        }).map((keyword) => {
            //Finds special characters and escapes them.
            return this.escapeRegExp(keyword);
        });
    }

    //Returns only matching courses from the keywords.
    findMatchingCourses (courses, keywords) {
        return courses.filter((course) => {
            const containsKeyword = keywords.map((keyword) => {
                const titleMatch = new RegExp("\\b" + keyword.toLowerCase() + "\\b").test(course.title.toLowerCase());
                const bodyMatch = new RegExp("\\b" + keyword.toLowerCase() + "\\b").test(course.description.toLowerCase());
        
                return titleMatch || bodyMatch;
            });

            return containsKeyword.includes(true);
        });
    }
    /*
    * setRelevance:
    * - If it finds a word match in the title returns a relevance of 2. 
    * - If it finds a word match in the body return a relevance of 1.
    * - If no word is matched returns 0.
    * - If all keywords are matched in a course adds more points.
    * - All the points get added in the end to decide how relevant the course is.
    */
    setRelevance (matchingCourses, keywords) {
        return matchingCourses.map((course) => {
            
            const numberOfKeywordsMatched = keywords.map((keyword) => {
                const titleMatches = course.title.split(" ").map((word) => (
                    new RegExp("\\b" + keyword.toLowerCase() + "\\b").test(word.toLowerCase()) ? 2 : 0
                ));
                const bodyMatches = course.description.split(" ").map((word) => (
                    new RegExp("\\b" + keyword.toLowerCase() + "\\b").test(word.toLowerCase()) ? 1 : 0
                ));
                
                // Returns the total relevance adding title matches with body matches.
                return titleMatches.concat(bodyMatches).reduce((accumulator, currentValue) => accumulator + currentValue);
            });

            const multipleKeywordsMatch = this.multipleKeywordsMatch(numberOfKeywordsMatched).concat(numberOfKeywordsMatched);
            
            const relevance = multipleKeywordsMatch.reduce((accumulator, currentValue) => (
                accumulator + currentValue
            ));
        
            return {
                ...course,
                numberOfKeywordsMatched: relevance
            };
        });
    }

    // Checks if multiple or all the keywords match in the same course.
    multipleKeywordsMatch (matches) {
        const matchedWords = matches.filter((match) => {
            return match !== 0;
        });

        return matchedWords.length > 1 ? [matchedWords.length] : [0];
    }
};

module.exports = { FilterByText };