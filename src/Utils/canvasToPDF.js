import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const canvasToMultiPagePDF = async (
  elements,
  fileName = "lesson.pdf",
) => {
  const elementsArray = [...elements.children];
  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    let position = 10;
    const padding = 10;
    let heightLeft = pageHeight - padding; //pageHeight
    for (const element of elementsArray) {
      //get child height
      const imgWidth = Math.floor(pageWidth - padding * 2);
      const canvas = await html2canvas(element);
      //   const orignalHeight = element.getBoundingClientRect().height;
      const orignalHeight = canvas.height;
      //   const orignalWidth = element.getBoundingClientRect().width;
      const orignalWidth = canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = Math.ceil((orignalHeight * imgWidth) / orignalWidth);
      //   console.log(element, orignalHeight, orignalWidth, imgHeight, imgWidth);
      // First page
      if (heightLeft < imgHeight) {
        position = 10;
        heightLeft = pageHeight - padding;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", padding, position, imgWidth, imgHeight);
        position += imgHeight;
        heightLeft -= imgHeight;
      } else {
        pdf.addImage(imgData, "PNG", padding, position, imgWidth, imgHeight);
        position += imgHeight;
        heightLeft -= imgHeight;
      }

      // Additional pages
      //   while (heightLeft > 0) {
      //     position = heightLeft - imgHeight;

      //     pdf.addPage();
      //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      //     heightLeft -= pageHeight;
      //   }
      // else add it to the next page
    }

    pdf.save(fileName);
  } catch (error) {
    console.log(error);
  }
};
