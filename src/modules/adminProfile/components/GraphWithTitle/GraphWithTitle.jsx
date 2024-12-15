import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import "./graphWithTitle.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* eslint-disable react/prop-types */
export default function GraphWithTitle({ title, data }) {
    const ref = useRef(null);
    const downloadPDF = async () => {
        try {
            const element = ref.current;
            if (!element) return;
            const canvas = await html2canvas(element, { scale: 2 });
            const dataToPdf = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4'
            })

            const imgProps = pdf.getImageProperties(dataToPdf);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataToPdf, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Add footer text
            pdf.setFontSize(10);
            pdf.text('Gracias por usar Rippio', pdfWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });

            // const xvalues = data.xvalues.map((x) => String(x));
            // const yvalues = data.yvalues.map((y) => String(y));

            // console.log(data.xvalues);
            // console.log(data.yvalues);
            

            // Add hidden table
            const tableData = [
                data.xvalues.map((x) => String(x)),
                data.yvalues.map((y) => String(Math.round(y))),
            ];
            let startY = pdfHeight + 20;
            tableData.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    pdf.text(cell, 10 + cellIndex * 50, startY + rowIndex * 10);
                });
            });

            pdf.save(`${title}.pdf`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="graph_with_title_container">
            <div className="graph" ref={ref}>
                <h3>{title}</h3>
                <Bar
                    data={{
                        labels: data.xvalues,
                        datasets: [{
                            label: data.ylabel,
                            data: data.yvalues.map((y) => Math.round(y)),
                            backgroundColor: data.yvalues.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`),
                        }]
                    }}
                    options={{ maintainAspectRatio: true }}
                />
            </div>
            <button className="download_pdf_button"
                onClick={downloadPDF}>Descargar PDF</button>
        </div>
    )
}