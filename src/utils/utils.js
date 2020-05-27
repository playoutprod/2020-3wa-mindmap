import { v4 as uuidv4 } from 'uuid';

export default (path)=>{
  return(path.replace(/[:? ]/g,''))
}

export function generate_id(){
  const id = uuidv4();
  return(id.replace(/-/g,''))
}
