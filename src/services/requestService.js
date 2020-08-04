import {db} from './db';

export async function createLetterRequest ({ownerId, name, description, miscInfo, ownVersion, title}) {
    const requestRef = await db.collection('requests').add({
        ownerId,
        recipientName: name,
        recipientDescription: description,
        miscInfo,
        ownVersion,
        title,
        createdAt: new Date()
    });

    return await requestRef.get();
};

export async function createLetterDraft ({requestId, content}) {
    const draftRef = await db.collection('drafts').add({
        requestId,
        content,
        createdAt: new Date(),
        archived: false,
        accepted: false
    });

    return await draftRef.get();
};

export async function getDrafts () {
    return await db.collection('drafts').get();
}

export async function getDraftsForRequest (requestId) {
    return await db.collection('drafts')
        .where('requestId', '==', requestId)
        .where('archived', '==', false)
        .get();
}

export async function getRequests () {
    return await db.collection('requests').get();
}

export async function getRequest (requestId) {
    const requestSnapshot = await db.collection('requests').doc(requestId).get();
    if (requestSnapshot.exists) {
        return requestSnapshot.data();
    }

    return null;
}

export async function deleteRequest (requestId) {
    return await db.collection("requests").doc(requestId).delete();
}

export async function deleteDraft (draftId) {
    return await db.collection("drafts").doc(draftId).update({archived: true});
}

export async function acceptDraft (draftId) {
    return await db.collection("drafts").doc(draftId).update({accepted: true});
}

export async function submitDraft ({requestId, content}) {
    return fetch('http://localhost:5001/sentimeant-59375/us-central1/submitDraft', {
        method: 'POST',
        body: JSON.stringify({requestId, content}),
    })
    .then(res => console.log(res));
}
