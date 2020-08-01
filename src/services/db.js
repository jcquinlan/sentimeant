import {initializeApp} from 'firebase';
import {firestore} from 'firebase';
import Config from '../config';

initializeApp(Config);

export const db = firestore();
