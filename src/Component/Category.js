import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
   getCategory,
   postCategory,
   updateSingleCategory,
   deleteSingleCategory 
  } from '../services/category.service';


function Category() {
  //Initial Value
  const initialValues = { id: null, category: '', active: true };
  const [categoryForm, setcategoryForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [storeValues, setStorevalues] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [isReload, setisReload] = useState(false);

  // On change in controls
  const handleChange = (event) => {
    if (event.target.type === 'checkbox') {
      setcategoryForm({
        ...categoryForm,
        [event.target.name]: event.target.checked,
      });
    } else {
      setcategoryForm({
        ...categoryForm,
        [event.target.name]: event.target.value,
      });
    }
  };

  
  useEffect(()=>{
    getCategory().then(result => setStorevalues(result));
  }, [isReload])

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      postCategory(categoryForm);
      setIsSubmitting(false);
      setisReload(true);
      toast.success('Category Saved Successfully!');
    } else if (Object.keys(errors).length === 0 && isEditing) {
      updateSingleCategory(categoryForm, categoryForm.id);
      setisEditing(false);
      setisReload(true);
      toast.success('Category Updated Successfully!');
    }
    
    setcategoryForm(initialValues);
    
	// eslint-disable-next-line
  }, [errors]);

  // Validation for category
  function validate(values) {
    let errors = {};
    if (!values.category) {
      errors.category = 'Category is required';
    } else if (values.category.length < 3) {
      errors.category = 'Category length should not be less than 3';
    }
    return errors;
  }

  // Form Submit Handle
  const handleSubmit = () => {
    setErrors(validate(categoryForm));
    setIsSubmitting(true);
    setisReload(false);
  };

  const handleDelete = (id) => {
    setisReload(false);
    deleteSingleCategory(id).then((redDel)=> {
       if(redDel.status === 200) {
        setisReload(true);
       }
    });
    toast.warn('Category Deleted Successfully!');
    
  };

  const updateCategory = () => {
    setErrors(validate(categoryForm));
    setisEditing(true);
    setisReload(false);
  };

  const editRow = (cate) => {
    setisEditing(true);
    setcategoryForm({
      id: cate.id,
      category: cate.category,
      active: cate.active,
    });
  };

  return (
    <div className="row">
      <div class="col-md-10  mx-auto col-lg-8">
        <div class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div class="form-floating mb-3">
            <input
              type="text"
              value={categoryForm.category}
              onChange={(e) => handleChange(e)}
              class="form-control"
              id="floatingInput"
              placeholder="Category"
              name="category"
            />
            <label for="floatingInput">Category</label>
            {errors.category && (
              <div class="alert alert-danger p-2" role="alert">
                {errors.category}
              </div>
            )}
          </div>

          <div class="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                name="active"
                onChange={(e) => handleChange(e)}
                checked={categoryForm.active}
              />
              &nbsp;Active
            </label>
          </div>
          {isEditing ? (
            <button
              class="w-100 p-2 btn-sm btn btn-primary"
              type="button"
              onClick={(e) => updateCategory(e)}
              fdprocessedid="u1ev9s"
            >
              Update
            </button>
          ) : (
            <button
              class="w-100 p-2 btn-sm btn btn-success"
              type="button"
              onClick={(e) => handleSubmit(e)}
              fdprocessedid="u1ev9s"
            >
              Submit
            </button>
          )}
        </div>
        <hr class="my-4" />
        <CategoryList
          storeValues={storeValues}
          editRow={editRow}
          deleteListItem={handleDelete}
        />
        <ToastContainer
          position="bottom-center"
          theme="dark"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          style={{ width: '500px' }}
        />
      </div>
    </div>
  );
}

export default Category;
