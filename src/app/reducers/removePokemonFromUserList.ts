import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export const removePokemon = createAsyncThunk("pokemon/remove",async({ id }: { id:string }) =>{
    try{
        console.log({id})
        await deleteDoc(doc(pokemonListRef,id));
        return { id };
    } catch(err){
        console.log(err)
    }
})