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
     * @param userId : ID of the user
     * @returns {*} reference to the firebase object
     */
    getCardProgressRef(cardKey, userId) {
        return this.firebaseApp.database().ref('progress/' + userId + "/" + cardKey);
    }

    /**
     * Returns the firebase reference to the progress
     * @param userId : ID of the user
     * @returns {*} reference to the firebase object
     */
    getProgressRef(userId) {
        return this.firebaseApp.database().ref('progress/' + userId);
    }

    /**
     * Returns the firebase reference to the favorites of a card
     * @param cardKey : String key of the card
     * @param userId : ID of the user
     * @returns {*} reference to the firebase object
     */
    getCardFavoriteRef(cardKey, userId) {
        return this.firebaseApp.database().ref('favorites/'  + userId + "/" + cardKey);
    }

    /**
     * Returns the firebase reference to the favorites of a user
     * @param userId : ID of the user
     * @returns {*} reference to the firebase object
     */
    getFavoritesRef(userId) {
        return this.firebaseApp.database().ref('favorites/' + userId);
    }

    /**
     * Gets all the cards that are in the specified key's category
     * @param catKey : String key of the category
     * @param callback : Function gets called when the promise is resolved
     * @param asArray : boolean whether the values should be returned as an array or not
     */
    getCardsByCategory(catKey,callback,asArray = true) {
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
            if(asArray) {
                callback(items);
            } else {
                callback(snapshot.val());
            }

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
     * @param userId : ID of the user
     */
    increaseCardProgress(cardKey, userId) { // TESTED
        let progressRef = this.getCardProgressRef(cardKey,userId).child('progress');
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
     * @param userId : ID of the user
     */
    decreaseCardProgress(cardKey, userId) { // TESTED
        let progressRef = this.getCardProgressRef(cardKey, userId).child('progress');
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

    static moveFbRecord(oldRef, newRef) {
        oldRef.once('value', function(snap)  {
            newRef.set( snap.val(), function(error) {
                //if( !error ) {  //oldRef.remove(); }
                //else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
            });
        });
    }


    /**
     * Helper function that merges two firebase objects
     * the attributes are only merged if both objects contain the same keys
     *
     * @param first : object into which the data should be merged
     * @param second : object from which the data should be taken
     * @returns {*} merged object
     */
    leftJoin(first,second) {
        if(first && second) {
            for (let key in first) {
                if (first.hasOwnProperty(key)) {
                    if (second[key]) {
                        Object.assign(first[key], second[key]);
                    }
                }
            }
        }
        return first;
    }

    /**
     * Helper function that excludes one set from another
     * @param first : object from which the matching data should be removed
     * @param second : object which should be excluded
     * @returns {*} merged object
     */
    exclude(first,second) {
        for (let key in first) {
            if (first.hasOwnProperty(key)) {
                if(second[key]) {
                    delete first[key];
                }
            }
        }
        return first;
    }
    /**
     * Helper function that merges two firebase objects if the attributes are in both objects
     * @param first : object into which the data should be merged
     * @param second : object from which the data should be taken
     * @returns {*} merged object
     */
    join(first,second) {
        for (let key in first) {
            if (first.hasOwnProperty(key)) {
                if(typeof second[key] === 'undefined' || second[key] === null) {
                    delete first[key];
                } else {
                    Object.assign(first[key],second[key]);
                }
            }
        }
        return first;
    }


    /**
     * Resets the progress of a card to zero
     * @param cardKey : String key of the card
     * @param userId : ID of the user
     */
    resetCardProgress(cardKey,userId) { // TESTED
        let updates = {};
        updates['progress'] = 0;
        this.getCardProgressRef(cardKey,userId).update(updates);
    }

    /**
     * Sets the favorite boolean of the card
     * @param cardKey : String key of the card
     * @param bool : boolean the value that should be set
     * @param userId : ID of the user
     */
    setCardFavorite(cardKey,bool = true,userId) {
        this.getCardFavoriteRef(cardKey,userId).set({'favorite' : bool});
    }

    /**
     * Gets all the favorite cards
     * @param callback : Function that gets called when the promise is resolved
     * @param userId : ID of the user
     */
    getFavorites(userId, callback) {
        this.getFavoritesRef(userId).once('value',(favorites) => {
            callback(favorites.val());
        });
    }

    /**
     * Returns the progress for all cards
     * @param callback : Function that gets called when the promise is resolved
     * @param userId : ID of the user
     */
    getProgress(userId,callback) {
        let progressRef = this.getProgressRef(userId);
        progressRef.once("value", (progressSnap) => {
            if(progressSnap.val()) {
                callback(progressSnap.val());
            } else {
                callback(null);
            }
        });
    }

    getProgressByGroup(progressGroup,userId,callback) {
        let ref = this.getProgressRef(userId).orderByChild("progress");
        if(progressGroup == "veryhard") {
            ref = ref.endAt(-2);
        } else if(progressGroup == "hard") {
            ref = ref.equalTo(-1);
        } else if(progressGroup == "normal") {
            ref = ref.startAt(0).endAt(1);
        } else if(progressGroup == "learned") {
            ref = ref.startAt(2);
        } else {
            throw "progressGroup either not set or not valid";
        }
        ref.once("value", (progressSnap) => {
            if(progressSnap.val()) {
                callback(progressSnap.val());
            } else {
                callback(null);
            }
        });
    }

    getCardsWithFavorites(catKey,userId,callback) {
        this.getCardsByCategory(catKey,(cards) => {
            this.getFavorites(userId,(favorites) => {
                this.getProgress(userId,(progress) => {
                   callback(this.toArray(this.leftJoin(this.leftJoin(cards,favorites),progress)));
                });
            });
        },false)
    }

    groupCardsByProgress(cards) {
        if(cards) {
            let veryhard = [];
            let hard = [];
            let normal = [];
            let learned = [];
            let unviewed = [];
            for(let i=0; i < cards.length; i++) {
                let val = cards[i];
                if (val.progress <= -2) {
                    veryhard.push(val);
                } else if (val.progress == -1) {
                    hard.push(val);
                } else if (val.progress >= 2) {
                    learned.push(val);
                } else if (val.progress == 1) {
                    normal.push(val);
                } else { // Progress is not set or zero
                    unviewed.push(val);
                }
            }
            return {'veryhard': veryhard, 'hard': hard, 'normal': normal, 'learned': learned, 'unviewed': unviewed};
        } else {
            return null;
        }
    }

    getCardsByProgress(catKey,progressGroup,callback) {
        if (progressGroup != "unviewed") {
            this.getCardsByCategory(catKey, (cards) => {
                this.getProgressByGroup(progressGroup,(progress) => {
                    this.getFavorites((favorites) => {
                        callback(this.toArray(this.leftJoin(this.join(cards, progress), favorites)));
                    });
                });
            }, false);
        } else {
            this.getCardsByCategory(catKey, (cards) => {
                this.getProgress((progress) => {
                    this.getFavorites((favorites) => {
                        callback(this.toArray(this.leftJoin(this.exclude(cards, progress), favorites)));
                    });
                });
            }, false);
        }
    }

    toArray(data) {
        let items = [];
        if(data) {
            items = Object.keys(data).map((key) => {
                let obj = data[key];
                obj._key = key;
                return obj;
            });
        }
        return items;
    }

}
