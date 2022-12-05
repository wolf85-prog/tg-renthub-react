import {useMemo} from "react";

// export const useSortedPosts = (posts, sort) => {
//     const sortedPosts = useMemo( () => {
//         // if (sort) {
//         //     return [...posts].sort()
//         // }
//         return posts;
//     }, [sort, posts])

//     return sortedPosts;
// }

export const useProjects = (posts2, manager, sort, query) => {
    //const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        
        // const filterPosts = posts.filter(post => (post.manager != null ? post.manager : '') === manager)
        
        // if (query != '') {
        //     if (query == 'All') {
        //         return filterPosts;
        //     }
        //     return filterPosts.filter(post => (post.status_id != null ? post.status_id.name : '') === query)
        // }
        // return filterPosts

        if (query != '') {
            if (query == 'All') {
                return posts2;
            }
            return posts2.filter(post => (post.status_id != null ? post.status_id.name : '') === query)
        }
        return posts2
     }, [query, posts2])

     return sortedAndSearchedPosts;
}