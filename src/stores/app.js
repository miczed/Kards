import { observable } from 'mobx';
import firebaseApp from '../helpers/firebase';


class AppStore {
    @observable user = undefined; // 'login' / 'after-login'

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
}

export default new AppStore();