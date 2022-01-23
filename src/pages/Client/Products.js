import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProduct } from "../../components/Client";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  const {loading, products, getProductsByCategory} = useProduct();

  useEffect(() => getProductsByCategory(idCategory), [idCategory]);
  

  return (
    <div>
      <Link to={`/client/${tableNumber}`}> Volver a Categorias</Link>

      {loading ? <p>Cargando...</p> : <ListProduct products={products}/>}
    </div>
  );
}
