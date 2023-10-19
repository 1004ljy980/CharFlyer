const encodeFileToBase64 = (file: File): Promise<string | null> | void => {
  // 넘겨받은 file이 File 타입인지 확인 후 아니라면 return 합니다. (관련 오류 있었음)
  if (!(file instanceof File)) return;

  return new Promise<string>(async (resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Data = event.target?.result;
      resolve(base64Data as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export default encodeFileToBase64;
