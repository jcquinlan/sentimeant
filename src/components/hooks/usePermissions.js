import {useContext, useMemo} from 'react';
import {DataContext} from '../../contexts/data';

const usePermissions = (request) => {
    const {currentUser} = useContext(DataContext);

    const isRequestOwner = useMemo(() => {
        return request && currentUser && request.ownerId === currentUser.uid;
    }, [request, currentUser]);

    return {
        isRequestOwner
    }
}

export default usePermissions;
