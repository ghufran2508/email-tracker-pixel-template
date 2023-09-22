const express = require('express');
const {firebaseApp, firestoreDB} = require('./clients/firebase');
const { collection, addDoc, getDoc, setDoc, doc, updateDoc } = require("firebase/firestore"); 

require("dotenv").config();

const app = express();

app.get('/', (req, res) => {
    console.log(req);

    res.json({message: "WOW"});
})

app.get('/add', async (req, res) => {
    try {
        const docRef = await addDoc(collection(firestoreDB, "users"), {
          first: "Ada",
          last: "Lovelace",
          count: 1,
        });
        console.log("Document written with ID: ", docRef.id);
        return res.status(200).json(docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
        return res.json({e});
      }
})

app.get('/:id', async(req, res) => {
    try {
        const target = doc(firestoreDB, "users", req.params.id);
        const snapshot = await getDoc(target);
        await updateDoc(target, {
            count: snapshot.data().count + 1,
        })

        res.status(200).json({update: true});
    }
    catch(e) {
        console.error("Error updating document: ", e);
        return res.json({e});
    }
})

app.listen(5000, ()=> {
    console.log("Server running.....");
})