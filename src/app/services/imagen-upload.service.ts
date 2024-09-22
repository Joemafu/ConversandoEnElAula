import { Injectable } from '@angular/core';
/* import { StorageError, getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage'; */

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {

  /* private storage;
 */
  /* constructor () {
    this.storage = getStorage();
  } */

  /* subirImagen(file: File, nroDocumento : number, nroDeFoto : Number): Promise<string> {
    return new Promise((resolve, reject) => {

      const path : string = `imagenes/${nroDocumento}-${nroDeFoto}-${(file.name.split('.').pop())}`;
      const storageRef = ref(this.storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        () => {},
        (error: StorageError) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          
          resolve(url);
        }
      );
    });
  } */

  /* deleteImage(imageUrl: string): Promise<void> {
    const storageRef = ref(this.storage, imageUrl);
    return deleteObject(storageRef);
  } */
}
