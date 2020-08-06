const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

async function handleNewDraft (request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    const {content, requestId, ownerId, requestTitle} = JSON.parse(request.body);
    
    if (!(content && requestId && ownerId && requestTitle)) {
        response.writeHead(400);
        response.end('Missing body data on the request.');
    } else {
        await db.collection('drafts').add({
            requestId: requestId,
            content: content,
            createdAt: new Date(),
            archived: false,
            accepted: false
        });

        const userRef = await admin.auth().getUser(ownerId);
        const {email} = userRef.toJSON();

        db.collection('mail').add({
            to: email,
            template: {
                name: 'newDraftEmail',
                data: {
                    requestTitle,
                    requestUrl: `https://www.sentimeant.help/request/${requestId}`
                }
            }
        });

        response.writeHead(200);
        response.end('Draft successfully saved');
    }
}

exports.submitDraft = functions.https.onRequest(handleNewDraft);
