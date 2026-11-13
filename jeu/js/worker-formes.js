// Worker : calcule en arrière-plan les formes des personnages (voir personnage.js)
import { travaillerEnArrierePlan } from './personnage.js';
travaillerEnArrierePlan((message, transfert) => self.postMessage(message, transfert));
