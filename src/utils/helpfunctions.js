/**
 * 图表图片导出
 * @param chart chart 实例
 * @param name 图片名称，可选，默认名为 'G2Chart'
 */
export const downloadImage = ({chart, name,subtitle,width,height}) => {
    const link = document.createElement("a");
    const filename = `${name}.png`;
  
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.height = height||400;
      canvas.width = width||600;
      let ctx=canvas.getContext("2d");
  
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.textAlign = "center";
      ctx.fillStyle = '#000';
      ctx.font="20px 'Microsoft YaHei'";
      ctx.fillText(name,canvas.width/2,20);
  
      ctx.fillStyle = '#808080';
      ctx.font="16px 'Microsoft YaHei'";
      ctx.fillText(subtitle,canvas.width/2,60);
  
      ctx.drawImage(chart.get('canvas')._cfg.el, 0, 70);
  
      const dataURL = canvas.toDataURL();
  
      //const dataURL = chart.toDataURL("image/jpeg");
      if (window.Blob && window.URL ) {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blobObj = new Blob([u8arr], { type: mime });
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blobObj, filename);
        } else {
          link.addEventListener("click", () => {
            link.download = filename;
            link.href = window.URL.createObjectURL(blobObj);
          });
        }
      } else {
        link.addEventListener("click", () => {
          link.download = filename;
          link.href = dataURL;
        });
      }
      const e = document.createEvent("MouseEvents");
      e.initEvent("click", false, false);
      link.dispatchEvent(e);
    }, 16);
  };