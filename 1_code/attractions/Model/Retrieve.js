export async function getInformation() {

    //fetch and process information from api
      return fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyB4f8HruyOxAlhEP6-FK6vGoJ9Qu643M9w')
            .then((response) => {
             
                return response.json();
            })
            .then((data) => {
               
                return data.results.map(item => new Retrieve(item.name, item.price_level, item.rating, item.vicinity, item.opening_hours, false, item.place_id, 'Save'));
                
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                  throw error;
                });

}

var savedItemsWrapper = {
    savedItems: [],
    savedState: []
}


export function addSavedItems(state){

    savedItemsWrapper.savedItems.push(state);

}

export function setSavedItems(state){
    savedItemsWrapper.savedItems = state;
}

export function getSavedItems(){
    return savedItemsWrapper.savedItems;
}

export function setSavedState(state){
    savedItemsWrapper.savedState = state;
}

export function getSavedState(){
    return savedItemsWrapper.savedState;
}



//class for storing different result items
export class Retrieve{
    constructor(name, price, rating, address, opening_hours, saved, id, buttonText) {
        this.name = name;
        this.rating = rating; 
        this.address = address;
        this.id = id;
        this.saved = saved;
        this.buttonText = buttonText;

        if(opening_hours == undefined || (Object.keys(opening_hours).length === 0)){
            var opening = {
                open_now: 'N/A'
            }

            this.opening_hours = opening;
        } else {
         this.opening_hours = opening_hours;
        }

        if(price == undefined){
            this.price = "N/A";
        } else {
         this.price = price;
        }
    }
    
}

