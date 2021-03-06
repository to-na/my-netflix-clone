export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    users {
      id
    }
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    'findVideoIdByUserId',
    { videoId, userId },
    token
  );
  return response;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    'createNewUser',
    { issuer, email, publicAddress },
    token
  );
  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
  `;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    'isNewUser',
    { issuer },
    token
  );
  return response?.data?.users?.length === 0;
}
async function queryHasuraGraphQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
  return await result.json();
}
