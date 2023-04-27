import React from 'react';
import {
  FaPencilAlt,
  FaTrashAlt,
  FaRegCheckSquare,
  FaRegWindowClose,
} from 'react-icons/fa';
import './Category.css';

function CategoryList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Category</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.storeValues.map((cate) => (
          <tr>
            <th scope="row">{cate.id}</th>
            <td>{cate.category} </td>
            <td>
              {cate.active ? (
                <FaRegCheckSquare className="statusiconActive" />
              ) : (
                <FaRegWindowClose className="statusiconInactive" />
              )}
            </td>
            <td>
              <button
                type="button"
                onClick={() => props.editRow(cate)}
                class="btn btn-sm btn-dark"
              >
                <FaPencilAlt />
              </button>
              &nbsp;
              <button
                type="button"
                class="btn btn-sm btn-danger"
                onClick={() => props.deleteListItem(cate.id)}
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CategoryList;
