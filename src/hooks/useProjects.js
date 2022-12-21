import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo( () => {
        if (sort) {
            return [...posts].sort()
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const useProjects = (posts2, sort, query) => {
    const sortedPosts = useSortedPosts(posts2, sort);

    console.log('posts2: ', posts2)

    const sortedAndSearchedPosts = useMemo(() => {

        if (query != '') {
            if (query == 'All') {
                return posts2; //sortedPosts
            }
            return posts2.filter(post => (post.status_id != null ? post.status_id.name : '') === query)  //sortedPosts
        }
        return posts2 //sortedPosts

    }, [query, posts2]) //sortedPosts

    return sortedAndSearchedPosts;
}