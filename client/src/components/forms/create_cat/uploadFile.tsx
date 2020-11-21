import { useUploadCatPhotoMutation } from "../../../generated/graphql";

export const UploadFile = ({ id }) => {
  const [uploadCatPhoto, { loading, error }] = useUploadCatPhotoMutation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <>
      <input name={'document'} type={'file'} onChange={({ target: { files } }) => {
        const file = files[0]
        file && uploadCatPhoto({ variables: { file: file, id: id } })
      }} />
    </>
  );
};