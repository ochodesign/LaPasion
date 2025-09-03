import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
});

const FormularioFuncional = () => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Formulario Funcional</Typography>
      <Formik
        initialValues={{ nombre: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          alert(`Datos enviados:\nNombre: ${values.nombre}\nEmail: ${values.email}`);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.nombre && Boolean(errors.nombre)}
              helperText={touched.nombre && errors.nombre}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormularioFuncional;
