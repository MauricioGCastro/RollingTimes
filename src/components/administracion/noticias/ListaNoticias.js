import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ElementoLista from "./ElementoLista";
import "./style/noticias.css";

const ListaNoticias = (props) => {
  return (
    <section className="container my-4">
      <div className="row">
        <h1 className="text-center col-12">Lista de Noticias</h1>
        <Button className="boton ml-auto my-3" href="/admin/agregarnoticia">
          Agregar noticia
        </Button>{" "}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            // dibujar la filas de la tabla de noticias
            props.noticias.map((noticia) => (
              <ElementoLista
                key={noticia.id}
                noticia={noticia}
                setRecargarNoticias={props.setRecargarNoticias}
              ></ElementoLista>
            ))
          }
        </tbody>
      </Table>
    </section>
  );
};

export default ListaNoticias;
