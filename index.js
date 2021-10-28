/***--------------------Firebase Configurations Section---------------------------------***/


var firebaseConfig = {
    apiKey: "AIzaSyDjcJAEFcOEDxHhDiI8_fzFBVrSZVDMSuA",
    authDomain: "sustainable-alchemists-2428d.firebaseapp.com",
    databaseURL: "https://sustainable-alchemists-2428d-default-rtdb.firebaseio.com",
    projectId: "sustainable-alchemists-2428d",
    storageBucket: "sustainable-alchemists-2428d.appspot.com",
    messagingSenderId: "540052802591",
    appId: "1:540052802591:web:bc2b80907babb41022192a",
    measurementId: "G-66MJVGGYH0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Reference messages collection
 const messagesRef = firebase.database().ref('messages');


/*---------------------------------Section Divider----------------------------------------------------------*/



/*** ------------Global Varibales and Objects Section Start ------------------***/
const preGameContainer = document.querySelector('.pre-game');
const startGameButton = document.querySelector('.start-game');
const totalCategoriesOptions = document.querySelector('.totalCategoriesOptions');
const image = document.querySelector('.image');
const category = document.querySelector('.category');
const numberOfCategoriesShowing = document.querySelector('.showing');
const processBoxes = document.querySelectorAll('.process-boxes');
const submitButton = document.querySelector('.submit');
const totalScore = document.querySelector('.score');
const errorSpan = document.querySelector('.errorSpan');
const resultErrorBox = document.querySelector('.resultErrorBox');
const resultOkButton = document.querySelector('.resultOkButton');
const nameOfUser = document.getElementById('name');
const loader = document.querySelector('.giphy-embed')
const ageOfUser = document.getElementById('age');
const mailOfUser = document.getElementById('email');
const countryOfUser = document.getElementById('country');
const userInputPart = document.querySelector('.user-input-part');
const pinLabel = document.querySelector('.pinLabel');
const pinInput = document.querySelector('#pin');
const countryNameLabel = document.querySelector('.countryNameLabel');
const countryName = document.querySelector('#countryName');
const gender = document.getElementById("gender");

let database = {};
let imagesDatabase = {};
let mapImageWasteObj = {};
//Number of wastes present in each categories
let dryWasteTotalData = 0;
let wetWasteTotalData =0;
let eWasteTotalData = 0;
let sanitaryWasteTotalData = 0;
let rejectWasteTotalData = 0;

let check = {};                   //The category object, using this with numbering to get reference

let allItemsFromDatabase = [];  //Array to hold all the items from the database object

let totalCategories = 20;    //Total Number Of Categories of waste to be shown in the UI

let eachCategories = totalCategories/5;   //Number of wastes in each type

let PropertiesFromCheck = [];  //Array to hold all the properties from check

let currentCategoryNumber = 1;   //The next category number that will be shown

let obj = {};   //The object used to store the data of the currently dragged category

let tracking = 1;   //It is used to track whether its a DOM load or the categories in the boxes are all been 
                        //dragged and hence new categories are added

let copyCat = [];     //This array helps to make the new categories globally available to all the functions

let allAnswers = {};  //The Object of all wrong drag drops by the user

let userDetailObject = {};  //To store the details of the users inputs

let percentageScore = 0;   //The percentage of the user

let counterHolder = {
    dryWaste: 0,
    wetWaste: 0,
    eWaste: 0,
    sanitaryWaste: 0,
    rejectWaste: 0
}

let addingWasteAfterClick = {
    dryWaste: [],
    wetWaste: [],
    eWaste: [],
    sanitaryWaste: [],
    rejectWaste: []
}


let couponDiscountObject = {
    "Captain_planet" : 10,
    "Eco-friendly-living": 25,
    "Sampurn(e)arth" : 40,
    "Sustainable_alchemists": 50
}
/*** ------------Global Varibales and Objects Section End ------------------***/


/*** -------Section for Event Listener Start---- ***/

window.addEventListener('DOMContentLoaded',handleDocumentLoad, {once: true})

 submitButton.addEventListener('click', handleSubmit); 

 resultOkButton.addEventListener('click', handleResultBoxOkButton);

 totalCategoriesOptions.addEventListener('change', handleSelectChange);

 document.addEventListener('mouseover', handleFirstUserClick,  {once: true});

 startGameButton.addEventListener('click', handleStartGameButtonClick);
 
/*** -------Section for Event Listener End---- ***/


/*** Function when the document first loads Start ***/
async function handleDocumentLoad(e){
    let data = await getData().then( data=>{
        let track = 0;
            data.data.map( item=>{
                if(track%2===0){
                    fillWasteCategoriesDatabaseObject(item, track);
                }else{
                    fillImagesDatabaseObject(item, track);
                }
                track+=1;
            })
            
           
            mapWastesWithImages();
            
        })
        dryWasteTotalData = database[`dryWaste`].length;
        wetWasteTotalData = database[`wetWaste`].length;
        sanitaryWasteTotalData = database[`sanitaryWaste`].length;
        rejectWasteTotalData = database[`rejectWaste`].length;
        eWasteTotalData = database[`eWaste`].length;
         await gettingAllDataFromDatabase();

        currentCategoryNumber =  categoriesAdd(currentCategoryNumber);
        addClickFeatureToProcessBoxes();
        console.log(check)

}
/*** Function when the document first loads End ***/


/*** Function to get data from the backend Start ***/
async function getData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxYlQlZlArdYL62ysW0uKs3_D60JjipSnUpvZUXsnZEinuxalnrCtaUarGPAwkhSXtc2w/exec', {
            method: 'GET',
            mode: 'cors', 
            credentials: 'same-origin', 

        });
        data = await response.json();
        return data;

    } catch (error) {
      
        console.log(error)
    }
}

