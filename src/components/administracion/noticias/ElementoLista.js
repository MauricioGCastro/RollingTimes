import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ElementoLista = (props) => {
  const eliminarNoticia = (id) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "La noticia no se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        // aquí eliminamos el producto
        try {
          const respuesta = await fetch(
            `http://localhost:4000/noticias/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(respuesta);
          if (respuesta.status === 200) {
            props.setRecargarNoticias(true);
            Swal.fire("Listo!", "La noticia ha sido eliminada", "success");
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error!",
            footer: "<p>No se pudo eliminar la noticia</p>",
          });
        }
      }
    });
  };

  const destacarNoticia = async (id) => {
    if (props.noticia.destacado === false) {
      props.noticia.destacado = true;
    }else{
      props.noticia.destacado = false;
    }

    const noticiaDest = {
      titulo: props.noticia.titulo,
      imagenCabecera: props.noticia.imagenCabecera,
      resumen: props.noticia.resumen,
      noticia: props.noticia.noticia,
      categoria: props.noticia.categoria,
      destacado: props.noticia.destacado
    }

    try {
      const respuesta = await fetch(
        `http://localhost:4000/noticias/${props.noticia.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticiaDest),
        }
      );
      console.log(respuesta);
      if (respuesta.status === 200) {
        props.setRecargarNoticias(true);
        Swal.fire("Listo!", "Se cambió el estado destacado", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error!",
        footer: "<p>No se pudo eliminar la noticia</p>",
      });
    }
  };

  return (
    <tr>
      <td>{props.noticia.id} </td>
      <td>{props.noticia.titulo}</td>
      <td>{props.noticia.categoria}</td>
      <td>
        <Button
          variant="outline-warning"
          size="sm"
          className="mx-1 destacar"
          onClick={() => destacarNoticia(props.noticia.id)}
        >
          <FontAwesomeIcon icon={faCheckCircle} size="2x"></FontAwesomeIcon>
        </Button>
        <Link
          to={`/admin/editarNoti/${props.noticia.id}`}
          className="btn btn-outline-primary mx-1 editar"
        >
          <FontAwesomeIcon icon={faEdit} size="2x"></FontAwesomeIcon>
        </Link>
        <Button
          variant="outline-danger"
          size="sm"
          className="mx-1 eliminar"
          onClick={() => eliminarNoticia(props.noticia.id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} size="2x"></FontAwesomeIcon>
        </Button>
      </td>
    </tr>
  );
};

export default ElementoLista;
