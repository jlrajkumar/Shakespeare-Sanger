
function search(query){
    const url = `http://cosmic-elastic.eu.ngrok.io/shakespeare/_search?q=${query}`;

    fetch(url)
        .then((response) =>{
            //console.log(response);
            if(response.status >= 200 && response.status < 400){ //HTTP RESPONSE CODES
                return response.json();
            }
            else{
                throw " HTTP ERROR";
            
            }
           
        })
        .then(jsonData => {
            
         const objArray =  Object.entries(jsonData); //convert obj to arr to loop through
            
         const resultsObj = objArray[3][1].hits[1];
         const resultsArr = Object.entries(resultsObj);

         // const results = objArray.map( element => element.hits);
          console.log('Results:', resultsArr);
            // console.log(Object.entries(results));
            showResults1(resultsArr);
            document.getElementById('errormsg').innerHTML = ""; //Success response

        })
        .catch((error) =>{
            document.getElementById('errormsg').innerHTML = error; //Error Handling

        });
       
}
     
 
function showResults1(resultsArr){ // Rendering output on UI
    const resultsList =  document.getElementById('resultsList');
    resultsList.innerText = " ";
    const resultsArray1 = Object.entries(resultsArr).forEach( result => {
   const [key, value ] = result;

   //console.log('Show Results Function',key, value);
   const element = document.createElement('li');
                    element.innerText = value;
                    resultsList.appendChild(element);
    });
}

let searchFreq = 0;
window.onload = () =>{
    const searchElement = document.getElementById('searchField');
    searchElement.onkeyup = (event) => {

        clearTimeout(searchFreq);

        if(searchElement.value.trim().length === 0){ //To eliminate searches with blank spaces 
            return;
        }
        
        searchFreq =  setTimeout(() => {
            search(searchElement.value);
        }, 250);
       
    };
}
 