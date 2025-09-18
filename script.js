/*
 * Mishrin 1.00 sports ranking logic
 *
 * This script contains data for players across different sports and computes
 * an unbiased MVP score solely from performance statistics. Players are
 * displayed by category and can be searched by name or score. Rankings
 * automatically update when selecting a category or entering a search query.
 */

// Data for each sport. Each player has relevant metrics used to compute
// their MVP score. The formulas are specific to each sport to reflect
// typical performance factors. All data is fictional or illustrative.
const sportsData = {
    // Seventy cricket players with runs, centuries and wickets (plus catches and strikeRate for wicketkeepers).
    cricket: [
        // Batsmen
        { name: "Sachin Tendulkar", runs: 34357, centuries: 100, wickets: 154 },
        { name: "Virat Kohli", runs: 25500, centuries: 80, wickets: 8 },
        { name: "Ricky Ponting", runs: 27483, centuries: 71, wickets: 3 },
        { name: "Brian Lara", runs: 22358, centuries: 53, wickets: 4 },
        { name: "Rahul Dravid", runs: 24064, centuries: 48, wickets: 1 },
        { name: "Sunil Gavaskar", runs: 13214, centuries: 35, wickets: 0 },
        { name: "Kumar Sangakkara", runs: 28016, centuries: 63, wickets: 0 },
        { name: "AB de Villiers", runs: 20014, centuries: 47, wickets: 2 },
        { name: "Steve Smith", runs: 16000, centuries: 45, wickets: 17 },
        { name: "Joe Root", runs: 18000, centuries: 50, wickets: 30 },
        { name: "Don Bradman", runs: 6996, centuries: 29, wickets: 0 },
        { name: "Vivian Richards", runs: 15261, centuries: 35, wickets: 117 },
        { name: "Alastair Cook", runs: 12472, centuries: 33, wickets: 0 },
        { name: "Hashim Amla", runs: 18672, centuries: 55, wickets: 0 },
        { name: "Inzamam-ul-Haq", runs: 20541, centuries: 35, wickets: 3 },
        { name: "Mahela Jayawardene", runs: 25957, centuries: 54, wickets: 4 },
        { name: "Younis Khan", runs: 17713, centuries: 41, wickets: 9 },
        { name: "Ross Taylor", runs: 18000, centuries: 45, wickets: 7 },
        { name: "David Warner", runs: 15000, centuries: 43, wickets: 0 },
        { name: "Chris Gayle", runs: 19000, centuries: 42, wickets: 167 },
        { name: "Rohit Sharma", runs: 13000, centuries: 40, wickets: 0 },
        { name: "Shikhar Dhawan", runs: 10500, centuries: 17, wickets: 0 },
        { name: "Kane Williamson", runs: 16000, centuries: 38, wickets: 28 },
        { name: "Babar Azam", runs: 12000, centuries: 25, wickets: 5 },
        { name: "Misbah-ul-Haq", runs: 11000, centuries: 10, wickets: 0 },
        { name: "David Gower", runs: 8222, centuries: 18, wickets: 0 },
        { name: "Allan Border", runs: 11174, centuries: 27, wickets: 39 },
        { name: "Javed Miandad", runs: 16213, centuries: 31, wickets: 17 },
        { name: "Mohammad Yousuf", runs: 17196, centuries: 39, wickets: 0 },
        // All-rounders
        { name: "Jacques Kallis", runs: 25534, centuries: 62, wickets: 577 },
        { name: "Kapil Dev", runs: 9031, centuries: 9, wickets: 687 },
        { name: "Ian Botham", runs: 7313, centuries: 14, wickets: 528 },
        { name: "Imran Khan", runs: 7516, centuries: 6, wickets: 544 },
        { name: "Richard Hadlee", runs: 5075, centuries: 1, wickets: 589 },
        { name: "Shakib Al Hasan", runs: 12000, centuries: 14, wickets: 650 },
        { name: "Garfield Sobers", runs: 8032, centuries: 26, wickets: 235 },
        { name: "Ben Stokes", runs: 8000, centuries: 10, wickets: 300 },
        { name: "Ravindra Jadeja", runs: 7000, centuries: 3, wickets: 450 },
        { name: "Chris Cairns", runs: 8000, centuries: 5, wickets: 419 },
        // Bowlers
        { name: "Muttiah Muralitharan", runs: 1250, centuries: 0, wickets: 1347 },
        { name: "Shane Warne", runs: 3000, centuries: 0, wickets: 1001 },
        { name: "Glenn McGrath", runs: 761, centuries: 0, wickets: 949 },
        { name: "Anil Kumble", runs: 2896, centuries: 1, wickets: 956 },
        { name: "James Anderson", runs: 1800, centuries: 0, wickets: 978 },
        { name: "Courtney Walsh", runs: 1257, centuries: 0, wickets: 746 },
        { name: "Curtly Ambrose", runs: 1133, centuries: 0, wickets: 630 },
        { name: "Dennis Lillee", runs: 905, centuries: 0, wickets: 635 },
        { name: "Michael Holding", runs: 910, centuries: 0, wickets: 391 },
        { name: "Wasim Akram", runs: 2898, centuries: 3, wickets: 916 },
        { name: "Waqar Younis", runs: 836, centuries: 0, wickets: 789 },
        { name: "Allan Donald", runs: 652, centuries: 0, wickets: 602 },
        { name: "Dale Steyn", runs: 1250, centuries: 0, wickets: 699 },
        { name: "Chaminda Vaas", runs: 1298, centuries: 0, wickets: 761 },
        { name: "Saqlain Mushtaq", runs: 1000, centuries: 0, wickets: 496 },
        { name: "Rashid Khan", runs: 1000, centuries: 0, wickets: 400 },
        { name: "Jasprit Bumrah", runs: 500, centuries: 0, wickets: 350 },
        { name: "Harbhajan Singh", runs: 1237, centuries: 0, wickets: 711 },
        { name: "Lasith Malinga", runs: 567, centuries: 0, wickets: 546 },
        { name: "Kagiso Rabada", runs: 600, centuries: 0, wickets: 350 },
        // Wicketkeepers
        { name: "Adam Gilchrist", runs: 15000, centuries: 33, wickets: 0, catches: 900, strikeRate: 96.0 },
        { name: "MS Dhoni", runs: 17000, centuries: 16, wickets: 1, catches: 820, strikeRate: 88.0 },
        { name: "Mark Boucher", runs: 9998, centuries: 5, wickets: 0, catches: 952, strikeRate: 76.0 },
        { name: "Quinton de Kock", runs: 12000, centuries: 17, wickets: 0, catches: 540, strikeRate: 94.0 },
        { name: "Brendon McCullum", runs: 14000, centuries: 19, wickets: 0, catches: 472, strikeRate: 96.0 },
        { name: "Alec Stewart", runs: 15476, centuries: 13, wickets: 0, catches: 451, strikeRate: 71.0 },
        { name: "Rishabh Pant", runs: 4000, centuries: 5, wickets: 0, catches: 100, strikeRate: 90.0 },
        { name: "Dinesh Karthik", runs: 6000, centuries: 7, wickets: 0, catches: 150, strikeRate: 83.0 },
        { name: "Jos Buttler", runs: 8000, centuries: 10, wickets: 0, catches: 250, strikeRate: 120.0 },
        { name: "Kumar Sangakkara (WK)", runs: 28016, centuries: 63, wickets: 0, catches: 678, strikeRate: 78.0 },
    ],

    // Seventy MLB players with home runs, batting average and RBIs.
    mlb: [
        { name: "Babe Ruth", homeRuns: 714, battingAverage: 0.342, RBIs: 2214 },
        { name: "Hank Aaron", homeRuns: 755, battingAverage: 0.305, RBIs: 2297 },
        { name: "Barry Bonds", homeRuns: 762, battingAverage: 0.298, RBIs: 1996 },
        { name: "Willie Mays", homeRuns: 660, battingAverage: 0.302, RBIs: 1903 },
        { name: "Lou Gehrig", homeRuns: 493, battingAverage: 0.340, RBIs: 1995 },
        { name: "Mickey Mantle", homeRuns: 536, battingAverage: 0.298, RBIs: 1509 },
        { name: "Stan Musial", homeRuns: 475, battingAverage: 0.331, RBIs: 1951 },
        { name: "Ted Williams", homeRuns: 521, battingAverage: 0.344, RBIs: 1839 },
        { name: "Derek Jeter", homeRuns: 260, battingAverage: 0.310, RBIs: 1311 },
        { name: "Mike Trout", homeRuns: 350, battingAverage: 0.302, RBIs: 893 },
        { name: "Albert Pujols", homeRuns: 703, battingAverage: 0.296, RBIs: 2218 },
        { name: "Ichiro Suzuki", homeRuns: 117, battingAverage: 0.311, RBIs: 780 },
        { name: "Pete Rose", homeRuns: 160, battingAverage: 0.303, RBIs: 1314 },
        { name: "Ken Griffey Jr.", homeRuns: 630, battingAverage: 0.284, RBIs: 1836 },
        { name: "Joe DiMaggio", homeRuns: 361, battingAverage: 0.325, RBIs: 1537 },
        { name: "Honus Wagner", homeRuns: 101, battingAverage: 0.328, RBIs: 1732 },
        { name: "Cal Ripken Jr.", homeRuns: 431, battingAverage: 0.276, RBIs: 1695 },
        { name: "Alex Rodriguez", homeRuns: 696, battingAverage: 0.295, RBIs: 2086 },
        { name: "Frank Robinson", homeRuns: 586, battingAverage: 0.294, RBIs: 1812 },
        { name: "Reggie Jackson", homeRuns: 563, battingAverage: 0.262, RBIs: 1702 },
        { name: "Manny Ramirez", homeRuns: 555, battingAverage: 0.312, RBIs: 1831 },
        { name: "Eddie Murray", homeRuns: 504, battingAverage: 0.287, RBIs: 1917 },
        { name: "Ernie Banks", homeRuns: 512, battingAverage: 0.274, RBIs: 1636 },
        { name: "Jimmie Foxx", homeRuns: 534, battingAverage: 0.325, RBIs: 1922 },
        { name: "Harmon Killebrew", homeRuns: 573, battingAverage: 0.256, RBIs: 1584 },
        { name: "David Ortiz", homeRuns: 541, battingAverage: 0.286, RBIs: 1768 },
        { name: "Vladimir Guerrero", homeRuns: 449, battingAverage: 0.318, RBIs: 1496 },
        { name: "Gary Sheffield", homeRuns: 509, battingAverage: 0.292, RBIs: 1676 },
        { name: "Sammy Sosa", homeRuns: 609, battingAverage: 0.273, RBIs: 1667 },
        { name: "Mark McGwire", homeRuns: 583, battingAverage: 0.263, RBIs: 1414 },
        { name: "Frank Thomas", homeRuns: 521, battingAverage: 0.301, RBIs: 1704 },
        { name: "Al Kaline", homeRuns: 399, battingAverage: 0.297, RBIs: 1583 },
        { name: "Miguel Cabrera", homeRuns: 508, battingAverage: 0.308, RBIs: 1850 },
        { name: "Carl Yastrzemski", homeRuns: 452, battingAverage: 0.285, RBIs: 1844 },
        { name: "Robinson Cano", homeRuns: 335, battingAverage: 0.301, RBIs: 1305 },
        { name: "Joe Morgan", homeRuns: 268, battingAverage: 0.271, RBIs: 1133 },
        { name: "Paul Molitor", homeRuns: 234, battingAverage: 0.306, RBIs: 1307 },
        { name: "Kirby Puckett", homeRuns: 207, battingAverage: 0.318, RBIs: 1085 },
        { name: "Rogers Hornsby", homeRuns: 301, battingAverage: 0.358, RBIs: 1584 },
        { name: "Tony Gwynn", homeRuns: 135, battingAverage: 0.338, RBIs: 1138 },
        { name: "George Brett", homeRuns: 317, battingAverage: 0.305, RBIs: 1596 },
        { name: "Chipper Jones", homeRuns: 468, battingAverage: 0.303, RBIs: 1623 },
        { name: "Jim Thome", homeRuns: 612, battingAverage: 0.276, RBIs: 1699 },
        { name: "Jeff Bagwell", homeRuns: 449, battingAverage: 0.297, RBIs: 1529 },
        { name: "Willie McCovey", homeRuns: 521, battingAverage: 0.270, RBIs: 1555 },
        { name: "Rafael Palmeiro", homeRuns: 569, battingAverage: 0.288, RBIs: 1835 },
        { name: "Mike Schmidt", homeRuns: 548, battingAverage: 0.267, RBIs: 1595 },
        { name: "Eddie Mathews", homeRuns: 512, battingAverage: 0.271, RBIs: 1453 },
        { name: "Brooks Robinson", homeRuns: 268, battingAverage: 0.267, RBIs: 1357 },
        { name: "Johnny Bench", homeRuns: 389, battingAverage: 0.267, RBIs: 1376 },
        { name: "Yogi Berra", homeRuns: 358, battingAverage: 0.285, RBIs: 1430 },
        { name: "Carlton Fisk", homeRuns: 376, battingAverage: 0.269, RBIs: 1330 },
        { name: "Tony Perez", homeRuns: 379, battingAverage: 0.279, RBIs: 1652 },
        { name: "Willie Stargell", homeRuns: 475, battingAverage: 0.282, RBIs: 1540 },
        { name: "Orlando Cepeda", homeRuns: 379, battingAverage: 0.297, RBIs: 1365 },
        { name: "Dave Winfield", homeRuns: 465, battingAverage: 0.283, RBIs: 1833 },
        { name: "Fred McGriff", homeRuns: 493, battingAverage: 0.284, RBIs: 1550 },
        { name: "Todd Helton", homeRuns: 369, battingAverage: 0.316, RBIs: 1406 },
        { name: "Albert Belle", homeRuns: 381, battingAverage: 0.295, RBIs: 1239 },
        { name: "Andre Dawson", homeRuns: 438, battingAverage: 0.279, RBIs: 1591 },
        { name: "Jackie Robinson", homeRuns: 141, battingAverage: 0.311, RBIs: 734 },
        { name: "Lou Brock", homeRuns: 149, battingAverage: 0.293, RBIs: 900 },
        { name: "Bryce Harper", homeRuns: 300, battingAverage: 0.281, RBIs: 900 },
        { name: "Giancarlo Stanton", homeRuns: 400, battingAverage: 0.264, RBIs: 1000 },
        { name: "Aaron Judge", homeRuns: 250, battingAverage: 0.284, RBIs: 560 },
        { name: "Shohei Ohtani", homeRuns: 175, battingAverage: 0.274, RBIs: 400 },
        { name: "Mookie Betts", homeRuns: 250, battingAverage: 0.293, RBIs: 700 },
        { name: "Mike Piazza", homeRuns: 427, battingAverage: 0.308, RBIs: 1335 },
    ],

    // Seventy football players with goals, assists and appearances.
    football: [
        { name: "Cristiano Ronaldo", goals: 850, assists: 230, appearances: 1200 },
        { name: "Lionel Messi", goals: 800, assists: 350, appearances: 1000 },
        { name: "Pele", goals: 767, assists: 300, appearances: 831 },
        { name: "Diego Maradona", goals: 350, assists: 200, appearances: 680 },
        { name: "Johan Cruyff", goals: 400, assists: 250, appearances: 700 },
        { name: "Zinedine Zidane", goals: 125, assists: 150, appearances: 700 },
        { name: "Ronaldinho", goals: 300, assists: 200, appearances: 700 },
        { name: "Kylian Mbappe", goals: 300, assists: 150, appearances: 400 },
        { name: "Neymar", goals: 400, assists: 280, appearances: 600 },
        { name: "Robert Lewandowski", goals: 600, assists: 150, appearances: 800 },
        { name: "Thierry Henry", goals: 411, assists: 200, appearances: 900 },
        { name: "Zlatan Ibrahimovic", goals: 570, assists: 200, appearances: 900 },
        { name: "George Best", goals: 200, assists: 100, appearances: 500 },
        { name: "Paolo Maldini", goals: 40, assists: 20, appearances: 1000 },
        { name: "Franz Beckenbauer", goals: 100, assists: 80, appearances: 700 },
        { name: "Xavi", goals: 85, assists: 200, appearances: 1000 },
        { name: "Andres Iniesta", goals: 90, assists: 210, appearances: 1000 },
        { name: "David Beckham", goals: 150, assists: 250, appearances: 850 },
        { name: "Wayne Rooney", goals: 366, assists: 150, appearances: 900 },
        { name: "Alan Shearer", goals: 409, assists: 100, appearances: 820 },
        { name: "Luis Suarez", goals: 500, assists: 250, appearances: 700 },
        { name: "Sergio Aguero", goals: 400, assists: 100, appearances: 660 },
        { name: "Karim Benzema", goals: 400, assists: 180, appearances: 900 },
        { name: "Mohamed Salah", goals: 300, assists: 150, appearances: 650 },
        { name: "Sadio Mane", goals: 250, assists: 100, appearances: 600 },
        { name: "Frank Lampard", goals: 300, assists: 150, appearances: 900 },
        { name: "Steven Gerrard", goals: 200, assists: 180, appearances: 800 },
        { name: "Andrea Pirlo", goals: 80, assists: 150, appearances: 700 },
        { name: "Luka Modric", goals: 100, assists: 180, appearances: 900 },
        { name: "Gerard Pique", goals: 50, assists: 40, appearances: 600 },
        { name: "Sergio Ramos", goals: 120, assists: 40, appearances: 800 },
        { name: "Harry Kane", goals: 300, assists: 50, appearances: 550 },
        { name: "Eden Hazard", goals: 160, assists: 180, appearances: 700 },
        { name: "Antoine Griezmann", goals: 250, assists: 150, appearances: 700 },
        { name: "Diego Forlan", goals: 250, assists: 90, appearances: 600 },
        { name: "Fernando Torres", goals: 250, assists: 80, appearances: 700 },
        { name: "Miroslav Klose", goals: 300, assists: 50, appearances: 700 },
        { name: "Thomas Muller", goals: 250, assists: 200, appearances: 700 },
        { name: "Romario", goals: 750, assists: 200, appearances: 800 },
        { name: "Gerd Muller", goals: 735, assists: 80, appearances: 620 },
        { name: "Eusebio", goals: 473, assists: 70, appearances: 440 },
        { name: "Roberto Carlos", goals: 70, assists: 110, appearances: 900 },
        { name: "Cafu", goals: 50, assists: 100, appearances: 950 },
        { name: "Bastian Schweinsteiger", goals: 70, assists: 110, appearances: 700 },
        { name: "Arjen Robben", goals: 200, assists: 100, appearances: 600 },
        { name: "Franck Ribery", goals: 150, assists: 180, appearances: 650 },
        { name: "Didier Drogba", goals: 360, assists: 80, appearances: 700 },
        { name: "Samuel Eto'o", goals: 350, assists: 90, appearances: 700 },
        { name: "Patrick Vieira", goals: 60, assists: 80, appearances: 650 },
        { name: "Ruud Gullit", goals: 220, assists: 130, appearances: 600 },
        { name: "Marco van Basten", goals: 300, assists: 60, appearances: 500 },
        { name: "Roberto Baggio", goals: 277, assists: 100, appearances: 700 },
        { name: "Ryan Giggs", goals: 200, assists: 300, appearances: 1000 },
        { name: "Virgil van Dijk", goals: 30, assists: 10, appearances: 300 },
        { name: "Cesc Fabregas", goals: 125, assists: 200, appearances: 750 },
        { name: "Dani Alves", goals: 50, assists: 100, appearances: 900 },
        { name: "Marcelo", goals: 38, assists: 100, appearances: 700 },
        { name: "Philipp Lahm", goals: 20, assists: 80, appearances: 700 },
        { name: "Ferenc Puskas", goals: 703, assists: 100, appearances: 680 },
        { name: "George Weah", goals: 200, assists: 50, appearances: 500 },
        { name: "Michael Laudrup", goals: 150, assists: 200, appearances: 700 },
        { name: "Hristo Stoichkov", goals: 250, assists: 100, appearances: 600 },
        { name: "Rivaldo", goals: 250, assists: 80, appearances: 700 },
        { name: "Ronald Koeman", goals: 250, assists: 50, appearances: 650 },
        { name: "Clarence Seedorf", goals: 125, assists: 130, appearances: 850 },
        { name: "Deco", goals: 90, assists: 150, appearances: 700 },
        { name: "Raul Gonzalez", goals: 400, assists: 80, appearances: 1000 },
        { name: "Carlos Alberto Torres", goals: 30, assists: 50, appearances: 700 },
        { name: "Andreas Brehme", goals: 50, assists: 70, appearances: 400 },
    ],

    // Seventy NBA players with points, assists and rebounds.
    nba: [
        { name: "Michael Jordan", points: 32292, assists: 5633, rebounds: 6672 },
        { name: "LeBron James", points: 38567, assists: 10667, rebounds: 10667 },
        { name: "Kareem Abdul-Jabbar", points: 38387, assists: 5660, rebounds: 17440 },
        { name: "Kobe Bryant", points: 33643, assists: 6306, rebounds: 7047 },
        { name: "Magic Johnson", points: 17707, assists: 10141, rebounds: 6559 },
        { name: "Larry Bird", points: 21791, assists: 5695, rebounds: 8974 },
        { name: "Bill Russell", points: 14522, assists: 4100, rebounds: 21620 },
        { name: "Wilt Chamberlain", points: 31419, assists: 4643, rebounds: 23924 },
        { name: "Tim Duncan", points: 26496, assists: 4225, rebounds: 15091 },
        { name: "Shaquille O'Neal", points: 28596, assists: 3026, rebounds: 13099 },
        { name: "Stephen Curry", points: 22000, assists: 6000, rebounds: 3500 },
        { name: "Kevin Durant", points: 27000, assists: 4300, rebounds: 6900 },
        { name: "Giannis Antetokounmpo", points: 16000, assists: 3500, rebounds: 7000 },
        { name: "Nikola Jokic", points: 12000, assists: 4000, rebounds: 6000 },
        { name: "Dirk Nowitzki", points: 31560, assists: 3651, rebounds: 11489 },
        { name: "Charles Barkley", points: 23757, assists: 4215, rebounds: 12546 },
        { name: "Karl Malone", points: 36928, assists: 5248, rebounds: 14968 },
        { name: "Hakeem Olajuwon", points: 26946, assists: 3058, rebounds: 13747 },
        { name: "Kevin Garnett", points: 26071, assists: 5445, rebounds: 14662 },
        { name: "Allen Iverson", points: 24368, assists: 5624, rebounds: 3394 },
        { name: "Dwyane Wade", points: 23165, assists: 5701, rebounds: 4933 },
        { name: "Chris Paul", points: 21000, assists: 11000, rebounds: 5000 },
        { name: "Russell Westbrook", points: 24000, assists: 9000, rebounds: 7000 },
        { name: "James Harden", points: 24000, assists: 6500, rebounds: 5000 },
        { name: "Kawhi Leonard", points: 12000, assists: 2000, rebounds: 4000 },
        { name: "Damian Lillard", points: 19000, assists: 5000, rebounds: 4000 },
        { name: "Anthony Davis", points: 14000, assists: 2000, rebounds: 6000 },
        { name: "Luka Doncic", points: 8000, assists: 2500, rebounds: 2500 },
        { name: "Joel Embiid", points: 9000, assists: 1000, rebounds: 4000 },
        { name: "Trae Young", points: 7000, assists: 2500, rebounds: 1000 },
        { name: "Karl-Anthony Towns", points: 11000, assists: 1500, rebounds: 5000 },
        { name: "Paul George", points: 15000, assists: 3000, rebounds: 5000 },
        { name: "Jimmy Butler", points: 15000, assists: 3000, rebounds: 5000 },
        { name: "Jayson Tatum", points: 9000, assists: 1500, rebounds: 3000 },
        { name: "Devin Booker", points: 11000, assists: 2000, rebounds: 2500 },
        { name: "Donovan Mitchell", points: 8000, assists: 1500, rebounds: 2000 },
        { name: "Kyrie Irving", points: 13000, assists: 3500, rebounds: 2500 },
        { name: "Oscar Robertson", points: 26710, assists: 9887, rebounds: 7804 },
        { name: "Jerry West", points: 25192, assists: 6238, rebounds: 5366 },
        { name: "Elgin Baylor", points: 23149, assists: 3650, rebounds: 11463 },
        { name: "Julius Erving", points: 30026, assists: 5562, rebounds: 10322 },
        { name: "Moses Malone", points: 27409, assists: 1793, rebounds: 16594 },
        { name: "George Mikan", points: 10156, assists: 1000, rebounds: 5000 },
        { name: "John Stockton", points: 19711, assists: 15806, rebounds: 4212 },
        { name: "Scottie Pippen", points: 18940, assists: 6135, rebounds: 7528 },
        { name: "Charles Oakley", points: 12231, assists: 3000, rebounds: 12205 },
        { name: "Reggie Miller", points: 25279, assists: 4141, rebounds: 4130 },
        { name: "Patrick Ewing", points: 24815, assists: 2400, rebounds: 11607 },
        { name: "Isiah Thomas", points: 18822, assists: 9061, rebounds: 3763 },
        { name: "Clyde Drexler", points: 22195, assists: 6135, rebounds: 6689 },
        { name: "Robert Parish", points: 23334, assists: 2523, rebounds: 14715 },
        { name: "Chris Bosh", points: 17189, assists: 1774, rebounds: 7502 },
        { name: "Vince Carter", points: 25728, assists: 4634, rebounds: 6271 },
        { name: "Tracy McGrady", points: 18381, assists: 4102, rebounds: 5011 },
        { name: "Jason Kidd", points: 17529, assists: 12091, rebounds: 8725 },
        { name: "Yao Ming", points: 9200, assists: 720, rebounds: 4494 },
        { name: "Manu Ginobili", points: 14000, assists: 4000, rebounds: 3600 },
        { name: "Tony Parker", points: 19000, assists: 7000, rebounds: 3000 },
        { name: "Ray Allen", points: 24505, assists: 4261, rebounds: 5400 },
        { name: "Paul Pierce", points: 26397, assists: 4458, rebounds: 7803 },
        { name: "Carmelo Anthony", points: 28289, assists: 3500, rebounds: 7610 },
        { name: "Kevin McHale", points: 17000, assists: 2300, rebounds: 7200 },
        { name: "Bob Pettit", points: 20880, assists: 2269, rebounds: 12849 },
        { name: "James Worthy", points: 16320, assists: 2767, rebounds: 4305 },
        { name: "Nate Thurmond", points: 14537, assists: 2477, rebounds: 14464 },
        { name: "Walt Frazier", points: 15481, assists: 6040, rebounds: 4794 },
        { name: "Dikembe Mutombo", points: 11729, assists: 1539, rebounds: 12691 },
        { name: "Dwight Howard", points: 19841, assists: 2149, rebounds: 14227 },
        { name: "David Robinson", points: 20607, assists: 2954, rebounds: 9494 },
        { name: "Bob Cousy", points: 16960, assists: 6955, rebounds: 4786 },
        { name: "Grant Hill", points: 17137, assists: 4330, rebounds: 4796 },
    ]

};

