import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    //console.log("sorttttttttt: ", sort)

    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => {
                
                var dateA = new Date(a[sort]), dateB = new Date(b[sort])
                                
                //dateA-dateB  //сортировка по возрастающей дате     
                return dateB-dateA  //сортировка по убывающей дате  
            })
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const useProjects = (posts2, sort, query) => {
    const sortedPosts = useSortedPosts(posts2, sort);

    const sortedAndSearchedPosts = useMemo(() => {

        if (query != '') {
            if (query == 'All') {
                return sortedPosts; //posts2; 
            }
            return sortedPosts.filter(post => (post.status_id != null ? post.status_id.name : '') === query)  //post2
        }
        return sortedPosts; //posts2 

    }, [query, sortedPosts]) //post2

    return sortedAndSearchedPosts;
}