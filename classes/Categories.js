/**
 * Created by michaelziorjen on 08/12/16.
 */

export default class Categories {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.categoriesStore = [];
    }

    /**
     * Returns the firebase reference to all the categories
     * @returns {*} reference to the firebase object
     */
    getCategoriesRef() {
        return this.firebaseApp.database().ref('categories');
    }

    /**
     * Returns the firebase reference to a single category
     * @param catKey : String key of the category
     * @returns {*} reference to the firebase object
     */
    getCategoryRef(catKey) {
        return this.firebaseApp.database().ref('categories/' + catKey);
    }

    /**
     * Returns the firebase reference to the progress
     * @returns {*} reference to the firebase object
     */
    getProgressRef() {
        return this.firebaseApp.database().ref('progress');
    }

    getCategoryRefByParent(parentKey) {
        return this.getCategoriesRef().orderByChild("parent").equalTo(parentKey);
    }

    /**
     * Gets all the categories that are children of the specified key's category
     * @param parentKey : String key of the parent category
     * @param callback : Function gets called when the promise is resolved
     */
    getCategoriesByParent(parentKey = "", callback) {
        let ref = this.getCategoriesRef().orderByChild("parent").equalTo(parentKey);
        ref.once('value',function(snapshot) {
            let items = [];
            if(snapshot.val()) {
                let data = snapshot.val();
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
     * Gets a single category specified by it's key
     * @param catKey : String key of the category
     * @param callback : Function gets called when the promise is resolved
     */
    getCategoryByKey(catKey,callback) {
        this.getCategoryRef(catKey).once('value').then(function(snapshot) {
            let item;
            if(snapshot.val()) {
                let key = snapshot.val().key;
                this.cardsStore[key] = snapshot.val();
                item = snapshot.val();

            }
            callback(item);
        });
    }
    /**
     * Gets all the categories
     * @param callback : Function gets called when the promise is resolved
     */
    getAllCategories(callback) {
        let ref = this.getCategoriesRef();
        ref.once('value',function(snapshot) {
            let items = [];
            if(snapshot.val()) {
                let data = snapshot.val();
                this.categoriesStore = data;
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
     * Helper function that merges X firebase objects together
     * all the attributes are merged.
     * @param base : object into which the data should be merged
     * @returns {*} merged object
     */
    extend(base) {
        const parts = Array.prototype.slice.call(arguments, 1);
        parts.forEach(function (p) {
            if (p && typeof (p) === 'object') {
                for (let k in p) {
                    if (p.hasOwnProperty(k)) {
                        base[k] = p[k];
                    }
                }
            }
        });
        return base;
    }

    /**
     * Helper function that merges two firebase objects the attributes are only merged if both objects contain the same keys
     * @param first : object into which the data should be merged
     * @param second : object from which the data should be taken
     * @returns {*} merged object
     */
    leftJoin(first,second) {
        for (let key in first) {
            if (first.hasOwnProperty(key)) {
                if(typeof second[key] !== 'undefined' || second[key] !== null) {
                    Object.assign(first[key],second[key]);
                }
            }
        }
        return first;
    }

    /**
     * Returns the progress for each card in the specified category
     * @param catKey : String key for the category
     * @param callback : Function that gets called when promises are resolved
     */
    getCategoryProgress(catKey, callback) {
        let progressRef = this.getProgressRef();
        let cardsRef = this.getCategoryRef(catKey).child('cards');
        cardsRef.once("value", (cardsSnapshot) => {
            if(cardsSnapshot.val()) {
                progressRef.once("value",(progressSnapshot) => {
                    let progress = progressSnapshot.val();
                    let cards = cardsSnapshot.val();
                    let joint = this.leftJoin(cards,progress);
                    callback(joint);
                });
            } else {
                callback(null);
            }
        });
    }

    /**
     * Returns the progress for all cards
     * @param callback : Function that gets called when the promise is resolved
     */
    getProgress(callback) {
        let progressRef = this.getProgressRef();
        progressRef.once("value", (progressSnap) => {
            if(progressSnap.val()) {
                callback(progressSnap.val());
            } else {
                callback(null);
            }
        });
    }

    /**
     * Formats a joined progress object into the following groups:
     * - veryhard: 2 or more times wrong in a row
     * - hard: 1 time wrong in a row
     * - normal: zero or 1 time right in a row
     * - learned: two times right in a row
     * @param progress : Object with the cards as keys
     * @return progresses : Object with the specified attributes above
     */
    getCategoryProgressGroups(progress) {
        if(progress) {
            let veryhard = {};
            let hard = {};
            let normal = {};
            let learned = {};
            let unviewed = {};
            let counts = { 'veryhard': 0, 'hard': 0, 'normal': 0, 'learned':0, 'unviewed': 0};
            Object.keys(progress).forEach(function(key) {
                let val = progress[key];
                if (progress.hasOwnProperty(key)) {
                    if (val.progress <= -2) {
                        veryhard[key] = val;
                        counts.veryhard++;
                    } else if (val.progress == -1) {
                        hard[key] = val;
                        counts.hard++;
                    } else if (val.progress >= 2) {
                        learned[key] = val;
                        counts.learned++;
                    } else if (val.progress == 1) {
                        normal[key] = val;
                        counts.normal++;
                    } else { // Progress is not set or zero
                        unviewed[key] = val;
                        counts.unviewed++;
                    }
                }
            });
            return {'veryhard': veryhard, 'hard': hard, 'normal': normal, 'learned': learned, 'unviewed': unviewed, 'counts': counts};
        } else {
            return null;
        }
    }

}