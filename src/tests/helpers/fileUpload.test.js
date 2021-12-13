import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";



cloudinary.config({ 
    cloud_name: 'ds8xt9gq9', 
    api_key: '521275262574298', 
    api_secret: 'pkAk5lj4Vs5nouGp3PviqHC_VQ4',
    secure: true
  });



describe('Prueba en fileUpload', () => {
    
    test('debe cargar un archivo y retornar el url ', async () => {
        
        const resp = await fetch(`https://i1.wp.com/sirkelsocioeconomicos.com/wp-content/uploads/2019/06/feature3-free-img-1.png?fit=400%2C400&ssl=1`) 
        const blob = await resp.blob();
        
        const file = new File([blob], "foto.png")

        const url  = await fileUpload(file)
        expect(typeof url).toBe("string")

        const segments = url.split("/")
        const imageId = segments[ segments.length -1 ].replace(".png","")
        console.log(imageId);
        const folderName = "Assests"

        await cloudinary.v2.api.delete_resources(`${imageId}`, {}, (error,result )=>{
            console.log(error,result);
        }); 

    })
    
    test('debe retornar error', async () => {

        const file = new File([], "foto.png")
        const url  = await fileUpload(file)
        expect(url).toBe(null)
    })
})

