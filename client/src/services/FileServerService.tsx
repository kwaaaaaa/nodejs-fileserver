const BASE_URL: string = 'http://localhost:5555';
const ENDPOINT: string = `${BASE_URL}/files`;

const uploadFiles = async (files: any[]) => {
  let formData = new FormData();
  for (let file of files) {
    formData.append('files', file)
  }

  const params: RequestInit = {
    method: 'POST',
    body: formData,
  };

  const response = await fetch(ENDPOINT, params);
  const resultObject = await response.json();
  return resultObject;
}

const deleteFile = async (name: string) => {
  let formData = new FormData();
  formData.append('fileName', name)
  const params: RequestInit = {
    method: 'DELETE',
    body: formData,
  };
  const response = await fetch(ENDPOINT, params);
  const resultObject = await response.json();
  return resultObject;
}

const getFileList = async () => {
  return await fetch(ENDPOINT)
    .then(async resp => {
      const resultObject = await resp.json();
      return resultObject
    })
    .catch(err => {
      return {
        success: false,
        error: `Unable to call server, is the server up and running at ${BASE_URL}?`,
      }
    });
}

export {
  getFileList,
  uploadFiles,
  deleteFile,
}