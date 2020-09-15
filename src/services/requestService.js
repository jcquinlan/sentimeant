import {db} from './db';

export const convertSnapshotToArray = (snapshot) => {
    const array = [];
    snapshot.forEach(item => array.push({...item.data(), id: item.id}));
    return array;
};

export async function createLetterRequest ({ownerId, name, description, miscInfo, ownVersion, title}) {
    const requestRef = await db.collection('requests').add({
        ownerId,
        recipientName: name,
        recipientDescription: description,
        miscInfo,
        ownVersion,
        title,
        hasAcceptedDraft: false,
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
        .orderBy('createdAt', 'desc')
        .get();
}

export async function getDraftsForRequests (requestIds) {
    return await db.collection('drafts')
        .where('requestId', 'in', requestIds)
        .where('archived', '==', false)
        .get();
}

export async function getRequests () {
    return await db.collection('requests')
        .where('hasAcceptedDraft', '==', false)
        .get();
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
    const docRef = db.collection("drafts").doc(draftId);
    await docRef.update({accepted: true});
    const draftRef = await docRef.get();
    const {requestId} = draftRef.data();
    await db.collection("requests").doc(requestId).update({hasAcceptedDraft: true});
}

export async function submitDraft ({requestId, content, ownerId, requestTitle}) {
    return fetch('http://localhost:5001/sentimeant-59375/us-central1/submitDraft', {
        method: 'POST',
        body: JSON.stringify({requestId, content, ownerId, requestTitle}),
    })
}
