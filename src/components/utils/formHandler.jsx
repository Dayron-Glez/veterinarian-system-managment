import axios from 'axios';


export const onSubmit =
 (
  data, watchAlimentacion, watchHabitat, mascota,sistemas,
  problemas,diagnosticos,planes_terapeuticos,pasantes, reset,
) => {
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
    mascota_id: mascota.id,
    ecop: {
      motivo_consulta: data.motivo,
      anamnesis: data.anamnesis,
      estado_reproductivo: data.estado_reproductivo,
      alimentacion: data.Alimentación,
      habitat: data.Hábitat,
      alergias: data.alergias,
      cirugias: data.cirugías,
      enfermedades_anteriores: data.enfermedades,
      antescedentes_familiares: data.antecedentes,
      tllc: data.TLLC,
      pulso: data.Pulso,
      fc: data.FC,
      fr: data.FR,
      temperatura: data.Temperatura,
      peso: data.Peso,
      interpretacion_resultados: data.interpretacion_resultados,
      estado: data.estado_paciente,
      impresion_diagnostica: data.impresion_diagnostica,
      hidratacion: data.hidratacion,
      condicion_corporal: data.condicion_corporal,
      actitud: data.actitud,

    },
    mucosas: {
      rectal: data.mucosa_rectal.charAt(0).toUpperCase() + data.mucosa_rectal.slice(1),
      observacion_rectal:data.observation_mucosa_rectal,
      conjuntival: data.mucosa_conjuntival.charAt(0).toUpperCase() + data.mucosa_conjuntival.slice(1),
      observacion_conjuntival:data.observation_mucosa_conjuntival,
      vulvar_prepucial: data.mucosa_vulvar_prepucial.charAt(0).toUpperCase() + data.mucosa_vulvar_prepucial.slice(1),
      observacion_vulvar_prepucial:data.observation_mucosa_vulvar_prepucial,
  },

  nodulos: {
    estado: data.nodulos_linfaticos.charAt(0).toUpperCase() + data.nodulos_linfaticos.slice(1),
    observacion_nodulos:data.observation_nodulos_linfaticos,
  },

  vacunaciones:{
    tipo_vacuna: data.tipo_vacuna,
    producto: data.producto_vacunacion,
    fecha: data.fecha_vacunacion
  },

  desparacitaciones:{
    producto: data.producto_desparacitacion,
    fecha: data.fecha_desparacitacion,
  },
    sistemas:sistemas,
    problemas: problemas,
    diagnosticos:diagnosticos,
    planes_terapeuticos: planes_terapeuticos,
    pasantes:pasantes,

  }

  axios.post('https://h3h9qmcq-8000.use2.devtunnels.ms/doctor/ecop/', mascotaData)
    .then(response => {
      console.log("Respuesta de axios.post", response);
    })
    .catch(error => {
      console.error("Error en axios.post", error);
    });

  console.log(mascotaData);
  reset()
};
