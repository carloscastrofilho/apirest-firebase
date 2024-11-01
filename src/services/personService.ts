import { db } from './database/firebase'
import { set, push, ref, get, update , remove } from "firebase/database";

const schemaName = "person";

export const createPerson = async (data: any) => {
  try {
    const newDocRef = push(ref(db, `${schemaName}`));
    // Filtrar campos undefined
    const payload = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    await set(newDocRef, payload);
    // Retorna o objeto incluído com seu UUID
    return {
      uuid: newDocRef.key,
      ...payload,
    };
  } catch (error) {
    console.error("Erro ao criar novo registro:", error);
    return { error: "Falha ao gerar novo Registro" };
  }
};

export const getAllPersons = async () => {
  const personsArray = <any>[];
  const dbref = ref(db, `${schemaName}`);
  const snapshot = await get(dbref);
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const personData = childSnapshot.val();
      personsArray.push({
        uuid: childSnapshot.key, // Adiciona o UUID do registro
        ...personData, // Adiciona os dados do registro
      });
    });
    return personsArray;
  } else {
    return null;
  }
};

export const getAllPersons2 = async () => {
  const personArray = <any>[];
  const dbref = ref(db, `${schemaName}`);
  const snapshot = await get(dbref);

  if (snapshot.exists()) {
    personArray.push(...Object.values(snapshot.val())); // Adiciona os usuários ao array
      return personArray;
  } else {
      return null;
  }
};

export const getPersonById = async (uuid: string) => {
  const dbref = ref(db, `${schemaName}/${uuid}`);
  const snapshot = await get(dbref);
  if (snapshot.exists()) {
      const personData = snapshot.val();
      //console.log(userData);
      return personData;
  } else {
      return { error: "Registro não encontrado" };
  }
};
  
export const updatePerson = async (uuid: string, data: any) => {
  const dbref = ref(db, `${schemaName}/${uuid}`);
  try {
      await update(dbref, data);
      return { success: true, message: "Registro atualizado com sucesso" };
  } catch (error) {
      if (error instanceof Error) {
          console.error("Erro ao fazer ao atualizar o registro:", error.message);
          throw new Error(error.message);
      } else {
          console.error("Erro desconhecido ao fazer a atualização do registro");
          throw new Error("Erro desconhecido");
      }
  }
};
  
export const deletePerson = async (uuid: string) => {
  const dbref = ref(db, `${schemaName}/${uuid}`);
  try {
    await remove(dbref);
    return { success: true, message: "Registro atualizado com sucesso" };
} catch (error) {
    if (error instanceof Error) {
        console.error("Erro ao fazer ao deletar o registro:", error.message);
        throw new Error(error.message);
    } else {
        console.error("Erro desconhecido ao deletar o registro");
        throw new Error("Erro desconhecido");
    }
}
};