<h1 align="center">Quiz Storm</h1>
<h3 align="center">NativeScript Mobile Application</h3>

### Summary
Quiz Storm is a simple turn based game which test your skills and knowedge about everything in IT world. The game starts with two players. Each one has the chance to answer number of question - the trick? If your answer is wrong, you are one step closer to losing, because it's next player turn and if he is smart enough he can beat you.

#### Animations
- page transitions
- circle countdown timer

#### Device APIs
- Media - using different sounds for more user experiance
- Connection - used for part of the logic of displaying data (Choosing between Telerik BackEnd Services and SQLite)
- Accelerometer - used to displaying question hint
 
#### Application Storage - SQLite
- Saving local score for each game
- Saving the worldwide scores and displaying them where there isn't internet connection. Updating the data each time when the network is provided

#### Remote data
- Telerik BackEnd Services - used to store all questions and all worldwide scores
