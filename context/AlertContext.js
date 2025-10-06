//use pascal case in context
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const showToast=(type, message)=>{
    const styling = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }
    if (type === 'success'){
    return toast.success(message, styling);
    }else if (type === 'error'){
    return toast.error(message, styling);
    }
    else {
      console.warn("Invalid toast type:", type);
    }
    
  }
  

  return (
    <AlertContext.Provider value={{showToast}}>
     
      
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
