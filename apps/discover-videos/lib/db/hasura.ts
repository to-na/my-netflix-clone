export async function isNewUser(token, issuer) {
  const operationsDoc = `  
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}){
      email
      id
      issuer
      publicAddress
    }
  }
  `;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    'isNewUser',
    { issuer },
    token
  );
  return response?.data.users?.length === 0;
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
      'Content-Type': 'application/json',
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
