import { useIsFetching } from '@tanstack/react-query';
import './index.scss';

export default function BackgroundUpdate() {
    const isFetching = useIsFetching();

    return (
        isFetching ? <div className="background-update">Updating Background...</div> : null 
    )
}