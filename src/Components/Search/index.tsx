import { useLocation, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ShoppingCartContext } from "../../Context";

const WAIT_BETWEEN_CHANGE = 500;

export default function Search({ placeholder }: { placeholder: string }) {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const { setSearchByTitle } = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(`URL actual: ${location.pathname}--${location.search}`);


    const handleSearch = useDebouncedCallback((term: string) => {
        if(term) {
            setSearchParams({ query: term });
            setSearchByTitle(term);
            navigate(`/${location.pathname}?query=${term}`, { replace: true });
        } else {
            setSearchParams({});
            setSearchByTitle('');
            navigate(`/${location.pathname}?page=1`, { replace: true });
        }
    }, WAIT_BETWEEN_CHANGE )

    useEffect(() => {
        const query = searchParams.get('query');
        console.log()
        if (query) {
            setSearchByTitle(query);
        } else {
            setSearchByTitle('');
        }

    }, [searchParams]);

    return (
        <div>   
            <input 
                type="text" 
                id="simple-search" 
                className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}