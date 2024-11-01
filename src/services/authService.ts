import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut} from "firebase/auth";
import { auth } from './database/firebase';

export const createUser = async ( name: string, email:string, password:string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        return {
            token: token,
            name: name,
            email: user.email,
            uuid: user.uid,
            }

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("auth/email-already-in-use")) {
                return { error: "Email já está em uso." };
            } else {
                return { error: "Erro ao registrar usuário: " + error.message };
            }
        } else {
            return { error: "Erro desconhecido ao tentar registrar " };
            throw new Error("Erro desconhecido");
        }
    }
}

export const loginUser = async (email:string, password:string) => {
    try {
        // Tentando fazer login com o email e senha fornecidos
        const userCredential = await signInWithEmailAndPassword(auth, email, password);        
        const user = userCredential.user;
        // Aqui, você pode acessar o token de autenticação do usuário
        const token = await user.getIdToken(); // Obter o token de autenticação 
        // Retornando as informações do usuário autenticado  
        return {
            token: token,
            user: {
              name: user.displayName || null, 
              email: user.email,
              uuid: user.uid,
              telefone: "",
            }
          };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao fazer o login do usuário:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Erro desconhecido ao fazer o login do usuário");
            throw new Error("Erro desconhecido");
        }
    }
}

export const logoutUser = async (email:string, password:string) => {
    try {                
        await signOut(auth);
        // Aqui, você pode acessar o token de autenticação do usuário                
        // Retornando as informações do usuário autenticado
        // console.log( usuario );
        return {
            token: '',
            user: null,
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao registrar usuário:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Erro desconhecido ao registrar usuário");
            throw new Error("Erro desconhecido");
        }
    }   
}

