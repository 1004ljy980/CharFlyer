const useEncodeFileToBase64 = (file : File, setState : React.Dispatch<React.SetStateAction<string | null>>) => {
  // 넘겨받은 file이 File 타입인지 확인 후 아니라면 return 합니다. (관련 오류 있었음)
  if(!(file instanceof File)) return;
  
  const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setState(reader.result as string);
    }
  };


export default useEncodeFileToBase64;