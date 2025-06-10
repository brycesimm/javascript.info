// static methods are methods assigned to the class itself rather than an instance of the class. 
// they have the word "static" prepended to them when declared:

class User {
  static staticMethod() {
    console.log(this === User);
  }
}

User.staticMethod(); // true

// It's the same as assigning a method to the class directly as a property:
User.staticMethod2 = function() {
    console.log(this === User);
}

User.staticMethod2(); // true

// Static methods are useful for cases where a method needs to belong to the class and not to the 
// invididual instances themselves, like in the Article class where we can define a static compare() 
// method to be used for sorting an array of Article objects:

class Article {
  static publisher = "Ilya Kantor";

  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }

  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

console.log( articles[0].title ); // CSS

// We can also use static methods as factory methods for creating instances based on different 
// conditions. 

let article = Article.createTodays();

console.log( article.title ); // Today's digest

// static properties are also an option, also with their names prepended by the static keyword:
console.log( Article.publisher );

// static properties and methods are inheritable by child classes:

class Book extends Article {

}

let bookOne = new Book("Fourth Wing", new Date("04-03-2025"));
let bookTwo = new Book("The Hobbit", new Date("09-21-1937"));

let books = [ bookOne, bookTwo ];
books.sort(Book.compare); // Book.compare is Article.compare inherited
console.log(books);