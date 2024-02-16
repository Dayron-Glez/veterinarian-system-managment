import  { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
function HistoriaPage() {
  const [historia, setHistoria] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('historia');
    if (data) {
      setHistoria(JSON.parse(data));
    }
  }, []);
  
  useEffect(() => {
    // Esta función se ejecutará cada vez que cambie el localStorage
    const handleStorageChange = () => {
      const data = localStorage.getItem('historia');
      if (data) {
        setHistoria(JSON.parse(data));
      }
    };

    // Agregamos el event listener
    window.addEventListener('storage', handleStorageChange);

    // Limpiamos el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function descargarPDF() {
    const doc = new jsPDF();
  
    // Añade texto al documento
    doc.text("Historia de la Mascota", 10, 10);
    doc.text(`Nombre de la Mascota: ${historia[1].nombre_mascota}`, 10, 20);
    doc.text(`Motivo: ${historia[0].motivo}`, 10, 30);
    doc.text(`Consulta: ${historia[0].consulta}`, 10, 40);
    doc.text(`Anamnesis: ${historia[0].anamnesis}`, 10, 50);
    doc.text(`Estado Reproductivo: ${historia[0].estado_reproductivo}`, 10, 60);
    doc.text(`Habitat: ${historia[0].habitad}`, 10, 70);
    doc.text(`Alimentación: ${historia[0].alimentacion}`, 10, 80);
    doc.text(`Alergia: ${historia[0].alergia}`, 10, 90);
    doc.text(`TLLC: ${historia[0].tllc}`, 10, 100);
    doc.text(`Pulso: ${historia[0].pulso}`, 10, 110);
    doc.text(`FC: ${historia[0].fc}`, 10, 120);
    doc.text(`FR: ${historia[0].fr}`, 10, 130);
    doc.text(`Temperatura: ${historia[0].temperatura}`, 10, 140);
    doc.text(`Peso: ${historia[0].peso}`, 10, 150);
    doc.text(`Fecha: ${new Date(historia[0].fecha).toLocaleDateString()}`, 10, 160);
    doc.text(`ID de la Mascota: ${historia[0].mascota}`, 10, 170);
    doc.text(`Especie: ${historia[1].especie}`, 10, 180);
    doc.text(`Raza: ${historia[1].raza}`, 10, 190);
    doc.text(`Edad: ${historia[1].edad}`, 10, 200);
    doc.text(`Color: ${historia[1].color}`, 10, 210);
    doc.text(`Sexo: ${historia[1].sexo}`, 10, 220);
    doc.text(`Nombre del Tutor: ${historia[2].nombre_tutor}`, 10, 230);
    doc.text(`DNI del Tutor: ${historia[2].dni}`, 10, 240);
    doc.text(`Teléfono del Tutor: ${historia[2].telefono}`, 10, 250);
  
    // Guarda el PDF con el nombre "historia.pdf"
    doc.save(`historia de ${historia[1].nombre_mascota}.pdf`);
}


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    {historia && (
      <div style={{ textAlign: 'center' }}>
        <h2>Historia de la Mascota </h2>
        <p><strong>Motivo:</strong> {historia[0].motivo}</p>
        <p><strong>Consulta:</strong> {historia[0].consulta}</p>
        <p><strong>Anamnesis:</strong> {historia[0].anamnesis}</p>
        <p><strong>Estado Reproductivo:</strong> {historia[0].estado_reproductivo}</p>
        <p><strong>Habitat:</strong> {historia[0].habitad}</p>
        <p><strong>Alimentación:</strong> {historia[0].alimentacion}</p>
        <p><strong>Alergia:</strong> {historia[0].alergia}</p>
        <p><strong>TLLC:</strong> {historia[0].tllc}</p>
        <p><strong>Pulso:</strong> {historia[0].pulso}</p>
        <p><strong>FC:</strong> {historia[0].fc}</p>
        <p><strong>FR:</strong> {historia[0].fr}</p>
        <p><strong>Temperatura:</strong> {historia[0].temperatura}</p>
        <p><strong>Peso:</strong> {historia[0].peso}</p>
        <p><strong>Fecha:</strong> {new Date(historia[0].fecha).toLocaleDateString()}</p>
        <p><strong>ID de la Mascota:</strong> {historia[0].mascota}</p>
        <p><strong>Nombre de la Mascota:</strong> {historia[1].nombre_mascota}</p>
        <p><strong>Especie:</strong> {historia[1].especie}</p>
        <p><strong>Raza:</strong> {historia[1].raza}</p>
        <p><strong>Edad:</strong> {historia[1].edad}</p>
        <p><strong>Color:</strong> {historia[1].color}</p>
        <p><strong>Sexo:</strong> {historia[1].sexo}</p>
        <p><strong>Nombre del Tutor:</strong> {historia[2].nombre_tutor}</p>
        <p><strong>DNI del Tutor:</strong> {historia[2].dni}</p>
        <p><strong>Teléfono del Tutor:</strong> {historia[2].telefono}</p>
        <button onClick={descargarPDF}>Descargar PDF</button>
      </div>
    )}
  </div>
  );
}

export default HistoriaPage;
