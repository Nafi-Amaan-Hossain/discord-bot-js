let jokes = require('./jokes.json');

let randomJoke = () => {return jokes[Math.floor(Math.random() * jokes.length)];}


let programmingJokes = () => {
  jokes.filter((joke)=> joke.type == "programming");
}

let randomProgrammingJoke = () =>{
 return programmingJokes[Math.floor(Math.random() * programmingJokes.length)];
}

let generalJokes = () => {
  jokes.filter((joke)=> joke.type == "general");
}

let randomGeneralJoke = () =>{
 return generalJokes[Math.floor(Math.random() * generalJokes.length)];
}

let knockJokes = () => {
  jokes.filter((joke)=> joke.type == "knock-knock");
}

let randomKnockJoke = ()=>{
 return knockJokes[Math.floor(Math.random() * knockJokes.length)];
}

module.exports = {
   jokes,
    randomJoke,
     randomProgrammingJoke,
      randomKnockJoke,
        randomGeneralJoke,
          knockJokes,
            generalJokes,
              programmingJokes
        }; 