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

export const useProjects = (posts, sort, query) => {
    //const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        
        //const filterPosts = posts.filter(post => (post.status_id != null ? post.status_id.name : '') === manager.TelegramID)
        
        if (query != '') {
            if (query == 'All') {
                return posts;
            }
            return posts.filter(post => (post.status_id != null ? post.status_id.name : '') === query)
        }
        
        return posts
     }, [query, posts])

     return sortedAndSearchedPosts;
}