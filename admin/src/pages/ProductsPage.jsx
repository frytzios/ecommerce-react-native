import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import axiosInstance from '../lib/axios';
import React, { useState } from 'react';
import { productApi } from '../lib/api';
import { getStockStatusBadge } from '../lib/utils';
import { Pencil, PencilIcon, PlusIcon, Trash2Icon, TrashIcon } from 'lucide-react';

function ProductsPage() {
  
  //login backend con clerk
  const {getToken} = useAuth();

  

  const fetchProducts = async () => {
    const token = await getToken();
    console.log('Token :', token);
    const { data } = await axiosInstance.get('/admin/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.products || [];
  };




  const [ showModal , setShowModal ] = useState(false);
  const [ editingProduct , setEditingProduct ] = useState(null);
  const [formData , setFormData] = useState ({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const [images , setImages] = useState([]);
  const [imagePreviews , setImagePreviews] = useState([]);

  

const { data: products = [], isLoading, isError, error } = useQuery({
  queryKey: ['products'],
  //modifique productApi.getAll por fetchProducts
  queryFn: fetchProducts,
});

//debug productos
//if (isLoading) return <div>Cargando productos...</div>;
//if (isError) return <div>Error: {error?.message}</div>;

console.log(products); // <-- ¿Ves los productos aquí?


//const products = data?.products || [];

 //creating,delete,update some data
 const createProductMutation = useMutation({
  mutationFn: productApi.create,
  onSucces: () => {

  }
 });

  const updateProductMutation = useMutation({
  mutationFn: productApi.update,
  onSucces: () => {
    //todo
  }
 });

const closeModal = () => {
  //todo
  setShowModal(false);
  setEditingProduct(null);
  setFormData({
     name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })
  setImages([]);
  setImagePreviews([]);
};

const handleEdit = (product) => {
  //todo
  setEditingProduct(product);
  setFormData({
    name: product.name,
    category: product.category,
    price: product.price.toString(),
    stock: product.stock.toString(),
    description: product.description,
  });
  setImagePreviews(product.images);
  setShowModal(true);
}

const handleImageChange = (e) =>{
  //todo
  const files = Array.from(e.target.files)
  if (files.length > 3) return alert('Maximo 3 imagenes');

  setImages(files);
  setImagePreviews(files.map((file) => URL.createObjectURL (file)));
};

const handleSubmit = (e) => {
  //todo
  e.preventDefault();
  // for new product , required images
  if(!editingProduct && imagePreviews.length === 0 ) {
    return alert('Please upload at least one image');
  }

  const formDataToSend = new FormData();

  formDataToSend.append('name' , formData.name);
  formDataToSend.append('description' , formData.description);
  formDataToSend.append('price' , formData.price);
  formDataToSend.append('stock' , formData.stock);
  formDataToSend.append('category' , formData.category);

  // only append new images if they were selected
  if(images.length > 0 ) images.forEach(image => formDataToSend.append('images' , image));

  if(editingProduct){
    updateProductMutation.mutate({id: editingProduct._id , formData: formDataToSend});
  }else{
    createProductMutation.mutate(formDataToSend);
  }

//if (isLoading) return <div>Cargando productos...</div>;
//if (isError) return <div>Error: {error?.message}</div>;

};


  return (
    

    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>ProductsPage</h1>
          <p className='text-base-content/70 mt-1'>Manage your product inventory</p>
        </div>
        <button onClick={() => setShowModal(true)} className='btn btn-primary gap-2'>
          <PlusIcon className='w-5 h-5'/>
          Add product
        </button>
      </div>
      
      {/* Products Grid*/}
      <div className='grid grid-cols-1 gap-4'>
        {products.map( product => {
          const status = getStockStatusBadge(product.stock);
          return (
            <div key={product._id} className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <div className='flex items-center gap-6'>
                  <div className='avatar'>
                    <div className='w-20 rounded-xl'>
                      <img src={product.images[0]} alt={product.name}/>
                    </div>
                  </div>

                  <div className='flex-1'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='card-title'>{product.name}</h3>
                        <p className='text-base-content/70 text-sm'>{product.category}</p>
                      </div>
                      <div className={`badge ${status.class}`}>{status.text}</div>
                      </div>
                      <div className='flex items-center gap-6 mt-4'>
                        <div>
                          <p className='text-xs text-base-content/70'>Price</p>
                          <p className='font-bold text-lg'>${product.price}</p>
                        </div>
                        <div>
                          <p className='text-xs text-base-content/70'>Stock</p>
                          <p className='font-bold text-lg'>{product.stock} units</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                      className='btn btn-square btn-ghost'
                      onClick={ () => handleEdit(product)}
                      >
                        <PencilIcon className='w-5 h-5'/>
                      </button>
                      <button className='btn btn-square btn-ghost text-error'>
                        <Trash2Icon className='w-5 h-5'/>
                      </button>
                    </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>

        {/* ADD/EDIT PRODUCT MODAL */}

        <input type='checkbox' className='modal-toggle' cheked={showModal}/>
        <div className='modal'>
          <div className='modal-box max-w-2xl'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-bold text-2xl'>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>

              <button onClic={closeModal} className='btn btn-sm btn-circle btn-ghost'>
                <PlusIcon className='w-5 h-5'/>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
