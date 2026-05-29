import { useState, useEffect, useMemo } from "react";
import { TeamCard } from "./components/TeamCard";
import { QuestionCard } from "./components/QuestionCard";
import { Button } from "./components/ui/button";
import { RotateCcw, Moon, Sun, Settings } from "lucide-react";

interface TriviaQuestion {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

// Sample trivia questions with difficulty, topics, and answers
const triviaQuestions: TriviaQuestion[] = [
  // TV Shows
  { question: "What is the name of the fictional paper company in The Office, and in which city is its headquarters located?", answer: "Dunder Mifflin, Scranton Pennsylvania", difficulty: "medium", topic: "TV Shows" },
  { question: "In Breaking Bad, what is the street address of Walter White's house?", answer: "308 Negra Arroyo Lane, Albuquerque", difficulty: "hard", topic: "TV Shows" },
  { question: "What is the real name of the vigilante 'Green Arrow' in the TV show Arrow?", answer: "Oliver Queen", difficulty: "medium", topic: "TV Shows" },
  { question: "In Game of Thrones, what are the names of Daenerys Targaryen's three dragons?", answer: "Drogon, Rhaegal, and Viserion", difficulty: "hard", topic: "TV Shows" },
  { question: "How many episodes of Black Mirror are in the Netflix era (Season 3 onward)?", answer: "23 episodes", difficulty: "hard", topic: "TV Shows" },
  { question: "In Stranger Things, what is the name of the parallel dimension where the monsters come from?", answer: "The Upside Down", difficulty: "easy", topic: "TV Shows" },
  { question: "What is the full name of the actor who plays Saul Goodman in Breaking Bad and Better Call Saul?", answer: "Bob Odenkirk", difficulty: "medium", topic: "TV Shows" },
  { question: "In The Last of Us, what is the name of the fungal infection that turns people into monsters?", answer: "Cordyceps Brain Infection (CBI)", difficulty: "medium", topic: "TV Shows" },
  { question: "What network originally aired The Office (US)?", answer: "NBC", difficulty: "easy", topic: "TV Shows" },
  { question: "In Succession, what is the name of the media conglomerate owned by the Roy family?", answer: "Waystar Royco", difficulty: "medium", topic: "TV Shows" },
  { question: "What is the name of the high school in Euphoria?", answer: "East Highland High School", difficulty: "medium", topic: "TV Shows" },
  { question: "In Peaky Blinders, what city is the Shelby family gang based in?", answer: "Birmingham, England", difficulty: "easy", topic: "TV Shows" },
  { question: "How many total seasons does The Sopranos have?", answer: "6 seasons", difficulty: "medium", topic: "TV Shows" },
  { question: "In The Bear, what is the name of the Chicago sandwich shop at the center of the show?", answer: "The Original Beef of Chicagoland", difficulty: "hard", topic: "TV Shows" },
  { question: "What is the name of Walter White's DEA agent brother-in-law in Breaking Bad?", answer: "Hank Schrader", difficulty: "medium", topic: "TV Shows" },
  
  // Movies
  { question: "What is the name of the train in Snowpiercer that carries the last survivors of humanity?", answer: "Snowpiercer", difficulty: "medium", topic: "Movies" },
  { question: "In Interstellar, what is the name of the wormhole's location near which planet?", answer: "Saturn", difficulty: "hard", topic: "Movies" },
  { question: "Who composed the original score for the movie Inception?", answer: "Hans Zimmer", difficulty: "medium", topic: "Movies" },
  { question: "What is the name of the corporation in the movie Avatar?", answer: "Resources Development Administration (RDA)", difficulty: "hard", topic: "Movies" },
  { question: "In The Dark Knight, what bank does The Joker rob in the opening scene?", answer: "Gotham National Bank", difficulty: "hard", topic: "Movies" },
  { question: "What is the budget of the first Iron Man movie?", answer: "$140 million", difficulty: "hard", topic: "Movies" },
  { question: "Who directed the original Jurassic Park (1993)?", answer: "Steven Spielberg", difficulty: "medium", topic: "Movies" },
  { question: "In which movie does Leonardo DiCaprio play Jordan Belfort?", answer: "The Wolf of Wall Street", difficulty: "easy", topic: "Movies" },
  { question: "What is the name of the fictional element in Black Panther?", answer: "Vibranium", difficulty: "easy", topic: "Movies" },
  { question: "Who directed the 2019 film Parasite, which won the Academy Award for Best Picture?", answer: "Bong Joon-ho", difficulty: "medium", topic: "Movies" },
  { question: "In Oppenheimer, which US government project was Oppenheimer the scientific director of?", answer: "The Manhattan Project", difficulty: "medium", topic: "Movies" },
  { question: "What is the name of the prison in The Shawshank Redemption?", answer: "Shawshank State Penitentiary", difficulty: "medium", topic: "Movies" },
  { question: "In Pulp Fiction, what is the name of the burger that Jules and Vincent discuss?", answer: "Royale with Cheese", difficulty: "medium", topic: "Movies" },
  { question: "Who directed the original Star Wars trilogy?", answer: "George Lucas directed A New Hope; Irvin Kershner directed Empire Strikes Back; Richard Marquand directed Return of the Jedi", difficulty: "hard", topic: "Movies" },
  { question: "What year was the first Toy Story movie released?", answer: "1995", difficulty: "medium", topic: "Movies" },
  
  // Music
  { question: "What is the name of Tyler the Creator's 2021 Grammy-winning album?", answer: "Call Me If You Get Lost", difficulty: "hard", topic: "Music" },
  { question: "Which artist holds the record for most Grammy awards won in a single night?", answer: "Beyoncé (9 awards in one night, 2010)", difficulty: "hard", topic: "Music" },
  { question: "What is the real name of the rapper known as Childish Gambino?", answer: "Donald Glover", difficulty: "medium", topic: "Music" },
  { question: "What was the name of Kendrick Lamar's album that won the Pulitzer Prize for Music?", answer: "DAMN.", difficulty: "medium", topic: "Music" },
  { question: "Which city did the band Nirvana originally form in?", answer: "Aberdeen, Washington", difficulty: "hard", topic: "Music" },
  { question: "What is the best-selling album of all time?", answer: "Thriller by Michael Jackson", difficulty: "medium", topic: "Music" },
  { question: "In what year did Kanye West release 'The College Dropout'?", answer: "2004", difficulty: "medium", topic: "Music" },
  { question: "What instrument does Billie Eilish's brother Finneas primarily play?", answer: "Guitar and keyboard/piano", difficulty: "hard", topic: "Music" },
  { question: "What is the name of Frank Ocean's 2016 visual album?", answer: "Endless", difficulty: "hard", topic: "Music" },
  { question: "Which Beatles album features the song 'Come Together'?", answer: "Abbey Road", difficulty: "medium", topic: "Music" },
  { question: "What year did The Weeknd release 'Blinding Lights'?", answer: "2019", difficulty: "medium", topic: "Music" },
  { question: "What is the name of Daft Punk's debut studio album?", answer: "Homework", difficulty: "hard", topic: "Music" },
  { question: "Which rapper's debut album was called 'Reasonable Doubt'?", answer: "Jay-Z", difficulty: "medium", topic: "Music" },
  { question: "What is the name of Taylor Swift's re-recorded version of her album '1989'?", answer: "1989 (Taylor's Version)", difficulty: "easy", topic: "Music" },
  { question: "Which artist released the critically acclaimed album 'To Pimp a Butterfly'?", answer: "Kendrick Lamar", difficulty: "medium", topic: "Music" },
  
  // Pop Culture / Gen Z
  { question: "What is the name of the meme format featuring a distracted boyfriend looking at another woman?", answer: "Distracted Boyfriend meme", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the term used for the TikTok algorithm's personalized feed?", answer: "For You Page (FYP)", difficulty: "easy", topic: "Pop Culture" },
  { question: "What anime is the character Levi Ackerman from?", answer: "Attack on Titan", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the name of the app that became TikTok after ByteDance acquired it?", answer: "Musical.ly", difficulty: "medium", topic: "Pop Culture" },
  { question: "In the anime Death Note, what is the name of the notebook that kills anyone whose name is written in it?", answer: "Death Note", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the name of the fictional company in the HBO show Silicon Valley?", answer: "Pied Piper", difficulty: "medium", topic: "Pop Culture" },
  { question: "What does the internet slang 'NPC' stand for?", answer: "Non-Player Character", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the name of the Minecraft character that players control by default?", answer: "Steve", difficulty: "easy", topic: "Pop Culture" },  { question: "What is the name of the popular Korean drama that took Netflix by storm in 2021 alongside Squid Game?", answer: "Hellbound", difficulty: "hard", topic: "Pop Culture" },

  // ============ TV SHOWS ============
  { question: "In The Wire, what Baltimore institution does the show NOT focus on across its 5 seasons?", answer: "The church (it covers drugs, docks, politics, schools, and media)", difficulty: "hard", topic: "TV Shows" },
  { question: "What is the name of the retirement community in Schitt's Creek?", answer: "Schitt's Creek", difficulty: "medium", topic: "TV Shows" },
  { question: "In Arrested Development, what is the name of the family's frozen banana stand?", answer: "Original Frozen Banana Stand", difficulty: "medium", topic: "TV Shows" },
  { question: "In It's Always Sunny in Philadelphia, what is the name of the gang's bar?", answer: "Paddy's Pub", difficulty: "medium", topic: "TV Shows" },
  { question: "What is the signature catchphrase of Barney Stinson in How I Met Your Mother?", answer: "Legen-wait for it-dary", difficulty: "easy", topic: "TV Shows" },
  { question: "In Seinfeld, what is George Costanza's go-to fake name?", answer: "Art Vandelay", difficulty: "hard", topic: "TV Shows" },
  { question: "What is the name of the hospital in Grey's Anatomy?", answer: "Grey Sloan Memorial Hospital", difficulty: "medium", topic: "TV Shows" },
  { question: "In Lost, what are the numbers that keep appearing throughout the show?", answer: "4, 8, 15, 16, 23, 42", difficulty: "hard", topic: "TV Shows" },
  { question: "What is the name of the island prison in Prison Break?", answer: "Fox River State Penitentiary", difficulty: "medium", topic: "TV Shows" },
  { question: "In Dexter, what does Dexter Morgan work as professionally?", answer: "Blood spatter analyst for Miami Metro Police", difficulty: "medium", topic: "TV Shows" },
  { question: "What is the name of the coffee shop in Gilmore Girls?", answer: "Luke's Diner", difficulty: "medium", topic: "TV Shows" },
  { question: "In House MD, what is Dr. House's first name?", answer: "Gregory", difficulty: "easy", topic: "TV Shows" },
  { question: "What is the real name of the character Eleven in Stranger Things?", answer: "Jane Hopper (born Jane Ives)", difficulty: "hard", topic: "TV Shows" },
  { question: "In The Mandalorian, what is the real name of Baby Yoda?", answer: "Grogu", difficulty: "easy", topic: "TV Shows" },
  { question: "What is the name of the high school in Glee?", answer: "William McKinley High School", difficulty: "medium", topic: "TV Shows" },
  { question: "In Westworld, what is the name of the park's creator?", answer: "Robert Ford (played by Anthony Hopkins)", difficulty: "medium", topic: "TV Shows" },
  { question: "What city is Suits set in?", answer: "New York City", difficulty: "easy", topic: "TV Shows" },
  { question: "In The Boys, what is the name of the superhero corporation?", answer: "Vought International", difficulty: "medium", topic: "TV Shows" },
  { question: "What is the name of the drug in Severance that splits work and personal memories?", answer: "The severance chip (MDR chip)", difficulty: "hard", topic: "TV Shows" },
  { question: "In Ozark, what lake do the Byrdes launder money around?", answer: "Lake of the Ozarks", difficulty: "medium", topic: "TV Shows" },
  { question: "What is Sheldon Cooper's apartment number in The Big Bang Theory?", answer: "4A", difficulty: "hard", topic: "TV Shows" },
  { question: "In Brooklyn Nine-Nine, who plays Captain Raymond Holt?", answer: "Andre Braugher", difficulty: "medium", topic: "TV Shows" },
  { question: "What is the name of the fictional streaming service in the show The Dropout?", answer: "The Dropout is about Theranos, not streaming", difficulty: "hard", topic: "TV Shows" },
  { question: "In Yellowstone, who plays John Dutton?", answer: "Kevin Costner", difficulty: "easy", topic: "TV Shows" },
  { question: "What network airs Euphoria?", answer: "HBO", difficulty: "easy", topic: "TV Shows" },
  { question: "In The Handmaid's Tale, what is the name of the dystopian country?", answer: "Gilead", difficulty: "easy", topic: "TV Shows" },
  { question: "What is the name of Walter White's meth partner in Breaking Bad?", answer: "Jesse Pinkman", difficulty: "easy", topic: "TV Shows" },
  { question: "In Vikings, who is the main protagonist in the early seasons?", answer: "Ragnar Lothbrok", difficulty: "easy", topic: "TV Shows" },
  { question: "What streaming platform hosts the show Squid Game?", answer: "Netflix", difficulty: "easy", topic: "TV Shows" },
  { question: "In Cobra Kai, what dojo does Johnny Lawrence restart?", answer: "Cobra Kai", difficulty: "easy", topic: "TV Shows" },
  
  // ============ MOVIES ============
  { question: "In The Matrix, what color pill does Neo take?", answer: "Red pill", difficulty: "easy", topic: "Movies" },
  { question: "Who directed Schindler's List?", answer: "Steven Spielberg", difficulty: "medium", topic: "Movies" },
  { question: "What is the name of the asteroid in Don't Look Up?", answer: "Comet Dibiasky", difficulty: "medium", topic: "Movies" },
  { question: "In Whiplash, what music conservatory is the film set in?", answer: "Shaffer Conservatory (fictional, based on Juilliard)", difficulty: "hard", topic: "Movies" },
  { question: "Who plays the Truman in The Truman Show?", answer: "Jim Carrey", difficulty: "easy", topic: "Movies" },
  { question: "What is the name of the spaceship in Alien?", answer: "USCSS Nostromo", difficulty: "hard", topic: "Movies" },
  { question: "In Fight Club, what is the first rule?", answer: "You do not talk about Fight Club", difficulty: "easy", topic: "Movies" },
  { question: "Who directed 2001: A Space Odyssey?", answer: "Stanley Kubrick", difficulty: "medium", topic: "Movies" },
  { question: "What is the name of the boat in Jaws?", answer: "Orca", difficulty: "hard", topic: "Movies" },
  { question: "In Forrest Gump, what does Forrest say life is like?", answer: "A box of chocolates", difficulty: "easy", topic: "Movies" },
  { question: "Who plays Patrick Bateman in American Psycho?", answer: "Christian Bale", difficulty: "medium", topic: "Movies" },
  { question: "What year was The Godfather released?", answer: "1972", difficulty: "medium", topic: "Movies" },
  { question: "In Blade Runner 2049, who plays the lead character K?", answer: "Ryan Gosling", difficulty: "medium", topic: "Movies" },
  { question: "What is the name of the resort in The Shining?", answer: "Overlook Hotel", difficulty: "medium", topic: "Movies" },
  { question: "In No Country for Old Men, what weapon does Anton Chigurh use?", answer: "Captive bolt pistol (cattle gun)", difficulty: "hard", topic: "Movies" },
  { question: "Who directed Mulholland Drive?", answer: "David Lynch", difficulty: "hard", topic: "Movies" },
  { question: "What is the subtitle of the second Avengers movie?", answer: "Age of Ultron", difficulty: "easy", topic: "Movies" },
  { question: "In La La Land, what instrument does Sebastian play?", answer: "Piano / Jazz piano", difficulty: "easy", topic: "Movies" },
  { question: "Who plays the Joker in The Dark Knight?", answer: "Heath Ledger", difficulty: "easy", topic: "Movies" },
  { question: "What is the name of the fishing village in Midsommar?", answer: "Hårga", difficulty: "hard", topic: "Movies" },
  { question: "In Spirited Away, what is the name of the bathhouse owner?", answer: "Yubaba", difficulty: "medium", topic: "Movies" },
  { question: "Who directed the original Scarface (1983)?", answer: "Brian De Palma", difficulty: "medium", topic: "Movies" },
  { question: "What city is The Dark Knight primarily set in?", answer: "Gotham City (filmed in Chicago)", difficulty: "easy", topic: "Movies" },
  { question: "In Hereditary, what demon is the family being prepared for?", answer: "Paimon", difficulty: "hard", topic: "Movies" },
  { question: "What is the name of the agency in the Jason Bourne series?", answer: "CIA / Operation Treadstone", difficulty: "medium", topic: "Movies" },
  { question: "Who composed the score for Star Wars?", answer: "John Williams", difficulty: "easy", topic: "Movies" },
  { question: "In Everything Everywhere All at Once, what multiverse machine is created using what object?", answer: "A googly eye", difficulty: "medium", topic: "Movies" },
  { question: "What was the first Pixar movie ever made?", answer: "Toy Story (1995)", difficulty: "easy", topic: "Movies" },
  { question: "In Goodfellas, who does Ray Liotta play?", answer: "Henry Hill", difficulty: "medium", topic: "Movies" },
  { question: "What is the name of the team in Dodgeball: A True Underdog Story?", answer: "Average Joes", difficulty: "medium", topic: "Movies" },
  
  // ============ MUSIC ============
  { question: "What was Michael Jackson's debut solo album?", answer: "Got to Be There (1972)", difficulty: "hard", topic: "Music" },
  { question: "What is the name of Doja Cat's debut studio album?", answer: "Amala", difficulty: "hard", topic: "Music" },
  { question: "Which band released the album 'OK Computer'?", answer: "Radiohead", difficulty: "medium", topic: "Music" },
  { question: "What is the best-selling single of all time?", answer: "White Christmas by Bing Crosby", difficulty: "hard", topic: "Music" },
  { question: "Who is the lead vocalist of Coldplay?", answer: "Chris Martin", difficulty: "easy", topic: "Music" },
  { question: "What year did Kurt Cobain die?", answer: "1994", difficulty: "medium", topic: "Music" },
  { question: "Which artist released the album 'good kid, m.A.A.d city'?", answer: "Kendrick Lamar", difficulty: "medium", topic: "Music" },
  { question: "What is the name of Eminem's alter ego?", answer: "Slim Shady", difficulty: "easy", topic: "Music" },
  { question: "Which country does BTS originate from?", answer: "South Korea", difficulty: "easy", topic: "Music" },
  { question: "What is the real name of the singer known as Lorde?", answer: "Ella Yelich-O'Connor", difficulty: "hard", topic: "Music" },
  { question: "Who produced the majority of Kanye West's early albums?", answer: "Kanye West himself", difficulty: "medium", topic: "Music" },
  { question: "What instrument is Jimi Hendrix famous for playing?", answer: "Electric guitar", difficulty: "easy", topic: "Music" },
  { question: "What is the name of Travis Scott's record label?", answer: "Cactus Jack Records", difficulty: "medium", topic: "Music" },
  { question: "Which album by Amy Winehouse won 5 Grammys?", answer: "Back to Black", difficulty: "medium", topic: "Music" },
  { question: "What is the name of Gorillaz's debut album?", answer: "Gorillaz (self-titled, 2001)", difficulty: "medium", topic: "Music" },
  { question: "Who is the lead singer of Arctic Monkeys?", answer: "Alex Turner", difficulty: "medium", topic: "Music" },
  { question: "What year did Elvis Presley die?", answer: "1977", difficulty: "medium", topic: "Music" },
  { question: "Which artist's real name is Abel Tesfaye?", answer: "The Weeknd", difficulty: "medium", topic: "Music" },
  { question: "What is the name of Pharrell Williams's 2014 hit that was in Despicable Me 2?", answer: "Happy", difficulty: "easy", topic: "Music" },
  { question: "Which rock band is Zack de la Rocha the vocalist of?", answer: "Rage Against the Machine", difficulty: "medium", topic: "Music" },
  { question: "What year was Thriller released?", answer: "1982", difficulty: "medium", topic: "Music" },
  { question: "Who wrote and produced Beyoncé's Lemonade album?", answer: "Beyoncé with multiple co-writers and producers including Jack White", difficulty: "hard", topic: "Music" },
  { question: "What is the name of Tyler the Creator's 2019 Grammy-winning album?", answer: "Igor", difficulty: "medium", topic: "Music" },
  { question: "Which DJ duo is made up of Guy-Manuel de Homem-Christo and Thomas Bangalter?", answer: "Daft Punk", difficulty: "hard", topic: "Music" },
  { question: "What is Post Malone's real name?", answer: "Austin Richard Post", difficulty: "medium", topic: "Music" },
  
  // ============ TECHNOLOGY ============
  { question: "What does CSS stand for?", answer: "Cascading Style Sheets", difficulty: "easy", topic: "Technology" },
  { question: "What is the name of the first computer virus?", answer: "Creeper (1971)", difficulty: "hard", topic: "Technology" },
  { question: "In what year was the World Wide Web invented?", answer: "1989 by Tim Berners-Lee", difficulty: "medium", topic: "Technology" },
  { question: "What does JSON stand for?", answer: "JavaScript Object Notation", difficulty: "medium", topic: "Technology" },
  { question: "Who is the CEO of Tesla?", answer: "Elon Musk", difficulty: "easy", topic: "Technology" },
  { question: "What is the name of Google's mobile operating system?", answer: "Android", difficulty: "easy", topic: "Technology" },
  { question: "What does IDE stand for in programming?", answer: "Integrated Development Environment", difficulty: "medium", topic: "Technology" },
  { question: "What is the name of the neural network architecture behind most modern AI chatbots?", answer: "Transformer architecture", difficulty: "hard", topic: "Technology" },
  { question: "Who founded Microsoft?", answer: "Bill Gates and Paul Allen", difficulty: "easy", topic: "Technology" },
  { question: "What is the primary programming language used to build iOS apps?", answer: "Swift", difficulty: "medium", topic: "Technology" },
  { question: "What does VPN stand for?", answer: "Virtual Private Network", difficulty: "easy", topic: "Technology" },
  { question: "What company developed the ChatGPT AI?", answer: "OpenAI", difficulty: "easy", topic: "Technology" },
  { question: "What is the name of Apple's desktop operating system?", answer: "macOS", difficulty: "easy", topic: "Technology" },
  { question: "What does IoT stand for?", answer: "Internet of Things", difficulty: "medium", topic: "Technology" },
  { question: "What year was the first Android phone released?", answer: "2008", difficulty: "medium", topic: "Technology" },
  { question: "What is the most starred project on GitHub of all time?", answer: "freeCodeCamp", difficulty: "hard", topic: "Technology" },
  { question: "What is Bluetooth named after?", answer: "Harald Bluetooth, a 10th century Danish king", difficulty: "hard", topic: "Technology" },
  { question: "What is the name of the vulnerability that affected almost all CPUs in 2018?", answer: "Spectre and Meltdown", difficulty: "hard", topic: "Technology" },
  { question: "What does OLED stand for?", answer: "Organic Light-Emitting Diode", difficulty: "medium", topic: "Technology" },
  { question: "What is the file extension for a Python file?", answer: ".py", difficulty: "easy", topic: "Technology" },
  { question: "Which company created the Java programming language?", answer: "Sun Microsystems (now owned by Oracle)", difficulty: "medium", topic: "Technology" },
  { question: "What does DNS stand for?", answer: "Domain Name System", difficulty: "medium", topic: "Technology" },
  { question: "What is the name of the chip that Apple uses in its latest iPhones as of 2024?", answer: "Apple A17 Pro", difficulty: "medium", topic: "Technology" },
  { question: "What is the largest tech company by market cap as of 2024?", answer: "Microsoft / Apple (both have traded places)", difficulty: "hard", topic: "Technology" },
  { question: "What language is used to query databases?", answer: "SQL (Structured Query Language)", difficulty: "easy", topic: "Technology" },
  
  // ============ SPORTS ============
  { question: "How many players are on a basketball team on the court at one time?", answer: "5 players", difficulty: "easy", topic: "Sports" },
  { question: "What country has won the most FIFA World Cups?", answer: "Brazil (5 times)", difficulty: "medium", topic: "Sports" },
  { question: "In tennis, what is the term for winning a game without the opponent scoring?", answer: "Bagel / Love game", difficulty: "medium", topic: "Sports" },
  { question: "What is the distance of a marathon in kilometers?", answer: "42.195 kilometers", difficulty: "medium", topic: "Sports" },
  { question: "Who holds the record for most NBA championships as a player?", answer: "Bill Russell (11 championships)", difficulty: "hard", topic: "Sports" },
  { question: "What sport is played at Wimbledon?", answer: "Tennis", difficulty: "easy", topic: "Sports" },
  { question: "How many gold medals did Michael Phelps win in his Olympic career?", answer: "23 gold medals", difficulty: "hard", topic: "Sports" },
  { question: "In which country did the sport of cricket originate?", answer: "England", difficulty: "easy", topic: "Sports" },
  { question: "What is the highest score possible in a single turn in bowling?", answer: "30 (three strikes)", difficulty: "hard", topic: "Sports" },
  { question: "Who scored the famous 'Hand of God' goal?", answer: "Diego Maradona", difficulty: "medium", topic: "Sports" },
  { question: "How long is an Olympic swimming pool?", answer: "50 meters", difficulty: "easy", topic: "Sports" },
  { question: "What team did LeBron James play for when he won his first NBA championship?", answer: "Miami Heat (2012)", difficulty: "medium", topic: "Sports" },
  { question: "In Formula 1, what does DRS stand for?", answer: "Drag Reduction System", difficulty: "medium", topic: "Sports" },
  { question: "How many players are on a standard soccer team on the field?", answer: "11 players", difficulty: "easy", topic: "Sports" },
  { question: "What is the name of the trophy awarded to the Super Bowl winner?", answer: "Vince Lombardi Trophy", difficulty: "medium", topic: "Sports" },
  { question: "Who has won the most Grand Slam tennis titles in men's singles?", answer: "Novak Djokovic (24)", difficulty: "medium", topic: "Sports" },
  { question: "What country does Lionel Messi play for internationally?", answer: "Argentina", difficulty: "easy", topic: "Sports" },
  { question: "In which year did Muhammad Ali win his first world heavyweight title?", answer: "1964 (against Sonny Liston)", difficulty: "hard", topic: "Sports" },
  { question: "What is the maximum weight for a boxing heavyweight title match?", answer: "No maximum (unlimited)", difficulty: "hard", topic: "Sports" },
  { question: "How many sets are in a standard men's Grand Slam tennis match?", answer: "Best of 5 sets", difficulty: "medium", topic: "Sports" },
  { question: "What sport does Serena Williams play?", answer: "Tennis", difficulty: "easy", topic: "Sports" },
  { question: "Who is the all-time leading scorer in NBA history as of 2024?", answer: "LeBron James", difficulty: "medium", topic: "Sports" },
  { question: "What country invented the Olympic Games?", answer: "Ancient Greece", difficulty: "easy", topic: "Sports" },
  { question: "In cricket, how many runs is a perfect score in a single over called?", answer: "Six sixes (36 runs in one over)", difficulty: "hard", topic: "Sports" },
  { question: "What is the only country to have appeared in every FIFA World Cup?", answer: "Brazil", difficulty: "medium", topic: "Sports" },
  
  // ============ HISTORY ============
  { question: "Who was the first President of the United States?", answer: "George Washington", difficulty: "easy", topic: "History" },
  { question: "What ancient civilization built Machu Picchu?", answer: "The Inca civilization", difficulty: "medium", topic: "History" },
  { question: "In what year did the French Revolution begin?", answer: "1789", difficulty: "medium", topic: "History" },
  { question: "Who was the last Pharaoh of ancient Egypt?", answer: "Cleopatra VII", difficulty: "medium", topic: "History" },
  { question: "What empire was ruled by Julius Caesar?", answer: "The Roman Republic (later Roman Empire)", difficulty: "easy", topic: "History" },
  { question: "What year did the Soviet Union collapse?", answer: "1991", difficulty: "medium", topic: "History" },
  { question: "Who invented the printing press?", answer: "Johannes Gutenberg (around 1440)", difficulty: "medium", topic: "History" },
  { question: "What was the name of the first space shuttle to orbit Earth?", answer: "Columbia (1981)", difficulty: "hard", topic: "History" },
  { question: "Which country was Adolf Hitler born in?", answer: "Austria", difficulty: "medium", topic: "History" },
  { question: "What war was fought between the North and South in the United States?", answer: "The American Civil War (1861-1865)", difficulty: "easy", topic: "History" },
  { question: "Who was the first woman to win a Nobel Prize?", answer: "Marie Curie (1903)", difficulty: "medium", topic: "History" },
  { question: "What ancient wonder was located in the city of Babylon?", answer: "The Hanging Gardens of Babylon", difficulty: "medium", topic: "History" },
  { question: "In what year did man first land on the moon?", answer: "1969", difficulty: "easy", topic: "History" },
  { question: "Who was the longest-reigning British monarch?", answer: "Queen Elizabeth II (70 years)", difficulty: "medium", topic: "History" },
  { question: "What was the name of the ship Charles Darwin sailed on during his voyage?", answer: "HMS Beagle", difficulty: "hard", topic: "History" },
  { question: "What was the capital of the Byzantine Empire?", answer: "Constantinople (modern Istanbul)", difficulty: "medium", topic: "History" },
  { question: "What year did World War I begin?", answer: "1914", difficulty: "easy", topic: "History" },
  { question: "Who was the founder of the Mongol Empire?", answer: "Genghis Khan", difficulty: "medium", topic: "History" },
  { question: "What was the name of the first successful powered airplane?", answer: "Wright Flyer (Kitty Hawk, 1903)", difficulty: "medium", topic: "History" },
  
  // ============ GEOGRAPHY ============
  { question: "What is the largest desert in the world?", answer: "Antarctica (cold desert)", difficulty: "hard", topic: "Geography" },
  { question: "What is the capital of Australia?", answer: "Canberra", difficulty: "medium", topic: "Geography" },
  { question: "How many countries are in Africa?", answer: "54 countries", difficulty: "hard", topic: "Geography" },
  { question: "What is the deepest lake in the world?", answer: "Lake Baikal in Russia", difficulty: "medium", topic: "Geography" },
  { question: "What is the name of the strait between Europe and Africa?", answer: "Strait of Gibraltar", difficulty: "medium", topic: "Geography" },
  { question: "What is the tallest mountain in Africa?", answer: "Mount Kilimanjaro", difficulty: "medium", topic: "Geography" },
  { question: "What river flows through Egypt?", answer: "The Nile River", difficulty: "easy", topic: "Geography" },
  { question: "What is the smallest continent?", answer: "Australia", difficulty: "easy", topic: "Geography" },
  { question: "What is the capital of Brazil?", answer: "Brasília", difficulty: "medium", topic: "Geography" },
  { question: "What ocean is the largest in the world?", answer: "The Pacific Ocean", difficulty: "easy", topic: "Geography" },
  { question: "Which country has the most natural lakes?", answer: "Canada", difficulty: "hard", topic: "Geography" },
  { question: "What is the name of the mountain range that separates Europe and Asia?", answer: "The Ural Mountains", difficulty: "medium", topic: "Geography" },
  { question: "What is the largest country by land area?", answer: "Russia", difficulty: "easy", topic: "Geography" },
  { question: "How many time zones does Russia span?", answer: "11 time zones", difficulty: "hard", topic: "Geography" },
  { question: "What is the capital of Canada?", answer: "Ottawa", difficulty: "medium", topic: "Geography" },
  { question: "What is the name of the world's largest coral reef system?", answer: "The Great Barrier Reef", difficulty: "easy", topic: "Geography" },
  { question: "Which country has the longest coastline?", answer: "Canada", difficulty: "hard", topic: "Geography" },
  { question: "What is the name of the sea between Europe and Africa?", answer: "The Mediterranean Sea", difficulty: "easy", topic: "Geography" },
  { question: "What is the capital of Argentina?", answer: "Buenos Aires", difficulty: "easy", topic: "Geography" },
  { question: "What is the name of the volcanic island that formed Iceland?", answer: "Iceland sits on the Mid-Atlantic Ridge", difficulty: "hard", topic: "Geography" },
  
  // ============ POP CULTURE ============
  { question: "What is the name of the fictional holiday celebrated on December 23rd from Seinfeld?", answer: "Festivus", difficulty: "medium", topic: "Pop Culture" },
  { question: "What does the acronym 'GOAT' stand for in sports culture?", answer: "Greatest Of All Time", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the name of the town in Gilmore Girls?", answer: "Stars Hollow", difficulty: "medium", topic: "Pop Culture" },
  { question: "Which character says 'Winter is Coming' in Game of Thrones?", answer: "House Stark (Ned Stark)", difficulty: "easy", topic: "Pop Culture" },
  { question: "What year did Vine shut down?", answer: "2017", difficulty: "medium", topic: "Pop Culture" },
  { question: "What is the name of Kanye West's fashion brand?", answer: "Yeezy", difficulty: "easy", topic: "Pop Culture" },
  { question: "Who created the viral 'Ice Bucket Challenge'?", answer: "Pat Quinn and Pete Frates for ALS awareness", difficulty: "hard", topic: "Pop Culture" },
  { question: "What internet browser had the highest usage in the early 2010s?", answer: "Internet Explorer", difficulty: "medium", topic: "Pop Culture" },
  { question: "What does the 'W' in Twitter/X's rebrand logo resemble?", answer: "An X", difficulty: "easy", topic: "Pop Culture" },
  { question: "In what year did Pokémon GO launch?", answer: "2016", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the name of the main character in the anime Naruto?", answer: "Naruto Uzumaki", difficulty: "easy", topic: "Pop Culture" },
  { question: "What is the most subscribed YouTube channel of all time?", answer: "T-Series", difficulty: "medium", topic: "Pop Culture" },
  { question: "What year did Instagram introduce the Reels feature?", answer: "2020", difficulty: "medium", topic: "Pop Culture" },

  // ============ ARABIC / EGYPTIAN MILLENNIAL ============
  { question: "في فيلم «عسل أسود»، ماذا كان اسم المشروب الذي كان مصري يطلبه دائمًا بدل القهوة؟", answer: "يانسون", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "في فيلم «زكي شان»، ما الوظيفة الحقيقية التي كان يعمل بها زكي قبل أن يصبح بودي جارد؟", answer: "طبيب بيطري", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "في فيلم «مرجان أحمد مرجان»، ما المادة الدراسية التي حاول مرجان النجاح فيها داخل الجامعة؟", answer: "التاريخ", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في فيلم «صعيدي في الجامعة الأمريكية»، ما اسم الشخصية التي جسدها محمد هنيدي؟", answer: "خلف الدهشوري خلف", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في فيلم «حمام في أمستردام»، ما الدولة التي سافر إليها حمام؟", answer: "هولندا", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "في فيلم «طير إنت»، إلى أي حيوان تحوّل أحمد مكي في إحدى المحاولات لإبهار حبيبته؟", answer: "باندا", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في مسلسل «الكبير أوي»، ما اسم المزاريطة المنافسة لبلد الكبير؟", answer: "المندورة", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في مسلسل «الصفارة»، ما الشيء الذي كان يسمح لشفيق بالسفر عبر الزمن؟", answer: "صفارة فرعونية", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "في فيلم «الناظر»، ما اسم المدرسة التي دارت فيها الأحداث؟", answer: "عاشور", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في فيلم «إكس لارج»، ما الشيء الذي كان مجدي يعاني منه طوال الفيلم؟", answer: "السمنة الزائدة وانعدام الثقة بالنفس", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "في فيلم «فول الصين العظيم»، ما اسم الشخصية التي لعبها محمد هنيدي؟", answer: "محيي", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في فيلم «اللمبي»، ما اسم المدرسة التي كان يدرس بها اللمبي؟", answer: "صلاح سالم", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في فيلم «جعلتني مجرماً»، لماذا دخل رشدي السجن في بداية الفيلم؟", answer: "لأنه أخذ القضية بدل ابن رجل أعمال", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في فيلم «آسف على الإزعاج»، ما المهنة التي كان يعمل بها حسن؟", answer: "مهندس", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في فيلم «وقفة رجالة»، إلى أي مدينة ساحلية سافر الأصدقاء؟", answer: "رأس البر", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في مسلسل «نيلي وشريهان»، ما العلاقة بين نيلي وشريهان؟", answer: "ابنتا عم", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في فيلم «برا المنهج»، ما المادة التي كان هاشم ضعيفًا فيها؟", answer: "اللغة العربية", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في فيلم «غبي منه فيه»، كم شخصية جسدها هاني رمزي؟", answer: "شخصيتان توأم", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "في فيلم «السفارة في العمارة»، ما جنسية السفارة التي انتقلت إلى نفس عمارة شريف خيري؟", answer: "إسرائيل", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "في فيلم «كده رضا»، كم أخًا توأمًا كان يتبادل شخصية رضا؟", answer: "ثلاثة", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "من هو البطل الذي جسّد شخصية «زكي سامي الأسيوطي» في فيلم «زكي شان»؟", answer: "أحمد حلمي", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "من هو بطل فيلم «السفارة في العمارة»؟", answer: "عادل إمام", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "من هو بطل فيلم «فول الصين العظيم»؟", answer: "محمد هنيدي", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "من هو الممثل الرئيسي في فيلم «صعيدي في الجامعة الأمريكية»؟", answer: "محمد هنيدي", difficulty: "easy", topic: "Egyptian Culture" },
  { question: "ما اسم الشخصية التي لعبها أحمد حلمي في فيلم «إكس لارج»؟", answer: "مجدي", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "من هو الممثل الذي شارك محمد هنيدي بطولة فيلم «حمام في أمستردام»؟", answer: "أحمد السقا", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "من هو بطل مسلسل «الصفارة»؟", answer: "أحمد أمين", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "من هو أحد الأبطال الرئيسيين في مسلسل «مكتوب عليا»؟", answer: "أكرم حسني", difficulty: "medium", topic: "Egyptian Culture" },
  { question: "ما اسم الشخصية الكفيفة التي يدور حولها فيلم «الكيت كات»؟", answer: "الشيخ حسني", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "ما اسم الشخصية التي جسدها عادل إمام في فيلم «سلام يا صاحبي»؟", answer: "مرزوق", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "في فيلم «حسن ومرقص»، ما اسم الشخصية التي جسدها عمر الشريف؟", answer: "محمود", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "من هو بطل فيلم «بيت الروبي»؟", answer: "كريم عبد العزيز", difficulty: "hard", topic: "Egyptian Culture" },
  { question: "من هو بطل مسلسل «البيت بيتي»؟", answer: "كريم محمود عبد العزيز", difficulty: "hard", topic: "Egyptian Culture" },
  
  // ============ FOOD & CULTURE ============
  { question: "What country does sushi originate from?", answer: "Japan", difficulty: "easy", topic: "Food" },
  { question: "What is the main ingredient in guacamole?", answer: "Avocado", difficulty: "easy", topic: "Food" },
  { question: "What is the name of the Italian rice dish cooked with broth?", answer: "Risotto", difficulty: "easy", topic: "Food" },
  { question: "What is the name of the Egyptian national dish?", answer: "Koshari", difficulty: "easy", topic: "Food" },
  { question: "What is the main ingredient in a traditional French baguette?", answer: "Wheat flour, water, salt, and yeast", difficulty: "easy", topic: "Food" },
  { question: "What type of pastry is a croissant?", answer: "Laminated/puff pastry", difficulty: "medium", topic: "Food" },
  { question: "What is the spicy Korean fermented cabbage dish called?", answer: "Kimchi", difficulty: "easy", topic: "Food" },
  { question: "What is the name of the Japanese bread-crumb coating used for frying?", answer: "Panko", difficulty: "medium", topic: "Food" },
  { question: "What is the national dish of Turkey?", answer: "Doner Kebab / Kuru Fasulye", difficulty: "medium", topic: "Food" },
  { question: "What ingredient makes bread rise?", answer: "Yeast", difficulty: "easy", topic: "Food" },
  { question: "What is the name of the famous Egyptian flatbread?", answer: "Aish Baladi (Egyptian pita)", difficulty: "medium", topic: "Food" },
  { question: "What country does the dish 'Pad Thai' come from?", answer: "Thailand", difficulty: "easy", topic: "Food" },
  { question: "What is the main spice in a traditional Moroccan tagine?", answer: "Ras el hanout / cumin, cinnamon, and turmeric blend", difficulty: "hard", topic: "Food" },
  { question: "What is the name of the Italian dessert made with espresso and mascarpone?", answer: "Tiramisu", difficulty: "easy", topic: "Food" },
];


export default function App() {
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  // New state for customization
  const [showSettings, setShowSettings] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [blueTeamName, setBlueTeamName] = useState("Blue Team");
  const [redTeamName, setRedTeamName] = useState("Red Team");
  const [blueColor, setBlueColor] = useState("blue");
  const [redColor, setRedColor] = useState("red");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Get unique topics
  const topics = useMemo(() => {
    const uniqueTopics = Array.from(new Set(triviaQuestions.map(q => q.topic))).sort();
    return ["all", ...uniqueTopics];
  }, []);

  // Filter questions based on difficulty and topic
  const filteredQuestions = useMemo(() => {
    return triviaQuestions.filter(q => {
      const difficultyMatch = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
      const topicMatch = selectedTopic === "all" || q.topic === selectedTopic;
      return difficultyMatch && topicMatch;
    });
  }, [selectedDifficulty, selectedTopic]);

  // Reset question index when filters change - randomize instead
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      setCurrentQuestionIndex(randomIndex);
    }
    setIsAnswerRevealed(false);
  }, [selectedDifficulty, selectedTopic, filteredQuestions.length]);

  const handleNextQuestion = () => {
    if (filteredQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      setCurrentQuestionIndex(randomIndex);
      setIsAnswerRevealed(false);
      // Reset timer when new question appears
      setTimeLeft(timerSeconds);
      setIsTimerRunning(true);
    }
  };

  const handleReset = () => {
    setBlueScore(0);
    setRedScore(0);
    setCurrentQuestionIndex(0);
    setTimeLeft(timerSeconds);
    setIsTimerRunning(false);
  };

  const handleTimerReset = () => {
    setTimeLeft(timerSeconds);
    setIsTimerRunning(false);
  };

  const handleResetToDefaults = () => {
    setBlueTeamName("Blue Team");
    setRedTeamName("Red Team");
    setBlueColor("blue");
    setRedColor("red");
    setTimerSeconds(30);
    setTimeLeft(30);
    setIsTimerRunning(false);
  };  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const colorOptions = [
    { name: "blue", label: "Blue", bg: "bg-blue-500", dark: "dark:bg-blue-600", ring: "from-blue-400 to-blue-600" },
    { name: "red", label: "Red", bg: "bg-red-500", dark: "dark:bg-red-600", ring: "from-red-400 to-red-600" },
    { name: "purple", label: "Purple", bg: "bg-purple-500", dark: "dark:bg-purple-600", ring: "from-purple-400 to-purple-600" },
    { name: "green", label: "Green", bg: "bg-green-500", dark: "dark:bg-green-600", ring: "from-green-400 to-green-600" },
    { name: "yellow", label: "Yellow", bg: "bg-yellow-500", dark: "dark:bg-yellow-600", ring: "from-yellow-400 to-yellow-600" },
    { name: "pink", label: "Pink", bg: "bg-pink-500", dark: "dark:bg-pink-600", ring: "from-pink-400 to-pink-600" },
    { name: "orange", label: "Orange", bg: "bg-orange-500", dark: "dark:bg-orange-600", ring: "from-orange-400 to-orange-600" },
    { name: "cyan", label: "Cyan", bg: "bg-cyan-500", dark: "dark:bg-cyan-600", ring: "from-cyan-400 to-cyan-600" },
  ];

  const getColorGradient = (colorName: string) => {
    const color = colorOptions.find(c => c.name === colorName);
    return color ? color.ring : "from-blue-400 to-blue-600";
  };

  return (
    <div className="size-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30 p-8 overflow-auto transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header with Dark Mode Toggle and Settings */}
        <div className="relative text-center mb-12">
          <div className="absolute top-0 right-0 flex gap-3 z-50">
            <Button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-full w-12 h-12 p-0 bg-purple-600 dark:bg-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
              title="Open Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setDarkMode(!darkMode)}
              variant="outline"
              className="rounded-full w-12 h-12 p-0 bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </Button>
          </div>

          <div className="mb-6">
            <h1 className="mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-bold text-6xl md:text-7xl lg:text-8xl tracking-tight font-[Bayon]">Trivia Battle</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Test your knowledge and compete!</p>
          </div>

          <Button
            onClick={handleReset}
            variant="outline"
            className="rounded-full px-8 py-6 gap-3 bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8 bg-white/95 dark:bg-gray-900/95 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
              <Button
                onClick={handleResetToDefaults}
                variant="outline"
                className="rounded-full px-4 py-2 text-sm"
              >
                Reset to Defaults
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timer Settings */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Timer Duration (seconds)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={timerSeconds}
                    onChange={(e) => {
                      const newValue = Math.max(5, parseInt(e.target.value) || 30);
                      setTimerSeconds(newValue);
                      setTimeLeft(newValue);
                    }}
                    className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <span className="text-gray-600 dark:text-gray-400">seconds</span>
                </div>
              </div>

              {/* Blue Team Settings */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Blue Team Name</label>
                <input
                  type="text"
                  value={blueTeamName}
                  onChange={(e) => setBlueTeamName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
                />
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Blue Team Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={`blue-${color.name}`}
                      onClick={() => setBlueColor(color.name)}
                      className={`w-10 h-10 rounded-full ${color.bg} ${color.dark} transition-all duration-200 ${
                        blueColor === color.name ? `ring-4 ring-offset-2 dark:ring-offset-1 ring-offset-white dark:ring-offset-gray-900 bg-gradient-to-br ${color.ring}` : "hover:scale-110"
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Red Team Settings */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Red Team Name</label>
                <input
                  type="text"
                  value={redTeamName}
                  onChange={(e) => setRedTeamName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
                />
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Red Team Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={`red-${color.name}`}
                      onClick={() => setRedColor(color.name)}
                      className={`w-10 h-10 rounded-full ${color.bg} ${color.dark} transition-all duration-200 ${
                        redColor === color.name ? `ring-4 ring-offset-2 dark:ring-offset-1 ring-offset-white dark:ring-offset-gray-900 bg-gradient-to-br ${color.ring}` : "hover:scale-110"
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowSettings(false)}
              className="mt-6 rounded-full px-8 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[1.02] transition-all"
            >
              Close Settings
            </Button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Difficulty:</span>
            <div className="flex gap-2">
              {(["all", "easy", "medium", "hard"] as const).map((difficulty) => (
                <Button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 capitalize transition-all duration-150 ${
                    selectedDifficulty === difficulty
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                      : "bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50 hover:scale-[1.02] hover:shadow-md"
                  }`}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Topic:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 capitalize transition-all duration-150 ${
                    selectedTopic === topic
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105"
                      : "bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50 hover:scale-[1.02] hover:shadow-md"
                  }`}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Teams with Timer in Middle */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Blue Team */}
          <TeamCard
            teamName={blueTeamName}
            score={blueScore}
            color={blueColor}
            onAddPoint={() => setBlueScore((prev) => prev + 1)}
            onSubtractPoint={() => setBlueScore((prev) => Math.max(0, prev - 1))}
            darkMode={darkMode}
          />

          {/* Center Column - Question and Timer */}
          <div className="flex flex-col gap-6 lg:h-auto">
            {/* Question Card */}
            <QuestionCard
              currentQuestion={currentQuestion?.question || "No questions available for selected filters"}
              currentAnswer={currentQuestion?.answer}
              difficulty={currentQuestion?.difficulty}
              topic={currentQuestion?.topic}
              onNewQuestion={handleNextQuestion}
              darkMode={darkMode}
              hasQuestions={filteredQuestions.length > 0}
              isAnswerRevealed={isAnswerRevealed}
              onToggleAnswer={() => setIsAnswerRevealed(!isAnswerRevealed)}
            />

            {/* Timer Display */}
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-2xl px-6 py-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Time Remaining</p>
                <p className={`text-6xl font-bold font-mono transition-colors duration-200 ${
                  timeLeft <= 5 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {timeLeft}s
                </p>
                <div className="flex gap-2 mt-4 justify-center flex-wrap">
                  <Button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`rounded-full px-6 py-2 text-white transition-all ${
                      isTimerRunning 
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-lg' 
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg'
                    }`}
                  >
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    onClick={handleTimerReset}
                    variant="outline"
                    className="rounded-full px-6 py-2"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Red Team */}
          <TeamCard
            teamName={redTeamName}
            score={redScore}
            color={redColor}
            onAddPoint={() => setRedScore((prev) => prev + 1)}
            onSubtractPoint={() => setRedScore((prev) => Math.max(0, prev - 1))}
            darkMode={darkMode}
          />
        </div>

        {/* Score Status */}
        <div className="text-center">
          <div className="inline-block bg-white/90 dark:bg-gray-900/90 rounded-3xl px-10 py-6 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-xl">
              {blueScore === redScore ? (
                <span className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent font-semibold">
                  🤝 It's a tie!
                </span>
              ) : blueScore > redScore ? (
                <span className={`bg-gradient-to-r ${getColorGradient(blueColor)} bg-clip-text text-transparent font-semibold`}>
                  🔵 {blueTeamName} leads by {blueScore - redScore} {blueScore - redScore === 1 ? 'point' : 'points'}
                </span>
              ) : (
                <span className={`bg-gradient-to-r ${getColorGradient(redColor)} bg-clip-text text-transparent font-semibold`}>
                  🔴 {redTeamName} leads by {redScore - blueScore} {redScore - blueScore === 1 ? 'point' : 'points'}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}