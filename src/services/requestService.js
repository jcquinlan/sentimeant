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
        createdAt: new Date()
    });

    return await draftRef.get();
};

export async function getDrafts () {
    return await db.collection('drafts').get();
}

export async function getDraftsForRequest (requestId) {
    return await db.collection('drafts').where('requestId', '==', requestId).get();
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