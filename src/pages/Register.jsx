import { useContext, useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../context/authContext"

const Register = () => {
  let navigate = useNavigate()

  const {setIsAuthenticated} = useContext(AuthContext)

  const [first_Name, setFirstName] = useState('')
  const [last_Name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)

  const handleRegistration = async (e) => {
    e.preventDefault()
    // upload de fichier transformer les données de form data: quand on va passer des fichiers comme image
    const formData = new FormData()
    formData.append('first_Name', first_Name)
    formData.append('last_Name', last_Name)
    formData.append('email', email)
    formData.append('password', password)



    if(image){
      formData.append('image', image)
    }



    try{
      const newUser = await axios.post('http://localhost:5000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      })
      if(newUser.status === 201){
        alert(newUser.data.message)
        setIsAuthenticated(true)
        navigate(`/user/${newUser.data.userId}`);
      }
    }
    catch(err){
      console.log(err.response.data)
      if(err){
        alert(err.response.data)
      }
    }
    finally{
      navigate('/Profile')
    }
  }

    return(
        <>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Inscription</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegistration} class="space-y-6">

            <div>
                <label for="nom" class="block text-sm/6 font-medium text-gray-900">Nom</label>
                <div className="mt-2">
                <input type="text" name="last_name" id="last_name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                onChange={e => setLastName(e.target.value)}/>
                </div>
            </div>

            <div>
                <label for="prenom" class="block text-sm/6 font-medium text-gray-900">Prenom</label>
                <div className="mt-2">
                <input type="text" name="first_name" id="first_name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                onChange={e => setFirstName(e.target.value)}/>
                </div>
            </div>

            <div>
              <label for="email" class="block text-sm/6 font-medium text-gray-900">Adresse email</label>
              <div class="mt-2">
                <input type="email" name="email" id="email" autoComplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                onChange={e => setEmail(e.target.value)}/>
              </div>
            </div>
      
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900" >Mot de passe</label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Mot de passe oublie ?</a>
                </div>
              </div>
              <div class="mt-2">
                <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                onChange={e => setPassword(e.target.value)}/>
              </div>
              <div class="mt-2">
              <label for="password" class="block text-sm/6 font-medium text-gray-900" >Profile picture</label>
                <input type="file" name="image"
                 id="image"  
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                onChange={e => setImage(e.target.files[0])}/>
              </div>
            </div>
      
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Je me connecte</button>
            </div>
          </form>
      
          <p class="mt-10 text-center text-sm/6 text-gray-500">
            Vous avez deja un compte ?
            <a href="/login" class="font-semibold text-indigo-600 hover:text-indigo-500"> Connectez-vous</a>
          </p>
        </div>
      </div>
      </>
    )
}

export default Register