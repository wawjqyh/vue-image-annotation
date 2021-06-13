export async function getImg(url) {
  const _res = await fetch(url);
  const imgBlob = await _res.blob();

  return imgBlob;
}

export async function blobToBase64(blob) {
  return new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.onload = e => {
      resolve(e.target.result);
    };

    fileReader.readAsDataURL(blob);
  });
}

export function base64ToBlob(base64) {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], 'image.png', { type: mime });
}

export async function getImgSize(base64) {
  return new Promise(resolve => {
    let img = new Image();
    img.src = base64;

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > 1080) {
        height = parseInt((height * 1080) / width);
        width = 1080;
      }

      resolve({ width, height, originalWidth: img.width, originalHeight: img.height, scale: width / img.width });
    };
  });
}
