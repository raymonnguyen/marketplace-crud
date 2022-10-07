import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query'
import FormAction from './form-action';
import addProductField  from './formField';
import Input from "./input";
import { fetchcCategories } from '../../services/fetchingCategories';
import checkFields from '../../utils';
import { useParams } from 'react-router';
import { editProduct } from '../../services/editProduct';
import Product from '../../models/product';
import { fetchingProductBasedOnId } from '../../services/fetchProduct';
import ProductContext from '../../context/ProductContext';

const fields = addProductField;
let fieldsState = {} as any;

fields.forEach((field: any) => fieldsState[field.id] = '');
interface Category {
  name: string
}
export default function EditProductPage() {
  let { id } = useParams();
  const [formState, setFormState] = useState(fieldsState);
  const [isActive, setIsActive] = useState(false);
  const {setIsRequiredRefetchAPI} = useContext(ProductContext)
  const [categoryValue, setCategoryValue] = useState('')
  const { data } = useQuery(['categories'], () => fetchcCategories())
  const {data: productData} = useQuery<Product[], Error>(['product', id], () => fetchingProductBasedOnId(String(id)))

  const [isSubmitting, setIsSubmitting ] = useState(false)
  const { mutate, isSuccess} = useMutation((data:any) => editProduct(data, String(id)))
  const getProductImage = useCallback(() => {
    if(productData) {
        if (productData[0].imageURL) {
            return productData[0].imageURL
        }
       return ["https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png"]
    }
  },[productData])

  const handleSubmit = useCallback(async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true)
    const formData = {
      title: formState.name,
      description: formState.description,
      category: categoryValue,
      isActive,
      images: [getProductImage()],
      price: generateRandomInteger(50,500),
    }
    mutate(formData)
  },[categoryValue, formState.description, formState.name, getProductImage, isActive, mutate])

  function generateRandomInteger(min:number, max:number) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
    
  useEffect(()=>{
    if(isSubmitting && isSuccess) {
      toast.success(`Congrats! You have edit ${formState.name} successfully`)
      setIsRequiredRefetchAPI(true)
      setIsSubmitting(false)
    }
  },[formState.name, isSubmitting, isSuccess, setIsRequiredRefetchAPI])
  useEffect(()=> {
    if(productData) {
        setFormState({
            name:productData[0].name,
            description:productData[0].description,
        })
        setCategoryValue(productData[0].category)
        setIsActive(productData[0].isActive)
    }
  },[productData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, [e.target.id]: e.target.value });
  const getOptions = useCallback(() => {
    if(data) {
      return data.map((category:Category)=>{
        return {
          value:category.name,
          label:category.name
        }
      })
    } 
  },[data])

const options= useMemo(()=>getOptions(),[getOptions])
  const handleOnChangeSelect = (e:any) => {
    setCategoryValue(e?.value)
  }

  const filled = useMemo(() => {
    return checkFields([categoryValue, formState?.name, formState?.description])
  }, [categoryValue, formState?.description, formState?.name])  

  return (
    <form className="mt-8 space-y-6 p-4" onSubmit={(e:any) => handleSubmit(e)}>
      <div className="">
        {
          fields.map((field: any) =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={formState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
          <Select  onChange={handleOnChangeSelect} value={categoryValue} placeholder={categoryValue || "Please select category"} options={options} />
          <div className="mt-3">
          <label className="inline-flex relative mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isActive}
                            readOnly
                        />
                        <div
                            onClick={() => {
                                setIsActive(!isActive);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                            {isActive ? " Active" : "InActive"}
                        </span>
                    </label>
              </div>
        <FormAction disabled={!filled} handleSubmit={handleSubmit} text="Edit Product" />
      </div>
      <ToastContainer/>
    </form>
  )
}