import React from 'react'

const infoParamPage = async ({ params } : { params: { id: string } }) => {
    const { id } = await params;
  return (
    <>
        <p>infoParamPage : {id} </p>
    </>
  );
};
export default infoParamPage;