const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

async function handleNewDraft (request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    const parsedData = JSON.parse(request.body);
    
    if (!(parsedData.content || parsedData.requestId)) {
        response.writeHead(400);
        response.end('Missing either the draft content or the requestId');
    } else {
        await db.collection('drafts').add({
            requestId: parsedData.requestId,
            content: parsedData.content,
            createdAt: new Date(),
            archived: false,
            accepted: false
        });

        response.writeHead(200);
        response.end('Draft successfully saved');
    }
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.submitDraft = functions.https.onRequest(handleNewDraft);