/*** Function to get data from the backend End ***/


       

/*** Funtion to map the waste types with it's images Start ***/
function mapWastesWithImages(){
    
    for(props in database){
        let count = 0;

        database[props].map(item=>{
              
          mapImageWasteObj[item]=imagesDatabase[props][count];
            
            count+=1;
        })
    }
}
/*** Funtion to map the waste types with it's images End ***/

/*** Funtion to fill images database object Start ***/
function fillImagesDatabaseObject(item, track){
    if(track/2===0.5){
        
        imagesDatabase[`dryWaste`] = item;
    }
    else if(track/2===1.5){
        imagesDatabase[`wetWaste`] = item;
    }
    else if(track/2===2.5){
        imagesDatabase[`eWaste`] = item;
    }
    else if(track/2===3.5){
        imagesDatabase[`sanitaryWaste`] = item;
    }
    else if(track/2===4.5){
        imagesDatabase[`rejectWaste`] = item;
    }
}
/*** Funtion to fill images database object End ***/

/*** Funtion to fill waste categories database object Start ***/
function fillWasteCategoriesDatabaseObject(item, track){
    if(track/2===0){
        database[`dryWaste`] = item;
    }
    else if(track/2===1){
        database[`wetWaste`] = item;
    }
    else if(track/2===2){
        database[`eWaste`] = item;
    }
    else if(track/2===3){
        database[`sanitaryWaste`] = item;
    }
    else if(track/2===4){
        database[`rejectWaste`] = item;
    }
}
/*** Funtion to fill waste categories database object End***/


/***Function To get all the data from the database object Start***/
function gettingAllDataFromDatabase(){

    for(const data in database){
    
        database[data].map(item => {
            allItemsFromDatabase.push(item);
        
        })
    
    }
   
    gettingDataToBeRendered();
}
/***Function To get all the data from the database object End***/

