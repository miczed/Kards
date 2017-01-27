import { observable } from 'mobx';
import firebaseApp from '../helpers/firebase';

/**
 * Store which handles all global app states (including the user login / authentication)
 */
class AppStore {
    @observable user = undefined;

    constructor() {}
    appInitialized() {
      firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        });
    }

    login(user) {
        this.user = user;
    }

    logout() {
        firebaseApp.auth().signOut().then(function() {
            this.user = null;
        }, function(error) {
            console.log(error);
        });
    }
}

export default new AppStore();