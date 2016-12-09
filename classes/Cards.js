/**
 * Created by michaelziorjen on 08/12/16.
 */
export default class Cards {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.cardsStore = [];
    }
    /**
     * Returns the firebase reference to all the cards
     * @returns {*} reference to the firebase object
     */
    getCardsRef() {
        return this.firebaseApp.database().ref('cards');
    }
    /**
     * Returns the firebase reference to a single card
     * @param cardKey : String key of the card
     * @returns {*} reference to the firebase object
     */
    getCardRef(cardKey) {
        return this.firebaseApp.database().ref('cards/' + cardKey);
    }
    /**
     * Returns the firebase reference to the progress of a card
     * @param cardKey : String key of the card
     * @returns {*} reference to the firebase object
     */
    getCardProgressRef(cardKey) {
        return this.firebaseApp.database().ref('progress/' + cardKey);
    }

    /**
     * Gets all the cards that are in the specified key's category
     * @param catKey : String key of the category
     * @param callback : Function gets called when the promise is resolved
     */
    getCardsByCategory(catKey,callback) {
        this.getCardsRef().orderByChild('category').equalTo(catKey).once('value').then(function(snapshot) {
            let items = [];
            if(snapshot.val()) {
                let data = snapshot.val();
                this.cardsStore = data;
                items = Object.keys(data).map((key) => {
                    let obj = data[key];
                    obj._key = key;
                    return obj;
                });
            }
            callback(items);
        });
    }
    /**
     * Gets a single card specified by it's key
     * @param cardKey : String key of the card
     * @param callback : Function gets called when the promise is resolved
     */
    getCardByKey(cardKey, callback) {
        this.getCardRef(cardKey).once('value').then(function(snapshot) {
            let item;
            if(snapshot.val()) {
                let key = snapshot.val().key;
                this.cardsStore[key] = snapshot.val()
                item = snapshot.val();
            }
            callback(item);
        });
    }

    /**
     * Gets the progress of a card specified by it's key, gets 0 if no progress is set
     * @param cardKey : String key of the card
     * @param callback : Function that get called when promise is resolved
     */
    getCardProgress(cardKey,callback) {
        let progressRef = this.getCardProgressRef(cardKey).child('progress');
        progressRef.once('value', function(snapshot) {
            let item = 0;
            if(snapshot.val()) {
                item = snapshot.val();
            }
            callback(item);
        });
    }

    /**
     * Increases the progress of a card
     * @param cardKey : String key of the card
     */
    increaseCardProgress(cardKey) { // TESTED
        let progressRef = this.getCardProgressRef(cardKey).child('progress');
        progressRef.transaction(function (current_value) {
            if(!current_value) {
                return 1;
            }
            if(current_value <= 0) {
                return 1;
            } else {
                return current_value + 1;
            }
        });
    }
    /**
     * Decreases the progress of a card
     * @param cardKey : String key of the card
     */
    decreaseCardProgress(cardKey) { // TESTED
        let progressRef = this.getCardProgressRef(cardKey).child('progress');
        progressRef.transaction(function (current_value) {
            if(!current_value) {
                return -1;
            }
            if(current_value >= 0) {
                return -1;
            } else {
                return current_value - 1;
            }
        });
    }

    /**
     * Resets the progress of a card to zero
     * @param cardKey : String key of the card
     */
    resetCardProgress(cardKey) { // TESTED
        let updates = {};
        updates['progress'] = 0;
        this.getCardProgressRef(cardKey).update(updates);
    }
}
