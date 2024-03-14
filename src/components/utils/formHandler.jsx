import axios from 'axios';

export const onSubmit = (data, watchAlimentacion, watchHabitat, mascota, sistema, enfermedad, reset) => {
  if (watchAlimentacion !== 'Otro1') {
    delete data.otro1;
  } else {
    data.Alimentación = data.otro1
  }

  if (watchHabitat !== 'Otro2') {
    delete data.otro2;
  } else {
    data.Hábitat = data.otro2
  }

  const mascotaData = {
    // mascota: mascota.id,
    historia: {
      motivo: data.motivo,
      anamnesis: data.anamnesis,
      estado_reproductivo: data.estado_reproductivo,
      alimentacion: data.Alimentación,
      habitad: data.Hábitat,
      alergia: data.alergias,
      tllc: data.TLLC,
      pulso: data.Pulso,
      fc: data.FC,
      fr: data.FR,
      temperatura: data.Temperatura,
      peso: data.Peso
    },

    cirugia: [
      {
        tipo: "Cirugia",
        organo: "dfsf"
      },
      {
        tipo: "Cirugia2",
        organo: "aasda"
      }
    ],
    vacuna: [
      {
        tipo: "Vacuna",
        producto: "aassd"
      }
    ],
    desparacitacion: [
      {
        producto: "Desparacitacio",
        fecha: "2024-02-16"
      }
    ],
    examen_clinico: [
      {
        hidratacion: "Exame",
        actitud: "sads",
        sistema:
        {
          nombre: sistema,
          enfermedad: enfermedad
        },
        evolucion:
        {
          peso: 2.52,
          fecha: "2024-02-21"
        },
        mucosa: {
          "tipo": "dsd"
        }
      }
    ],
    terapia: [
      {
        tratamiento: "Terapi",
        via: "asdh",
        examen: {
          "fecha": "2024-02-21"
        }
      }
    ]
  }

  axios.post('https://g8k31qc7-8000.use.devtunnels.ms/doctor/actualizarHistoria/', mascotaData)
    .then(response => {
      console.log("Respuesta de axios.post", response);
    })
    .catch(error => {
      console.error("Error en axios.post", error);
    });

  console.log(data);
  reset();
};