// Compute an MVP score for a player based on their sport. Each sport uses
// Duplicate definitions removed

// Compute an MVP score for a player based on their sport. Each sport uses
// a simple weighted formula that emphasises core performance metrics. The
// multipliers are chosen to produce scores of similar magnitudes within
// each category, ensuring comparability within (but not across) sports.
function computeMvpScore(player, sport) {
    switch (sport) {
        case 'cricket': {
            const { runs, centuries, wickets } = player;
            // Emphasise runs and centuries; wickets add value for all-rounders
            return (runs * 0.001) + (centuries * 1) + (wickets * 0.1);
        }
        case 'mlb': {
            const { homeRuns, battingAverage, RBIs } = player;
            // Combine power (home runs), consistency (batting average) and runs batted in
            return (homeRuns / 10) + (battingAverage * 100) + (RBIs / 100);
        }
        case 'football': {
            const { goals, assists, appearances } = player;
            // Goals are most important, assists add half weight, appearances reward longevity
            return (goals * 1) + (assists * 0.5) + (appearances * 0.1);
        }
        case 'nba': {
            const { points, assists, rebounds } = player;
            // Normalise high numbers by dividing; balanced weight on scoring and all-around play
            return (points / 1000) + (assists / 500) + (rebounds / 500);
        }
        default:
            return 0;
    }
}

