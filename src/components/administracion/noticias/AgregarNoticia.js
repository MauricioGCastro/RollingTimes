import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../style/admin.css";
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';

const AgregarNoticia = (props) => {
  const [titulo, setTitulo] = useState("");
  const [imagenCabecera, setImagenCabecera] = useState("");
  const [resumen, setResumen] = useState("");
  const [noticia, setNoticia] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // validar la carga de la noticia
    if (
      titulo.trim() === "" ||
      imagenCabecera.trim() === "" ||
      resumen.trim() === "" ||
      noticia.trim() === "" ||
      categoria === ""
    ) {
      // mostrar alert de error
      setError(true);
      return;
    }
    setError(false);
    
    // crear el objeto a enviar
    const noticiaNueva = {
      titulo,
      url: imagenCabecera,
      detalleCorto: resumen,
      detalle: noticia,
      categoria,
      destacado: false,
      autor: "",
      fecha: ""
    };

    try {
      const resultado = await fetch(
        /* "http://localhost:4000/noticias", */
        "https://the-rolling-new.herokuapp.com/api/theRollingNew/Administracion/Noticia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticiaNueva),
        }
      );
      if (resultado.status === 201) {
        Swal.fire("Listo!", "La noticia se cargó correctamente", "success");
        props.setRecargarNoticias(true);
        props.history.push("/admin/listanoticias");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error!',
        footer: '<p>No se pudo cargar la noticia.</p>'
      })
      console.log(error);
    }
  };


  return (
    <section className="container px-5">
        <h1 className="text-center my-4">Agregar nueva noticia</h1>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group>
          <Form.Label>Título de la nota</Form.Label>
          <Form.Control
            type="text"
            placeholder="Agregar el título de la nota"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen de cabecera</Form.Label>
          <Form.Control
            type="text"
            placeholder="Agregar url de la imagen"
            onChange={(e) => setImagenCabecera(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Resumen</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Agregar un extracto de la nota"
            onChange={(e) => setResumen(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Noticia</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            placeholder="Agregar el cuerpo de la nota"
            onChange={(e) => setNoticia(e.target.value)}
          />
        </Form.Group>
        <h3 className="text-center mt-4">Categoría</h3>
        <div className="my-3 text-center">
          <Form.Check
            type="radio"
            label="Actualidad"
            value="Actualidad"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Espectáculos"
            value="Espectaculos"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Tecnología"
            value="Tecnologia"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Deportes"
            value="Deportes"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Política"
            value="Politica"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Economía"
            value="Economia"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Salud"
            value="Salud"
            name="categoria"
            inline
            className="mx-3"
            onChange={seleccionarCategoria}
          />
        </div>
        
        {
          // alerta en caso de no completar los datos al intentar el submit
          error ? (
            <Alert className="mt-4" variant={"danger"}>
              Se debe completar todos los campos
            </Alert>
          ) : null
        }
        <Button type="submit" className="w-100 mb-4 boton">
          AGREGAR NOTICIA
        </Button>
      </Form>
    </section>
  );
};

export default withRouter(AgregarNoticia);
