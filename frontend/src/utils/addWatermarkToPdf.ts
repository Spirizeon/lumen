import jsPDF from 'jspdf';

export function addWatermark(
  doc: jsPDF, 
  pageWidth: number, 
  pageHeight: number
): jsPDF {
  doc.setFontSize(50);
  const r = 150;
  const g = 150;
  const b = 150;
  const alpha = 0.1; 

  doc.setTextColor(`rgba(${r}, ${g}, ${b}, ${alpha})`);
  doc.text('ADAMANTIUM', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: 45,
  });
  doc.setFontSize(15);
  doc.setTextColor(0, 0, 0);
  
  return doc;
}
