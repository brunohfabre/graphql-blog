import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {Container} from './styles';

const POST = gql`
  query post($id: String!){
    post(id: $id) {
      id
      title
      content
    }
  }
`;

function Post() {
  const {id} = useParams();

  const {loading, error, data} = useQuery(POST, {variables: {
    id
  }})

  if(loading) {
    return <strong>Loading...</strong>
  }

  return <Container>
    <h1>{data.post.title}</h1>
    <p>{data.post.content}</p>
  </Container>
}

export default Post;