/***Function To get all the data from the database object that is to be rendered Start***/
function gettingDataToBeRendered(){

    let track = fillArray(totalCategories);

    Shuffle(track);

    let randomNumbersArray = [];


    for(let i = 1; i<totalCategories;i+=eachCategories){
        
        if(i===1){
            
             randomNumbersArray = generateRandomArr(totalCategories/5, 1, dryWasteTotalData);
             fillObjectOfCategories(randomNumbersArray, track, "dryWaste");

        }else if(i === eachCategories+1) {
            randomNumbersArray = generateRandomArr(totalCategories/5, sum(dryWasteTotalData+1),sum(dryWasteTotalData,wetWasteTotalData) );
            fillObjectOfCategories(randomNumbersArray, track, "wetWaste");
        
        }else if(i === 2*eachCategories+1){
            randomNumbersArray = generateRandomArr(totalCategories/5, sum(dryWasteTotalData,wetWasteTotalData,1),sum(dryWasteTotalData,wetWasteTotalData,database.eWaste.length));
            fillObjectOfCategories(randomNumbersArray, track, "eWaste");
        
        }else if(i === 3*eachCategories+1){
            randomNumbersArray = generateRandomArr(totalCategories/5, sum(dryWasteTotalData,wetWasteTotalData,eWasteTotalData,1),sum(dryWasteTotalData,wetWasteTotalData,eWasteTotalData,sanitaryWasteTotalData));
            fillObjectOfCategories(randomNumbersArray, track, "sanitaryWaste");
        
        }else if(i === 4*eachCategories+1){
            randomNumbersArray = generateRandomArr(totalCategories/5, sum(dryWasteTotalData,wetWasteTotalData,eWasteTotalData,sanitaryWasteTotalData,1),sum(dryWasteTotalData,wetWasteTotalData,eWasteTotalData,sanitaryWasteTotalData,rejectWasteTotalData));
            fillObjectOfCategories(randomNumbersArray, track, "rejectWaste");
        
        }
       
    }
    PropertiesFromCheck = shuffleProperties(Object.keys(check));
    console.log(check);
}
/***Function To get all the data from the database object that is to be rendered End***/


/*** Function to fill array starting from number 1 to the total number of categories Start***/
function fillArray(totalCategories){

    let arrayUptoTotal = [];

    for(i=1;i<=totalCategories;i++){
            arrayUptoTotal.push(i);
    }

    return arrayUptoTotal;
}

/*** Function to fill array starting from number 1 to the total number of categories End***/



/*** Function to shuffle the numbers in the array after it is filled Start***/

function Shuffle(track) {

    var rand, temp, i;

    for (i = track.length - 1; i > 0; i -= 1) {
        rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
        temp = track[rand];//swap i and the zero-indexed number
        track[rand] = track[i];
        track[i] = temp;
    }

    return track;
}

/*** Function to shuffle the numbers in the array after it is filled End***/


/*** Function to generate random numbers based on the size of data for each waste categories Start***/

function generateRandomArr(length, max, min) {

    const resultsArr = [];

    for (let i = 0; i < length; i++) {
            const newNumber = Math.floor(Math.random() * (max - min)) + min;
            resultsArr.includes(newNumber) ? length += 1 : resultsArr.push(newNumber);
    }

    return resultsArr;
}

/*** Function to generate random numbers based on the size of data for each waste categories End***/


/*** Function that returns the sum of the parameters passed to it Start***/

function sum(...args){

    let yo = 0;
    args.forEach(item=>{
        yo = yo + item;
    })

    return yo;
}

/*** Function that returns the sum of the parameters passed to it End***/


/*** Function that fills the object that will carry all the waste-categories Start***/

function fillObjectOfCategories(randomNumbersArray, track, typeOfWaste){

    randomNumbersArray.forEach(item=>{

        check[`${allItemsFromDatabase[item]}`] = typeOfWaste;

    })

}

/*** Function that fills the object that will carry all the waste-categories End***/


/*** Function to shuffle the properties array of the object that carry the waste-categories Start***/