// Extend each player object with a computed MVP score. Returns a new array
// to avoid mutating the original data. This function also sorts players
// descending by score.
function preparePlayers(sport) {
    const players = sportsData[sport] || [];
    return players.map(p => {
        return { ...p, mvp: computeMvpScore(p, sport) };
    }).sort((a, b) => b.mvp - a.mvp);
}

// Render the player list into the table. Accepts an array of players with
// name and mvp properties. Clears any existing rows before inserting new ones.
function renderPlayers(players) {
    const tbody = document.getElementById('playerTableBody');
    tbody.innerHTML = '';
    players.forEach(player => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = player.name;
        const scoreCell = document.createElement('td');
        scoreCell.textContent = player.mvp.toFixed(2);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        tbody.appendChild(row);
    });
}

// Filter players by search term. The search matches against the player's
// name (case-insensitive) and also their MVP score if the term is numeric.
function filterPlayers(players, query) {
    const term = query.trim().toLowerCase();
    if (!term) return players;
    const numericQuery = parseFloat(term);
    return players.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(term);
        const scoreMatch = !isNaN(numericQuery) && p.mvp >= numericQuery;
        return nameMatch || scoreMatch;
    });
}

// Handle category change. Updates the active button, prepares players for
// the selected sport and renders them. Also resets the search input.
function loadCategory(sport) {
    currentSport = sport;
    const buttons = document.querySelectorAll('.sport-button');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sport === sport);
    });
    allPlayers = preparePlayers(sport);
    document.getElementById('searchInput').value = '';
    renderPlayers(allPlayers);
}

// Set up event listeners for navigation and search
let currentSport = 'cricket';
let allPlayers = preparePlayers(currentSport);

document.addEventListener('DOMContentLoaded', () => {
    // Initialise with default sport
    renderPlayers(allPlayers);
    // Category buttons
    document.querySelectorAll('.sport-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const sport = btn.dataset.sport;
            loadCategory(sport);
        });
    });
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const filtered = filterPlayers(allPlayers, searchInput.value);
        renderPlayers(filtered);
    });
});