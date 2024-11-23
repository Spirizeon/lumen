import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import {addWatermark} from '@/utils/addWatermarkToPdf'

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const content = data.variableName || 'N/A';
    const content2 = content;
    const content3 = content2 + content;

    const doc = new jsPDF();

    const marginLeft = 20;
    const marginTop = 20;
    const maxWidth = 170;
    const lineHeight = 0.5;
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let cursorY = marginTop;

    

    doc.setFontSize(12);
    doc.setFont('helvetica');

    const lines = doc.splitTextToSize(content3, maxWidth);


    lines.forEach((line:string) => {
      // Check if the current line will exceed the page height
      if (cursorY + lineHeight * doc.getLineHeight() > pageHeight - marginTop) {
        doc.addPage(); // Add a new page
        cursorY = marginTop; // Reset cursorY to the top margin
      }

      // Add the line of text to the PDF
      // addWatermark(doc, pageWidth, pageHeight); 
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight * doc.getLineHeight(); // Move cursorY to the next line
    });

    const pdfBlob = doc.output('blob');

    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="a4.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Failed to generate PDF', { status: 500 });
  }
}