function shuffleProperties(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

/*** Function to shuffle the properties array of the object that carry the waste-categories End***/



/*** Function to Waste Categories and images in the UI Start***/
function categoriesAdd(number){

   if(number<=totalCategories){
       
          // console.log("hello");
        
            image.src = `${mapImageWasteObj[PropertiesFromCheck[number-1]]}`
             loader.style.display = "block";
             image.style.display = "none";  
             category.textContent =  ``;  

    setTimeout(function(){ 
        loader.style.display = "none";
        image.style.display = "block";
        category.textContent =  `${PropertiesFromCheck[number-1]}`
        
         
    },2000)
       
    showNumberOfCategories();
     return  number+1;

       
     
   }else{
       image.src="";
        category.textContent = `No More Waste`
   }
}
/*** Function to Waste Categories and images in the UI End***/


/*** Function to show the number of waste categories being show and showing now Start***/
function showNumberOfCategories(){
    console.log("hello");
    numberOfCategoriesShowing.textContent = `SHOWING: ${currentCategoryNumber}/${Object.keys(check).length}`
}
/*** Function to show the number of waste categories being show and showing now End**/


/*** Function to add click feature to the boxes Start **/
function addClickFeatureToProcessBoxes(){
    processBoxes.forEach(box=>{
        
            box.addEventListener('click', (e)=>{
            
                if(currentCategoryNumber<=totalCategories+1){ 
                        if(e.target.classList.contains("counter")){
                            
                            addingWasteAfterClick[`${e.target.parentNode.classList[0]}`].push(category.textContent);
                            currentCategoryNumber = categoriesAdd(currentCategoryNumber);
                            e.target.textContent = `(${addingWasteAfterClick[`${e.target.parentNode.classList[0]}`].length})`;
                        }else{
                            
                            addingWasteAfterClick[`${e.target.classList[0]}`].push(category.textContent);
                            currentCategoryNumber = categoriesAdd(currentCategoryNumber);
                            e.target.childNodes[1].textContent = `(${addingWasteAfterClick[`${e.target.classList[0]}`].length})`;
                        }
                 }
            })
        
    })
  
}

/*** Function to add click feature to the boxes Start **/


/*** Function to handle the event when submit button is clicked Start ***/

function handleSubmit(e) {


     if(checkIfInputsAreGiven()){
        if(!anyWasteCategoriesLeft()){
            alert("Categories are left to process");
        }else{
                e.preventDefault();
                let counterTotalScore = 0;
                for(props in addingWasteAfterClick){
                    addingWasteAfterClick[props].map(item=>{
                        if(props === check[item]){
                            counterTotalScore+=1;
                            allAnswers[item] = `${props}`
                        }else{
                            allAnswers[item] = `${props.toUpperCase()}`   
                        }
                    })
                }

                displayResultErrorBox();

                totalScore.textContent = `${counterTotalScore}/${totalCategories}`;

                percentageScore = getPerecentageScore(counterTotalScore);

                console.log(percentageScore)

                getUserDetails();

                errorSpan.textContent = `The detailed result has been sent to email address-${userDetailObject['email']}`;

                sendMail(counterTotalScore, percentageScore);
                saveUserDetails(counterTotalScore);
            } 
        }else{
            alert("Fill all your details to get the result");
        }      
}

/*** Function to handle the event when submit button is clicked End ***/


/*** Function to check if the User has given all the details Start ***/

function checkIfInputsAreGiven(){
    console.log(nameOfUser.value);
    console.log(ageOfUser.value);
    console.log(mailOfUser.value);
    if(nameOfUser.value!=""&&ageOfUser.value!=""&&mailOfUser.value!=""&&(countryOfUser.value==="India"&&pinInput.value!==""||countryOfUser.value==="Other"&&countryName.value!=="")){
        if(pinInput.value.split("").length===6){
            return true;
        }else{
            alert("Please Enter a Valid Pin Code")
        }
        
    }else{
        return false;
    }
}

/*** Function to check if the User has given all the details End***/



/*** Function to check if any waste categories are left Start ***/

function anyWasteCategoriesLeft(){
    if(category.textContent === `No More Waste`){
        return true;
    }else{
       return false;
    }
}

/*** Function to check if any waste categories are left End ***/



/*** Function to display result error box Start ***/

function displayResultErrorBox(){
    resultErrorBox.style.display = "block";
}

/*** Function to display result error box End ***/


/***  Function to get Percentage Score Start  ***/

function getPerecentageScore(counterTotalScore) {
    return (counterTotalScore/totalCategories)*100;
}

/***  Function to get Percentage Score End  ***/

/*** Function to get Users details Start ***/

function getUserDetails(){
    userDetailObject['name'] = nameOfUser.value;
    userDetailObject['age'] = ageOfUser.value;
    userDetailObject['email'] = mailOfUser.value;
    userDetailObject['country'] = countryOfUser.value;
    if(userDetailObject['country']!=="India"){
        userDetailObject['countryName'] = countryName.value;
    }else{
        userDetailObject["pinCode"] = pinInput.value;
    }
    userDetailObject["gender"] = gender.value;
    
}

/*** Function to get Users details End ***/


/*** Function to handle when the user clicks ok button Start ***/

function handleResultBoxOkButton(e){
    location.reload();
}

/*** Function to handle when the user clicks ok button End ***/


/*** Function send mail to the user Start ***/

async function sendMail(counterTotalScore, percentageScore){

    let body = getEmailBody(counterTotalScore, percentageScore);

	try {
		const response = await fetch('https://sustainable-alchemists.com/main/test.php', {
		 method: 'POST',
		 headers: {
			  'Content-Type': 'application/x-www-form-urlencoded',
		   },
		   body: `to=${userDetailObject['email']}&subject=Sustainable Alchemist sent a mail&%20mail%20api&body=${body}%20&auth=SgrElSW@XGW3s1f`
		 });

		 const data = await response.json();

	   } catch(error) {


		  console.log(error)
		 } 
}


/*** Function to send mail to the user End ***/




/***  Function to make and return the body for the email to be sent Start  ***/

function getEmailBody(counterTotalScore, percentageScore){
    let topMostText = `<div style="font-size:16px;margin-bottom:10px">Dear Changemaker ${userDetailObject['name']}</div>
                        <div style="font-size:16px;margin-bottom:10px">Greetings from Sustainable Alchemist Enterprises.</div>
                        <div style="font-size:16px;margin-bottom:10px">We hope you have enjoyed exploring the “Waste Segregation Simulator” on our platform.</div>
                        <div style="font-size:16px;margin-bottom:10px">Please find your detailed scorecard attached below:</div>`

    let headerText = getEmailHeaderText(percentageScore);

    let tableHeaderRow = getEmailTableHeaderRow();

    let counter = 1;

    let bodyArrayString = [topMostText, `<table style="font-size:20px;border:2px solid black;margin-top:15px;margin-bottom:15px">`, tableHeaderRow]

    for (prop in allAnswers) {
        if(allAnswers[prop] == allAnswers[prop].toUpperCase()){
            bodyArrayString.push(`<tr>
            <td style="border:1px solid black">${counter}</td>
            <td style="border:1px solid black">${prop}</td>
            <td style="border:1px solid black">${allAnswers[prop]}</td>
            <td style="border:1px solid black">Incorrect</td>
          </tr>`)
        }else {
            bodyArrayString.push(`<tr>
            <td style="border:1px solid black">${counter}</td>
            <td style="border:1px solid black">${prop}</td>
            <td style="border:1px solid black">${allAnswers[prop].toUpperCase()}</td>
            <td style="border:1px solid black">Correct</td>
          </tr>`)
        }

        counter++;
    }
  
    bodyArrayString.push(`</table>`);
    bodyArrayString.push(headerText);
    
    bodyArrayString.push(`<div style="font-size:15px">Don’t forget to check out our other calculators.</div>
                            <div style="font-size:15px">Have a feedback? Kindly use this form to get in touch with us.</div>
                            <a>https://forms.gle/6aFag3Ek1Ho7Bgy27</a>
                            <div style="color:green;font-size:15px">--</div>
                            <div style="color:green;font-size:15px">Best Wishes</div>
                            <div style="color:green;font-size:15px">Team - Sustainable Alchemists
                            </div>`)

    return bodyArrayString.join("");
}

/***  Function to make and return the body for the email to be sent End  ***/




/***  Function to get email header text Start  ***/

function getEmailHeaderText(percentageScore) {

    if(percentageScore>=0&&percentageScore<=25){
        return getCouponCode(percentageScore, 'Captain_planet', couponDiscountObject['Captain_planet']);
    }else if(percentageScore>=26&&percentageScore<=50){
        return getCouponCode(percentageScore, 'Eco-friendly-living', couponDiscountObject['Eco-friendly-living']);
    } else if(percentageScore>=51&&percentageScore<=75){
        return getCouponCode(percentageScore, 'Sampurn(e)arth', couponDiscountObject['Sampurn(e)arth'])
    } else if(percentageScore>75){
        return getCouponCode(percentageScore, 'Sustainable_alchemists', couponDiscountObject['Sustainable_alchemists'])
    }             

}

/***  Function to get email header text End  ***/




/***  Function to get email table header row Start  ***/

function getEmailTableHeaderRow(){
    return `<tr>
                <th style="border:1px solid black">Sl no.</th>
                <th style="border:1px solid black">Waste Type</th>
                <th style="border:1px solid black">Your Answer</th>
                <th style="border:1px solid black">Correct/Incorrect</th>
          </tr>`
}

/***  Function to get email table header row End ***/


/*** Function to save the user details in the firebase Start ***/

function saveUserDetails(counterTotalScore){
	var newMessageRef = messagesRef.push();
    if(userDetailObject["country"]!=="India"){
        newMessageRef.set({
            name: userDetailObject["name"],
            email:userDetailObject["email"],
            theTotalScore: counterTotalScore,
            age: userDetailObject["age"],
            country: userDetailObject["country"],
            countryName: userDetailObject["countryName"],
            gender: userDetailObject["gender"]
          });
    }else{
        newMessageRef.set({
            name: userDetailObject["name"],
            email:userDetailObject["email"],
            theTotalScore: counterTotalScore,
            age: userDetailObject["age"],
            country: userDetailObject["country"],
            pinCode: userDetailObject["pinCode"],
            gender: userDetailObject["gender"]
          });
    }
	
  }


/*** Function to save the user details in the firebase End ***/


/***  Function to get coupon code Start  ***/

function getCouponCode(percentageScore, couponCode, discountPercentage){
    if(percentageScore>=0&&percentageScore<=25){
        return `
        <div style="border:2px solid black; margin-top:15px; margin-bottom:15px">
        <div style="font-size:15px; margin-bottom:10px">Thank you for attempting our simulator.
        </div>
        <div style="font-size:15px; margin-bottom:10px">Hope it was insightful. 
        </div>
        <div style="font-size:15px; margin-bottom:10px">We believe only by gaining proper knowledge and putting in the right effort a golden society (a sustainable world) for all can be created.</div>
        <div style="font-size:15px; margin-bottom:10px">If you're willing to learn more about effective waste management practices, you can join our online course which is made in association with a national award-winning waste management organization - "Sampurn(e)arth Environment Solutions Private Limited". This course is designed using real-life project experiences and case references covering a wide range of topics.</div>
        <div style="font-size:15px; margin-bottom:10px">Consider this 10% discount coupon <coupon code: captain_planet> as an appreciation for your outstanding effort. (Type in the code while making your purchase.)
        </div></div>`
    }else if(percentageScore>=26&&percentageScore<=50){
        return `
        <div style="border:2px solid black; margin-top:15px; margin-bottom:15px">
        <div style="font-size:15px; margin-bottom:10px">Wow!! You're a Rookie Segregator!</div>
        <div>Congratulations on scoring above 25% in our simulator. 
        </div>
        <div style="font-size:15px; margin-bottom:10px">We believe only by gaining proper knowledge and putting in the right effort a golden society (a sustainable world) for all can be created.</div>
        <div style="font-size:15px; margin-bottom:10px">If you're willing to learn more about effective waste management practices, you can join our online course which is made in association with a national award-winning waste management organization - "Sampurn(e)arth Environment Solutions Private Limited". This course is designed using real-life project experiences and case references covering a wide range of topics.</div>
        <div style="font-size:15px; margin-bottom:10px">Consider this 25% discount coupon <coupon code: eco-friendly-living> as an appreciation for your outstanding effort. (Type in the code while making your purchase.)</div></div>`
    } else if(percentageScore>=51&&percentageScore<=75){
        return `
        <div style="border:2px solid black; margin-top:15px; margin-bottom:15px">
        <div style="font-size:15px; margin-bottom:10px">Wow!! You're a certified segregator! </div>
        <div style="font-size:15px; margin-bottom:10px">Congratulations on scoring above 50% in our online waste simulator. 
        </div>
        <div style="font-size:15px; margin-bottom:10px">We believe only by gaining proper knowledge and putting in the right effort a golden society (a sustainable world) for all can be created.</div>
        <div style="font-size:15px; margin-bottom:10px">If you're willing to learn more about effective waste management practices, you can join our online course which is made in association with a national award-winning waste management organization - "Sampurn(e)arth Environment Solutions Private Limited". This course is designed using real-life project experiences and case references covering a wide range of topics.</div>
        <div style="font-size:15px; margin-bottom:10px">Consider this 40% discount coupon <coupon code: sampurn(e)arth> as an appreciation for your outstanding effort. (Type in the code while making your purchase.)
        </div></div>`
    } else if(percentageScore>75){
        return `
        <div style="border:2px solid black; margin-top:15px; margin-bottom:15px">
        <div style="font-size:15px; margin-bottom:10px">Wow!! You are an expert segregator!</div>
                <div style="font-size:15px; margin-bottom:10px">Congratulations on scoring above 75% in our online waste simulator. 
                </div>
                <div style="font-size:15px; margin-bottom:10px">We believe only by gaining proper knowledge and putting in the right effort a golden society (a sustainable world) for all can be created.</div>
                <div style="font-size:15px; margin-bottom:10px">If you're willing to learn more about effective waste management practices, you can join our online course which is made in association with a national award-winning waste management organization - "Sampurn(e)arth Environment Solutions Private Limited". This course is designed using real-life project experiences and case references covering a wide range of topics.</div>
                <div style="font-size:15px; margin-bottom:10px">Consider this 50% discount coupon <coupon code: sustainable_alchemists> as an appreciation for your outstanding effort. (Type in the code while making your purchase.</div></div>`
    }   
    
}

/***  Function to get coupon code End  ***/


/*** Function to handle the changes to be made when the user changes total number of categories Start***/
function handleSelectChange(e){
    if(userStartedTheGame()){
        totalCategories = e.target.value;
        
        reloadAfterSelectChange();
    }else{
        alert(`Total Wastes Can't be changed once the game is started`)
    }
    console.log(e.target.value)
}
/*** Function to handle the changes to be made when the user changes total number of categories End***/



/*** To check if the user started playing or not Start***/
function userStartedTheGame(){
    for(props in addingWasteAfterClick){
        if(addingWasteAfterClick[props].length>0){
            return false;
        }
    }
    return true;
}
/*** To check if the user started playing or not End***/



/*** Function to handle when the user's first click Start ***/

function handleFirstUserClick(){
    preGameContainer.style.display = "block";
}

/*** Function to handle when the user's first click End ***/


/*** Function to handle when the users Start game button Start ***/

function handleStartGameButtonClick(){
    if(checkIfInputsAreGiven()){
        preGameContainer.style.display = "none"
    }else{
        alert("Fill the details to play the game")
    }
}

/*** Function to handle when the users Start game button End***/


/*** Function after the selection changes Start***/

async function reloadAfterSelectChange(){
    counterHolder = {
        dryWaste: 0,
        wetWaste: 0,
        eWaste: 0,
        sanitaryWaste: 0,
        rejectWaste: 0
    }
    tracking = 1;
    copyCat = []; 
 database = {};
 imagesDatabase = {};
 mapImageWasteObj = {};
 currentCategoryNumber = 1
 dryWasteTotalData = 0;
 wetWasteTotalData =0;
 eWasteTotalData = 0;
 sanitaryWasteTotalData = 0;
 rejectWasteTotalData = 0;
 PropertiesFromCheck = [];
check = {};                   //The category object, using this with numbering to get reference
allItemsFromDatabase = [];  //Array to hold all the items from the database object

    let data = await getData().then( data=>{
        let track = 0;
            data.data.map( item=>{
                if(track%2===0){
                    fillWasteCategoriesDatabaseObject(item, track);
                }else{
                    fillImagesDatabaseObject(item, track);
                }
                track+=1;
            })
            
           
            mapWastesWithImages();
            
        })
        dryWasteTotalData = database[`dryWaste`].length;
        wetWasteTotalData = database[`wetWaste`].length;
        sanitaryWasteTotalData = database[`sanitaryWaste`].length;
        rejectWasteTotalData = database[`rejectWaste`].length;
        eWasteTotalData = database[`eWaste`].length;
         await gettingAllDataFromDatabase();

        currentCategoryNumber =  categoriesAdd(currentCategoryNumber);

}

/*** Function after the selection changes End***/




countryOfUser.addEventListener('change', function(e){
    if(e.target.value==="India"){
        countryNameLabel.style.display = "none";
        countryName.style.display = "none"
        pinLabel.style.display = "block";
        pinInput.style.display = "block"
    }else{
        pinLabel.style.display = "none";
        pinInput.style.display = "none"
       countryNameLabel.style.display = "block";
       countryName.style.display = "block"
    }
})