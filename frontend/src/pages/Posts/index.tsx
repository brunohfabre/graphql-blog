import React, { useCallback } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';

import { Container } from './styles';

const POSTS = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: String!, $data: InputPost) {
    updatePost(id: $id, data: $data) {
      id
      title
      content
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
  }
`;

interface PostData {
  posts: Array<{
    id: string;
    title: string;
    content: string;
  }>
}

function Posts() {
  const history = useHistory();

  const { loading, data, error } = useQuery<PostData>(POSTS);

  const [updatePost] = useMutation(UPDATE_POST)
  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, {data: {deletePost}}) {
      cache.modify({
        fields: {
          posts(existingPostsRefs: Array<{__ref: string}>, { readField }) {
            console.log(existingPostsRefs)
            return existingPostsRefs.filter(postRef => readField('id', postRef) !== deletePost)
          }
        }
      })
    }
  })

  const handleDeletePost = useCallback((id) => {
    deletePost({variables: {
      id
    }})
  }, [deletePost]);

  if(loading) {
    return <strong>Loading...</strong>
  }

  if(error) {
    return <span>{error}</span>
  }

  return (<Container>
    <ul>
    {data?.posts.map(post => <a key={post.id}>{post.title}
    <div>
      <button type='button' onClick={() => history.push(`/${post.id}`)}>view</button>
      <button type='button' onClick={(e) => {handleDeletePost(post.id); e.stopPropagation()}}>delete</button>
      <button type='button' onClick={(e) => {
        updatePost({variables: {
        id: post.id,
        data: {
          title: 'vrau',
          content: 'content'
        }
      }}); e.stopPropagation()}}>update</button>
    </div>
      
    </a>)}
  </ul></Container>)
}

export default Posts;