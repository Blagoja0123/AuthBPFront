import { useForm } from 'react-hook-form';
import { CreateUserInput, UserInput } from '../Utils/Models/User.schema';
import axios from 'axios';
import { useState } from 'react';
import { setMaxIdleHTTPParsers } from 'http';

const RegisterPage = () => {
    const [userCreds, setUserCreds] = useState({});
    const [base64, setBase64] = useState('');

    function onChange(e: any): any{
        setUserCreds((prev)=> {
            return {...prev, [e.target.name]: e.target.value};
        });

    }

    function handleFile(file: any): void{
       const reader = new FileReader();
       reader.onloadend = () =>{
        let base64 = reader.result?.toString();
        let splitBase = base64?.split(',');
        setUserCreds((prev)=>{return {...prev, base64PhotoString: splitBase![1]}});
       };
       reader.readAsDataURL(file);
    }


    

    
    async function registerUser(){
        console.log(userCreds);
        const res = await axios.post(`https://localhost:7245/api/Auth/register`, userCreds);
        return res;
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    function onSubmit(e:any){
        e.preventDefault();
        
        try {
            console.log(userCreds);
            const res = registerUser();
            console.warn("successfully registered", res);
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" name='username' id="" onChange={onChange}/>
            <input type="text" name='password' onChange={onChange} id="" />
            <input type="file" id="file" onChange={(e) => handleFile(e.target.files![0])}/>
            <button>submit</button>
        </form>
    </div>
  )
}

export default RegisterPage